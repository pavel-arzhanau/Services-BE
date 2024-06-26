import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto';
import { AuthDto } from './dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.cookies;
    await this.authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return res.send(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test-auth-guard')
  async testAuthGuard(@Req() req: Request, @Res() res: Response) {
    return res.send(200);
  }

  @Get('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const { refreshToken: refreshTokenFromCookies } = req.cookies;
    const { refreshToken, accessToken, user } = await this.authService.refresh(
      refreshTokenFromCookies,
    );

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

  @Get('check-auth')
  async checkAuth(@Req() req: Request, @Res() res: Response) {
    try {
      const { refreshToken } = req.cookies;

      const { user } = await this.authService.checkAuth(refreshToken);

      return res.send({
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
    } catch (error) {
      return res.send({
        user: null,
      });
    }
  }
}
