import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { generateOtpDto } from './dto/generateOtp.dto';
import { SingUpDto } from './dto/signup.dto';
import { varifyOtpDto } from './dto/verifyOtp.dto';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/allUser')
  getAllUser() {
    return this.authService.getAlluser();
  }

  @Get('/signup/otpG')
  generateOtP(@Body() generateDto: generateOtpDto) {
    return this.authService.genRateOTPforSignup(generateDto);
  }
  @Get('/signup/Otp_verify')
  verifyOtp(@Body() verifyOtpDto: varifyOtpDto) {
    return this.authService.verifySignupOtp(verifyOtpDto);
  }
  @Get('/signup')
  signup(@Body() SignupDto: SingUpDto) {
    return this.authService.singUp(SignupDto);
  }
  @Get('/logIn')
  logIn(@Body() loginDto: loginDto) {
    return this.authService.login(loginDto);
  }
}
