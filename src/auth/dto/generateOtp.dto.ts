import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class generateOtpDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please give correct mailed' })
  @IsString()
  readonly email: string;
}
