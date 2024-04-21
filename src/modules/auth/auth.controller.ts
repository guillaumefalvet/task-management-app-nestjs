import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// - DTOs - //
import { AuthCredentialsDto } from './dto/auth-credientials.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

// - Services - //
import { AuthService } from './auth.service';

// - Models - //
import { AuthUrlEnum } from 'src/shared/models/routes';

@Controller()
@ApiTags(AuthUrlEnum.base)
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post(AuthUrlEnum.createAccount)
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<any> {
    return this._authService.signUp(authCredentialsDto);
  }

  @Post(AuthUrlEnum.login)
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<any> {
    return this._authService.signIn(authCredentialsDto);
  }
  @ApiBearerAuth('JWT-auth')
  @Post(AuthUrlEnum.refreshAuthToken)
  refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Req() request: Request,
  ): Promise<any> {
    return this._authService.refreshToken(refreshTokenDto, request);
  }
}
