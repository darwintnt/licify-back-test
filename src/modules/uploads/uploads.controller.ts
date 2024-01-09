import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from './pipes/sharp-pipe/sharp-pipe';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UploadsService } from './uploads.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Uploads')
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'uploads',
})
export class UploadsController {
  constructor(private readonly uploadService: UploadsService) {}

  @Post()
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(SharpPipe) file: Express.Multer.File,
  ): Promise<any> {
    return await this.uploadService.uploadFile(file);
  }
}
