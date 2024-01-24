import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { generateOtpDto } from './dto/generateOtp.dto';
import { SingUpDto } from './dto/signup.dto';
import { UserSingupOtp } from './schemas/userSingupOtp.schema';
import { varifyOtpDto } from './dto/verifyOtp.dto';
import * as bcrypt from 'bcryptjs';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,

    @InjectModel(UserSingupOtp.name)
    private userSingUPOtpModel: Model<UserSingupOtp>,

    private jwtService: JwtService,
  ) {}

  async getAlluser() {
    const all_user = await this.userModel.find();
    return all_user;
  }

  async genRateOTPforSignup(generateOtpDto: generateOtpDto) {
    try {
      let { email } = generateOtpDto;
      //check the email is exist in the database or not

      let user_exist = await this.userModel.findOne({ email });

      if (user_exist) {
        throw new ConflictException('email exist');
      }

      let otp = Math.floor(100000 + Math.random() * 900000);

      // send the otp to the user mail

      //save the otp and the mail in the database
      let userSingUPOtp = await this.userSingUPOtpModel.create({
        email,
        otp,
      });

      // delete the otp and the emil data if not used within 10m
      // setTimeout(async () => {
      //   await this.userSingUPOtpModel.deleteMany({
      //     email,
      //   });
      // }, 20000);

      return { status: 'signup otp generated' };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while processing the signup otp request',
      );
    }
  }

  async verifySignupOtp(verifyOtpDto: varifyOtpDto) {
    try {
      let { email, otp } = verifyOtpDto;
      console.log(verifyOtpDto);

      let userOtpData = await this.userSingUPOtpModel.findOne({ email });
      console.log('userOtpData==', userOtpData);

      if (userOtpData?.otp === otp) {
        return { status: true };
      } else {
        throw new NotFoundException('Invalid OTP');
      }
      //get the otp fom the data base and then varify that both are same or not
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async singUp(signupDto: SingUpDto): Promise<any> {
    try {
      let { email, password } = signupDto;
      let Exist_user = await this.userModel.findOne({ email });
      // console.log('Exist_user=', Exist_user);
      // console.log('DTO_User=', signupDto);
      if (Exist_user) {
        throw new ConflictException('email exist');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      // console.log('hash password====', hashedPassword);

      const user = await this.userModel.create({
        name: signupDto.name,
        email: signupDto.email,
        password: hashedPassword,
      });
      // const token = this.jwtService.sign({
      //   id: user._id,
      // });
      // console.log('user', user);

      return { token: user };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException(
        'An error occurred while processing the signup otp request',
      );
    }
  }
  async login(loginDto: loginDto): Promise<any> {
    try {
      const { email, password } = loginDto;
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }
      const passwordMatched = await bcrypt.compare(password, user.password);

      if (!passwordMatched) {
        throw new UnauthorizedException('wrong password');
      }
      const token = await this.jwtService.signAsync({
        id: user._id,
      });
      console.log('token==', token);
      return { success: 1, token };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while processing the signup otp request',
      );
    }
  }
  async deleteUser() {}
}
