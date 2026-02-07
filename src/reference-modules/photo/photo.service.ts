import { Body, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PhotoEntity } from './photo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
  ) {}

  async findAll(): Promise<PhotoEntity[]> {
    return this.photoRepository.find();
  }

  async createOne(dto: any) {
    return this.photoRepository.save(dto);
  }
}
