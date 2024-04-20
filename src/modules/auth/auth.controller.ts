import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// - DTOs - //
import { AuthCredentialsDto } from './dto/auth-credientials.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

// - Services - //
import { AuthService } from './auth.service';

// - Models - //
import { authUrl } from 'src/shared/models/routes';

@Controller(authUrl.base)
@ApiTags(authUrl.base)
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post(authUrl.createAccount)
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<any> {
    return this._authService.signUp(authCredentialsDto);
  }

  @Post(authUrl.login)
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<any> {
    return this._authService.signIn(authCredentialsDto);
  }
  @ApiBearerAuth('JWT-auth')
  @Post(authUrl.refreshAuthToken)
  refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Req() request: Request,
  ): Promise<any> {
    return this._authService.refreshToken(refreshTokenDto, request);
  }
}
