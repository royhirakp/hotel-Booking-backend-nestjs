import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './schemas/room.schema';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel('hotelRoom2')
    private readonly roomModel: Model<Room>,
  ) {}

  async findAllBooks() {
    try {
      return { books: ['hellloooo'] };
    } catch (error) {
      console.error('Error in findAllBooks:', error);
      throw new Error('Failed to fetch books');
    }
  }

  async uploadRoomData(imageUrl, room) {
    try {
      // Your logic for uploading room data
      let upload = await this.roomModel.create({
        id: 1,
        title: 'single room',
        describtion: 'lorem',
        abalableServices: {
          smartPhone: true,
          miniBar: true,
          Sauna: true,
          Breakfast: true,
          Hairdryer: true,
          Coffeemaker: true,
          WidesreenTv: true,
        },
        aditionalServices: ['1', '3', '2', '4', '5', '6', '7', '8'],
        pricePerNight: '500',
        imageurl: '/RoomBookingpage/room1.jpg',
        images: [
          '/RoomBookingpage/room1.jpg',
          '/RoomBookingpage/room2.jpg',
          '/RoomBookingpage/room3.jpg',
          '/RoomBookingpage/room5.jpg',
          '/RoomBookingpage/room6.jpg',
          '/RoomBookingpage/room7.jpg',
        ],
        maxGuest: 5,
        abilibiity: [
          {
            monthNmae: '9',
            bookDates: [1, 2, 3, 4, 5, 6, 10, 11, 15, 16, 18],
          },
          { monthNmae: '10', bookDates: [] },
          { monthNmae: '11', bookDates: [2, 3, 4, 5, 6, 10] },
        ],
        comments: [],
      });
      return { upload };
      // const upload = await this.
    } catch (error) {
      console.error('Error in uploadRoomData:', error);
      throw new Error('Failed to upload room data');
    }
  }

  async getRoomDataForHomePage() {
    try {
      const roomsData = await this.roomModel.find({}).limit(4).exec();

      if (!roomsData) {
        throw new NotFoundException('No rooms found.');
      }
      return { status: 1, roomsData, totalrooms: roomsData?.length };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw the NotFoundException as is
      } else {
        console.error(error);

        throw new InternalServerErrorException(
          'Internal server error occurred.',
        );
      }
    }
  }
  async getRoomDataById(id: string) {
    try {
      if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
        // Check if id is not provided or not a valid ObjectId
        throw new BadRequestException('Invalid room ID.');
      }
      let room = await this.roomModel.findOne({ _id: id });
      if (!room) {
        throw new NotFoundException('No rooms found.');
      }
      return room;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error; // Re-throw the NotFoundException as is
      } else {
        // console.error(error);
        console.log('error come form the service error section');

        throw new InternalServerErrorException(
          'Internal server error occurred.',
        );
      }
    }
  }
  async getAllRooms() {
    try {
      const roomsData = await this.roomModel.find({}).exec();

      if (!roomsData) {
        throw new NotFoundException('No rooms found.');
      }
      return { status: 1, roomsData, totalrooms: roomsData?.length };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw the NotFoundException as is
      } else {
        console.error(error);

        throw new InternalServerErrorException(
          'Internal server error occurred.',
        );
      }
    }
  }
  // async bookRoom(
  //   roomId: string,
  //   monthAndDate: { monthName: string; dates: string[] }[],
  //   userId: string,
  // ) {
  //   try {
  //     // update the roomData in the database
  //     // add the booking details to the user data
  //     let updateRoom = await this.roomModel.findByIdAndUpdate({
  //       // _id:id
  //     });
  //   } catch (error) {}
  // }

  // async bookRoom(roomId: string, monthAndDate: { monthName: string; dates: string[] }[], userId: string) {
  //   try {
  //     // Find the room by ID
  //     const room = await this.roomModel.findById(roomId);

  //     if (!room) {
  //       throw new NotFoundException('Room not found.');
  //     }

  //     // Update the room's availability based on the provided month and dates
  //     monthAndDate.forEach(({ monthName, dates }) => {
  //       const existingMonth = room.abilibiity.find(entry => entry.monthNmae === monthName);

  //       if (existingMonth) {
  //         existingMonth.bookDates = existingMonth.bookDates.filter(date => !dates.includes(date.toString()));
  //       }
  //     });

  //     // Save the updated room data
  //     const updatedRoom = await room.save();

  //     // Find the user by ID
  //     const user = await this.roomModel.findById(userId);

  //     if (!user) {
  //       throw new NotFoundException('User not found.');
  //     }

  //     // Add booking details to the user data
  //     user.bookingDates.push({
  //       hotelDetails: room.toObject(),
  //       booking: monthAndDate.map(({ monthName, dates }) => ({ monthName, dates })),
  //     });

  //     // Save the updated user data
  //     const updatedUser = await user.save();

  //     // Return the updated room and user data
  //     return { updatedRoom, updatedUser };
  //   } catch (error) {
  //     if (error instanceof NotFoundException) {
  //       throw error; // Re-throw the NotFoundException as is
  //     } else {
  //       // Log the error for debugging purposes
  //       console.error(error);

  //       throw new InternalServerErrorException('Internal server error occurred.');
  //     }
  //   }
  // }

  async searchRoomsByPlace() {}

  async postAComment() {}
}
