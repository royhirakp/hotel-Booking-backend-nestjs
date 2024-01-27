import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './schemas/room.schema';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel('hotelRoom')
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
        comments: [
          {
            userName: 'Hirak Roy',
            messege: 'lore',
            userImage: '/jd-chow-gutlccGLXKI-unsplash.jpg',
            ratting: 5,
            userEmail: 'royhirakp@gam.com',
          },
          {
            userName: 'Bikram Rathod',
            messege: 'lore',
            userImage:
              'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
            ratting: 2,
            userEmail: 'royhirakp@gam.com',
          },
          {
            userName: 'Rahul Rajput',
            messege: 'lore',
            userImage: 'https://mui.com/static/images/avatar/3.jpg',
            ratting: 1,
            userEmail: 'royhirakp@gam.com',
          },
          {
            userName: 'Rahul Rajput',
            messege: 'lore',
            userImage: 'https://mui.com/static/images/avatar/2.jpg',
            ratting: 4,
            userEmail: 'royhirakp@gam.com',
          },
        ],
      });
      return { upload };
      // const upload = await this.
    } catch (error) {
      console.error('Error in uploadRoomData:', error);
      throw new Error('Failed to upload room data');
    }
  }

  async getRoomDataForHomePage() {}
  async getRoomDataById() {}
  async getAllRooms() {}
  async bookRoom() {}
  async searchRoomsByPlace() {}
}
