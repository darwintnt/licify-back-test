import { Injectable } from '@nestjs/common';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

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

  async uploadFile(data: any) {
    if (data.file) {
      return await this.upload(
        data.file,
        this.AWS_S3_BUCKET,
        data.name,
        'image/webp',
      );
    }
  }

  async upload(file: any, bucket: string, name: string, mimetype: string) {
    try {
      const params = {
        Body: file,
        Bucket: bucket,
        ContentType: mimetype,
        Key: String(name),
      };

      const command = new PutObjectCommand(params);

      return {
        data: {
          metadata: await this.s3.send(command),
          fileName: `${process.env.AWS_URL_BUCKET}/${name}`,
        },
      };
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
