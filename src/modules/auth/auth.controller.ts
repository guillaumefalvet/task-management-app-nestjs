import { Body, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credientials.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { authRoute } from 'src/shared/models/routes';

@Controller(authRoute.parent)
@ApiTags(authRoute.parent)
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  sayHello() {
    return 'hello world';
  }
  @Post(authRoute.signup)
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<any> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post(authRoute.signin)
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<any> {
    return this.authService.signIn(authCredentialsDto);
  }
  @ApiBearerAuth('JWT-auth')
  @Post(authRoute.refreshToken)
  refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Req() request: Request,
  ): Promise<any> {
    return this.authService.refreshToken(refreshTokenDto, request);
  }
}
