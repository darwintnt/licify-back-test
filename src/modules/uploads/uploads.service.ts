import { Injectable } from '@nestjs/common';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadsService {
  AWS_S3_BUCKET = process.env.AWS_BUCKET;

  s3 = new S3Client({
    region: process.env.AWS_DEFAULT_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  async uploadFile(file: string) {
    if (file) {
      const buffer = fs.readFileSync(path.join('files', file));

      return await this.upload(buffer, this.AWS_S3_BUCKET, file, 'image/webp');
    }
  }

  async upload(file, bucket, name, mimetype) {
    try {
      const params = {
        Body: file,
        Bucket: bucket,
        ContentType: mimetype,
        Key: String(name),
      };

      const command = new PutObjectCommand(params);

      return await this.s3.send(command).then(
        (data) => {
          console.log(data);
          fs.unlinkSync(path.join('files', name));
        },
        (error) => {
          console.log(error);
        },
      );
    } catch (e) {
      console.log(e);
    }
  }
}
