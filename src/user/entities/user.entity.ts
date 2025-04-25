import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToMany,
  OneToMany,
  JoinTable
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { Role } from '../../role/entities/role.entity';
import { RefreshToken } from 'src/auth/entities/auth.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name', nullable: true })
  fullName: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Exclude() // Không bị return ở response
  @Column({ nullable: false })
  password: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable() // Tạo bảng trung gian user_roles
  roles: Role[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
