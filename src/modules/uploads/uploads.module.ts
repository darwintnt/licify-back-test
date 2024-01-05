import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { SharpPipe } from './pipes/sharp-pipe/sharp-pipe';

@Module({
  providers: [UploadsService],
  exports: [SharpPipe],
})
export class UploadsModule {}
