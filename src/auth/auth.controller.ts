import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto';
import { AuthDto } from './dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async createUser(@Body() userDto: CreateUserDto, @Res() res: Response) {
    const { refreshToken, accessToken, user } =
      await this.authService.registration(userDto);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 14,
    });

    return res.send({
      refreshToken,
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        description: user.description,
        email: user.email,
        phone: user.phone,
        photo: user.photo,
        rating: user.rating,
      },
    });
  }

  @Post('login')
  async login(@Body() data: AuthDto, @Res() res: Response) {
    const { refreshToken, accessToken, user } =
      await this.authService.login(data);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 14,
    });

    return res.send({
      refreshToken,
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        description: user.description,
        email: user.email,
        phone: user.phone,
        photo: user.photo,
        rating: user.rating,
      },
    });
  }

  @Get('logout')
  logout(@Req() req) {
    this.authService.logout(req.user['sub']);
  }

  @Get('refresh')
  refresh() {}
}
