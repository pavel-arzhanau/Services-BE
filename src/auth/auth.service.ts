import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto, IUser } from 'src/users/dto';
import { UserService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Token } from './tokens.model';
import * as bcrypt from 'bcryptjs';
import { AuthDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectModel(Token) private tokenRepository: typeof Token,
  ) {}

  async registration(
    createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string; refreshToken: string; user: IUser }> {
    const candidate = await this.userService.getUserByPhone(
      createUserDto.phone,
    );

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким phone существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 5);
    const user = await this.userService.createUser({
      ...createUserDto,
      password: hashPassword,
    });

    const tokens = await this.getTokens(user.id, user.name);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return { ...tokens, user };
  }

  async login(data: AuthDto) {
    const user = await this.userService.getUserByPhone(data.phone);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const passwordMatches = await bcrypt.compare(data.password, user.password);
    if (!passwordMatches) {
      throw new BadRequestException('Password is incorrect');
    }

    const tokens = await this.getTokens(user.id, user.name);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return { ...tokens, user };
  }

  async logout(userId: number) {
    return this.userService.updateUser(userId, { refreshToken: null });
  }

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '5h',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '14d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<Token> {
    const hashedRefreshToken = await this.hashData(refreshToken);
    const tokenData = await this.tokenRepository.findOne({
      where: { userId },
      include: { all: true },
    });

    if (tokenData) {
      return tokenData.update({
        ...tokenData,
        refreshToken: hashedRefreshToken,
      });
    }

    const token = await this.tokenRepository.create({
      userId,
      refreshToken: hashedRefreshToken,
    });

    return token;
  }

  async hashData(data: string): Promise<string> {
    const hashPassword = await bcrypt.hash(data, 5);
    return hashPassword;
  }
}
