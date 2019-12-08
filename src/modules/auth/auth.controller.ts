import { Controller, Post, UsePipes, Body, UseGuards } from '@nestjs/common';
import { ValidationPipe } from './../../shared/validation.pipe';
import { SignupDto, SigninDto, TokenDto } from './dto';
import { AuthService } from './auth.service';
import { UserRO } from '../user/user.dto';
import { AuthGuard } from './../../shared/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() signupDto: SignupDto): Promise<UserRO> {
    return this._authService.signup(signupDto);
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  async signin(@Body() signinDto: SigninDto) {
    return this._authService.signin(signinDto);
  }

  @UseGuards(new AuthGuard())
  @Post('logout')
  @UsePipes(new ValidationPipe())
  async logout(@Body() tokenDto: TokenDto) {
    this._authService.logout(tokenDto);
    return true;
  }
}
