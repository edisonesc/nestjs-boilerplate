import { Body, Controller, Get, Post } from '@nestjs/common';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  async findAll() {
    return this.photoService.findAll();
  }

  @Post()
  create(@Body() dto: any) {
    return this.photoService.createOne(dto);
  }
}
