import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../user/user.entity';
import { Repository } from 'typeorm';
import { AuthSessionEntity } from './entities/auth-session.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO, RegisterDTO } from './dto';
import { comparePassword, hashPassword } from 'src/shared/utils';
import { IAuthPayload } from './interfaces';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(AuthSessionEntity)
    private authSessionsRepository: Repository<AuthSessionEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(dto: LoginDTO) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      relations: ['role'],
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isCredentialsValid = await comparePassword(
      dto.password,
      user.password,
    );
    if (!isCredentialsValid)
      throw new UnauthorizedException('Invalid credentials');

    const authPayload: IAuthPayload = {
      id: user.id,
    };
    const token = await this.getTokens(authPayload);

    return {
      user: user.toJSON(),
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    };
  }

  async register(dto: RegisterDTO) {
    let user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (user)
      throw new HttpException('Email already used.', HttpStatus.BAD_REQUEST);

    let hashedPassword = await hashPassword(dto.password);
    dto = {
      ...dto,
      password: hashedPassword,
    };

    user = await this.userRepository.create(dto);
    await this.userRepository.save(user);

    return {
      user: user,
      message: 'Registration successful',
    };
  }

  //   async refresh(refresh_token: string) {
  //     try {
  //       jwt.verify(
  //         refresh_token,
  //         this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET') as string,
  //       );
  //       const data: any = jwt.decode(refresh_token);

  //       const session = await this.authSessionsRepository.findOne({
  //         where: { user_id: data?.id },
  //       });

  //       if (session && session.refresh_token == refresh_token) {
  //         const payload: IAuthPayload = {
  //           id: data?.id,
  //         };
  //         const tokens = await this.getTokens(payload);
  //         return {
  //           access_token: tokens.access_token,
  //           refresh_token: tokens.refresh_token,
  //         };
  //       } else {
  //         throw 'Invalid refresh token';
  //       }
  //     } catch (error) {
  //       throw new HttpException(error, HttpStatus.BAD_REQUEST);
  //     }
  //   }

  async refresh(payload: IAuthPayload) {
    const session = await this.authSessionsRepository.findOne({
      where: { user_id: payload.id },
    });

    if (!session) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.getTokens({ id: payload.id });

    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }

  async logout(currentUser: UserEntity) {
    await this.authSessionsRepository.delete({ user_id: currentUser.id });
    return {
      message: 'Logged out successfully',
    };
  }

  private async getTokens(payload: IAuthPayload) {
    const accessToken = this.jwtService.sign(payload);
    const jwtSignOptions: jwt.SignOptions = {
      expiresIn: this.configService.getOrThrow<string>(
        'JWT_REFRESH_TOKEN_EXPIRES_IN',
      ) as jwt.SignOptions['expiresIn'],
    };
    const refreshToken = jwt.sign(
      payload,
      this.configService.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET'),
      jwtSignOptions,
    );

    const session = await this.authSessionsRepository.findOne({
      where: { user_id: payload.id },
    });

    if (session) {
      await this.authSessionsRepository.update(
        { id: session.id },
        {
          access_token: accessToken,
          refresh_token: refreshToken,
        },
      );
    } else {
      await this.authSessionsRepository.save({
        user_id: payload.id,
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    }

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
