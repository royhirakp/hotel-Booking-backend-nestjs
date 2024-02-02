import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { generateOtpDto } from './dto/generateOtp.dto';
import { SingUpDto } from './dto/signup.dto';
import { varifyOtpDto } from './dto/verifyOtp.dto';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup/otpG')
  generateOtP(@Body() generateDto: generateOtpDto) {
    return this.authService.genRateOTPforSignup(generateDto);
  }

  @Post('/signup/Otp_verify')
  verifyOtp(@Body() verifyOtpDto: varifyOtpDto) {
    // return { verifyOtpDto };
    return this.authService.verifySignupOtp(verifyOtpDto);
  }

  @Post('/signup')
  signup(@Body() SignupDto: SingUpDto) {
    // console.log('SignupDtoSignupDto== ', SignupDto);
    return this.authService.singUp(SignupDto);
  }

  @Post('/logIn')
  logIn(@Body() loginDto: loginDto) {
    return this.authService.login(loginDto);
  }

  @Get('/allUser')
  getAllUser() {
    return this.authService.getAlluser();
  }
}
