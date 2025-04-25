import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import 'dotenv/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY || 'default_secret_key',
    });
  }

  async validate(payload: any) {
    // `payload` là object đã mã hóa trong accessToken
    return {
      userId: payload.sub,
      username: payload.username,
      roles: payload.roles
    };
  }
}
