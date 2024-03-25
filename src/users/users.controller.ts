import { Body, Controller, Post } from '@nestjs/common';
import { User } from './users.model';
import { UserService } from './users.service';
import { CreateUserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() userDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }
}
