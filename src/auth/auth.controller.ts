import { Body, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credientials.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtTokens } from './jwt-tokens.interfance';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  sayHello() {
    return 'hello';
  }
  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<any> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<any> {
    return this.authService.signIn(authCredentialsDto);
  }
  @ApiBearerAuth('JWT-auth')
  @Post('/refresh-token')
  refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Req() request: Request,
  ): Promise<any> {
    return this.authService.refreshToken(refreshTokenDto, request);
  }
}
