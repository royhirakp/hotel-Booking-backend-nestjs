import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email exist'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  otp: string;

  @Prop()
  token: string;

  @Prop()
  age: string;

  @Prop()
  country: string;

  @Prop()
  gender: string;

  @Prop({
    type: [
      {
        hotelDetails: SchemaTypes.Mixed,
        booking: [SchemaTypes.Date],
      },
    ],
    required: true,
  })
  bookingDates: {
    hotelDetails: any;
    booking: any[];
  }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
