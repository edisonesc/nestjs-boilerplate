import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { DataSource } from 'typeorm';
import { Photo } from './photo.entity';
import { DatabaseModule } from 'src/modules/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PhotoController],
  providers: [
    {
      provide: 'PHOTO_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Photo),
      inject: ['DATA_SOURCE'],
    },
    PhotoService,
  ],
})
export class PhotoModule {}
