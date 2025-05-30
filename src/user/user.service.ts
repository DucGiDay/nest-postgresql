import { HttpException, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import _ from 'lodash';

// DTO
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// entity
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';

import { findAllParamDto } from './dto/request-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  // 'This action adds a new user';
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);

    const savedUser = await this.userRepository.save(user);

    return instanceToPlain(savedUser) as User;
  }

  // `This action returns all user`
  async findAll(params: findAllParamDto) {
    const { page = -1, limit = -1, keyword } = params;
    const skip = (page - 1) * limit;

    const where = keyword
      ? [
        { username: ILike(`%${keyword}%`) },
        { fullName: ILike(`%${keyword}%`) },
      ]
      : undefined;

    // Nếu truyền page, limit thì phân trang, ngược lại thì trả tất cả
    const paginage =
      page == -1 || limit == -1
        ? null : {
          skip,
          take: limit,
        }

    const payload = {
      ...paginage,
      where,
    }

    const [users, total] = await this.userRepository.findAndCount(payload);
    const sanitizedUsers = users.map(user => instanceToPlain(user)) as User[];
    return { data: sanitizedUsers, total };
  }

  // `This action returns a #${id} user`
  async findOne(id: number, isShowPassword: boolean = false): Promise<User> {
    const userData = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (!userData) {
      throw new HttpException('User Not Found', 404);
    }
    if (isShowPassword) {
      return userData
    }
    return instanceToPlain(userData) as User;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.findOne(id);
    const userData = this.userRepository.merge(existingUser, updateUserDto);
    return await this.userRepository.save(userData);
  }

  async remove(id: number): Promise<User> {
    const existingUser = await this.findOne(id);
    return await this.userRepository.remove(existingUser);
  }

  async changePassword(id: number, oldPassword: string, newPassword: string): Promise<string> {
    const user = await this.findOne(id, true);
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Old password incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await this.userRepository.save(user);

    return 'Password changed successfully';
  }

  // Thêm role cho người dùng
  async assignRoles(userId: number, roleIds: number[]) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) {
      throw new HttpException('User Not Found', 404);
    }

    const roles = await this.roleRepository.findByIds(roleIds);
    if (roles.length !== roleIds.length) {
      throw new HttpException('Role Not Found', 404);
    }

    user.roles = roles;

    return this.userRepository.save(user);
    // return 'Assign roles successfully'
  }
}
