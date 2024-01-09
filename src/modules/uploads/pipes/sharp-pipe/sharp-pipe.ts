import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<any>>
{
  async transform(file: Express.Multer.File): Promise<any> {
    if (file) {
      const originalName = path.parse(
        file.originalname.trim().replace(/\s+/g, ''),
      ).name;

      const filename: string = Date.now() + '_' + originalName + '.webp';

      const converter = await sharp(file.buffer)
        .resize(800)
        .webp({ effort: 3 })
        .toBuffer();

      return {
        name: filename,
        file: converter,
      };
    }
  }
}
