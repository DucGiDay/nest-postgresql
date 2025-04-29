import {  Injectable,  UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import _ from 'lodash'
import { instanceToPlain } from 'class-transformer';

import { User } from 'src/user/entities/user.entity';
import { RefreshToken } from './entities/auth.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginFormDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,

    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) { }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    
    const savedUser = await this.userRepository.save(user);

    return instanceToPlain(savedUser) as User;
  }

  async login(req: LoginFormDto) {
    const { username, password } = req
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role', 'role.code IS NOT NULL') // Join với bảng roles
      .select([
        'user.id',
        'user.username',
        'user.password',
        'role.code',
      ])
      .where('user.username = :username', { username })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = {
      username: user.username,
      sub: user.id,
      roles: (user?.roles || []).map((e) => e.code)
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

    // Lưu refreshToken vào bảng RefreshToken
    const refreshTokenEntity = this.refreshTokenRepository.create({
      token: refreshToken,
      user,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 ngày
    });
    await this.refreshTokenRepository.save(refreshTokenEntity);

    return { accessToken, refreshToken, user: instanceToPlain(user) as User };
  }

  async refresh(refreshToken: string) {
    try {
      const secretkey = this.configService.get<string>('SECRET_KEY')

      // Xác thực refreshToken
      const payload = this.jwtService.verify(refreshToken, { secret: secretkey });

      // Kiểm tra refreshToken trong cơ sở dữ liệu
      const tokenEntity = await this.refreshTokenRepository.findOne({
        where: { token: refreshToken },
        relations: ['user'],
      });

      if (!tokenEntity) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Tạo accessToken mới
      const newAccessToken = this.jwtService.sign({ username: payload.username, sub: payload.sub }, { expiresIn: '15m' });

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}