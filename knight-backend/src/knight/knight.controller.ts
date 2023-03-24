import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateKnightDTO } from './dto/create-knight.dto';
import { KnightService } from './knight.service';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';
import { Knight } from './types/add-knight-request';
import { z } from 'zod';
import { cloneDeep } from 'lodash';

@Controller('knight')
export class KnightController {
  constructor(private knightService: KnightService) {}

  @Get('knights')
  async getKnights(@Res() res) {
    const knights = await this.knightService.getKnights();
    return res.status(HttpStatus.OK).json(knights);
  }

  @Get('knight/:knightID')
  async getKnight(
    @Res() res,
    @Param('knightID', new ValidateObjectId()) knightID,
  ) {
    const knight = await this.knightService.getKnight(knightID);
    if (!knight) throw new NotFoundException('Knight does not exist!');
    return res.status(HttpStatus.OK).json(knight);
  }

  @Post('/knights')
  async addKnight(@Res() res, @Body() createKnightDTO: CreateKnightDTO) {
    try {
      Knight.parse(createKnightDTO);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(HttpStatus.BAD_REQUEST).json(error.format());
      }
    }
    const newKnight = await this.knightService.addKnight(createKnightDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Knight has been submitted successfully!',
      knight: newKnight,
    });
  }

  @Put('/edit')
  async editKnight(
    @Res() res,
    @Query('knightID', new ValidateObjectId()) knightID,
    @Body() createKnightDTO: CreateKnightDTO,
  ) {
    const editedKinight = await this.knightService.editKnight(
      knightID,
      createKnightDTO,
    );
    if (!editedKinight) throw new NotFoundException('knight does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'knight has been successfully updated',
      knight: editedKinight,
    });
  }

  @Delete('/delete')
  async deleteKnight(@Res() res, @Query('knightID') knightID) {
    const knight = await this.knightService.getKnight(knightID);
    const newKnight = cloneDeep(knight);
    newKnight.heroe = true;
    const editedKinight = await this.knightService.editKnight(
      knightID,
      newKnight,
    );
    if (!editedKinight) throw new NotFoundException('knight does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'knight has been successfully updated to heroe',
      knight: editedKinight,
    });
    /*const deletedKnight = await this.knightService.deleteKnight(knightID);
    if (!deletedKnight) throw new NotFoundException('Knight does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Knight has been deleted!',
      post: deletedKnight,
    });*/
  }
}
