import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  // BeforeInsert
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({name: 'avatar_url'})
  avatarUrl: string;

  @CreateDateColumn({name: 'created_at',  type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  // @BeforeInsert()
  // async hashPassword() {
  //   const salt = await bcrypt.genSalt(10);
  //   this.password = await bcrypt.hash(this.password, salt);
  // }
}
