import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { DataSource } from 'typeorm';
import { PhotoEntity } from './photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoEntity])],
  controllers: [PhotoController],
  providers: [
    // {
    //   provide: 'PHOTO_REPOSITORY',
    //   useFactory: (dataSource: DataSource) => dataSource.getRepository(Photo),
    //   inject: ['DATA_SOURCE'],
    // },
    PhotoService,
  ],
})
export class PhotoModule {}
