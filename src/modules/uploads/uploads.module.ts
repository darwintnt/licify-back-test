import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { SharpPipe } from './pipes/sharp-pipe/sharp-pipe';

@Module({
  providers: [UploadsService, SharpPipe],
  exports: [],
  controllers: [UploadsController],
})
export class UploadsModule {}
