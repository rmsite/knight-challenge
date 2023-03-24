import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Knight } from './interfaces/knight.interface';
import { CreateKnightDTO } from './dto/create-knight.dto';

@Injectable()
export class KnightService {
  constructor(
    @InjectModel('Knight') private readonly knightModel: Model<Knight>,
  ) {}

  async getKnights(): Promise<Knight[]> {
    const knights = await this.knightModel.find().exec();
    return knights;
  }

  async getKnight(knightID): Promise<Knight> {
    const knight = await this.knightModel.findById(knightID).exec();
    return knight;
  }

  async addKnight(createKnightDTO: CreateKnightDTO): Promise<Knight> {
    const newKnight = new this.knightModel(createKnightDTO);
    return newKnight.save();
  }

  async editKnight(
    knightID,
    createKnightDTO: CreateKnightDTO,
  ): Promise<Knight> {
    const editedKnight = await this.knightModel.findByIdAndUpdate(
      knightID,
      createKnightDTO,
      { new: true },
    );
    return editedKnight;
  }

  async deleteKnight(knightID): Promise<any> {
    const deletedKnight = await this.knightModel.findByIdAndRemove(knightID);
    return deletedKnight;
  }
}
