

import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  // 'This action adds a new user';
  async create(createUserDto: CreateUserDto): Promise<User> {
    const userData =
      await this.userRepository.create(
        createUserDto,
      );
    await this.userRepository.save(userData);
    return userData
  }

  // `This action returns all user` 
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // `This action returns a #${id} user`
  async findOne(id: number): Promise<User> {
    const userData =
      await this.userRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException(
        'User Not Found',
        404,
      );
    }
    return userData;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const existingUser = await this.findOne(id);
    const userData = this.userRepository.merge(
      existingUser,
      updateUserDto,
    );
    return await this.userRepository.save(
      userData,
    );
  }

  async remove(id: number): Promise<User> {
    const existingUser = await this.findOne(id);
    return await this.userRepository.remove(
      existingUser,
    );
  }
}
