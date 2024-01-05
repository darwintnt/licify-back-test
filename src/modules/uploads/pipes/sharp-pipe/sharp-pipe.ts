import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class SharpPipe
  implements PipeTransform<Array<Express.Multer.File>, Promise<Array<string>>>
{
  async transform(files: Array<Express.Multer.File>): Promise<Array<string>> {
    if (files) {
      const fileNames = files.map((image) => {
        const originalName = path.parse(image.originalname).name;
        const filename = Date.now() + '-' + originalName + '.webp';

        sharp(image.buffer)
          .resize(800)
          .webp({ effort: 3 })
          .toFile(path.join('files', filename));

        return filename;
      });

      return fileNames;
    }
  }
}
