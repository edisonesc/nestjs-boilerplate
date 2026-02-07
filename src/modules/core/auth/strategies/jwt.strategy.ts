import { UserEntity } from 'src/modules/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import { AuthSessionEntity } from '../entities/auth-session.entity';
import { ConfigService } from '@nestjs/config';
import { IAuthPayload } from '../interfaces';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(AuthSessionEntity)
    private authSessionsRepository: Repository<AuthSessionEntity>,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: IAuthPayload) {
    const { id } = payload;
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['role', 'role.permissions'],
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    const session = await this.authSessionsRepository.findOne({
      where: { user_id: user.id },
    });
    if (!session) {
      throw new UnauthorizedException();
    }

    return await user.toJSON();
  }
}
