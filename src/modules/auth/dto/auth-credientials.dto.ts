import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// - Constants - //
import { PASSWORD_REGEX } from 'src/shared/constants/constant-regex';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ default: 'randomuser' })
  readonly username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(PASSWORD_REGEX, {
    message: 'password is too weak',
  })
  @ApiProperty({ default: 'asasasAz892)$' })
  readonly password: string;

  @IsOptional()
  readonly refreshToken: string;
}
