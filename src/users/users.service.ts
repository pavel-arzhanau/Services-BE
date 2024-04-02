import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getUserByPhone(phone: string) {
    const user = await this.userRepository.findOne({
      where: { phone },
      include: { all: true },
    });

    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });

    return user;
  }

  async updateUser(id: number, updateUserDto) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await user.update(updateUserDto);
    return user;
  }

  async deleteUser(id: string) {
    console.log(id);
    // TODO delete logic
  }
}
