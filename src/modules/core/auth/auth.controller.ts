import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../../user/user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { IAuthPayload } from './interfaces';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDTO) {
    return await this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDTO) {
    return await this.authService.login(dto);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async me(@CurrentUser() user: UserEntity) {
    return user;
  }

  @Post('refresh')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('refresh-jwt'))
  async refresh(@CurrentUser() user: IAuthPayload) {
    // returns { id } since refresh-jwt is used
    return await this.authService.refresh(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@CurrentUser() currentUser: UserEntity) {
    return await this.authService.logout(currentUser);
  }
}
