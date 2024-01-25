import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomService {
  constructor() {} // private itemModel: mongoose.Model<Item>, // @InjectModel(Item.name)

  async findAllBooks() {
    try {
      return { books: ['hellloooo'] };
    } catch (error) {}
  }
}
