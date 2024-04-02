import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
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

  async logout(refreshToken: string) {
    const tokenData = this.tokenRepository.destroy({
      where: {
        refreshToken,
      },
    });

    return tokenData;
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
    const tokenData = await this.tokenRepository.findOne({
      where: { userId },
      include: { all: true },
    });

    if (tokenData) {
      return tokenData.update({
        ...tokenData,
        refreshToken,
      });
    }

    const token = await this.tokenRepository.create({
      userId,
      refreshToken,
    });

    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const userData = this.validateRefreshToken(refreshToken);
    const tokenFromDb = this.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.getUserById(userData.id);
    const tokens = await this.getTokens(user.id, user.name);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return { ...tokens, user };
  }

  validateAccessToken(token: string) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      return userData;
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken: string) {
    const tokenData = this.tokenRepository.findOne({
      where: {
        refreshToken,
      },
      include: { all: true },
    });

    return tokenData;
  }
}
