import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Room extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  describtion: string;

  @Prop({ type: Object, required: true })
  abalableServices: {
    smartPhone: boolean;
    miniBar: boolean;
    Sauna: boolean;
    Breakfast: boolean;
    Hairdryer: boolean;
    Coffeemaker: boolean;
    WidescreenTv: boolean;
  };

  @Prop({ type: [String], required: true })
  aditionalServices: string[];

  @Prop({ required: true })
  pricePerNight: string;

  @Prop({ required: true })
  imageurl: string;

  @Prop({ type: [String], required: true })
  images: string[];

  @Prop({ required: true })
  maxGuest: number;

  @Prop({ type: [{ monthName: String, bookDates: [Number] }], required: true })
  abilibiity: { monthName: string; bookDates: number[] }[];

  @Prop({
    type: [
      {
        userName: String,
        message: String,
        userImage: String,
        rating: Number,
        userEmail: String,
      },
    ],
    required: true,
  })
  comments: {
    userName: string;
    message: string;
    userImage: string;
    rating: number;
    userEmail: string;
  }[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
