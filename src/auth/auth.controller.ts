import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/singin-dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enums';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly logger: Logger,
    private readonly authService: AuthService,
  ) {
    this.logger = new Logger(AuthController.name);
  }
  @Post('sign-in')
  @Auth(AuthType.None)
  @HttpCode(HttpStatus.OK)
  public async singIn(@Body() signInDto: SignInDto) {
    return this.authService.singIn(signInDto);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  public async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
