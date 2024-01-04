import { Injectable } from '@nestjs/common';

import { ListBucketsCommand, S3Client } from '@aws-sdk/client-s3';

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

  async uploadFile(file) {
    const { originalname } = file;

    return await this.upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async upload(file, bucket, name, mimetype) {
    try {
      const params = {
        Bucket: bucket,
        Key: String(name),
        Body: file,
        ACL: 'public-read',
        ContentType: mimetype,
        ContentDisposition: 'inline',
      };

      const command = new ListBucketsCommand(params);

      return await this.s3.send(command);
    } catch (e) {
      console.log(e);
    }
  }
}
