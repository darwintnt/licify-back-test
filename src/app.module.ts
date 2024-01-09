import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { ProjectModule } from './modules/project/project.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApplicationModule } from './modules/application/application.module';
import { UploadsModule } from './modules/uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    MulterModule.register({
      storage: memoryStorage(),
    }),
    ProjectModule,
    AuthModule,
    UserModule,
    ApplicationModule,
    UploadsModule,
  ],
})
export class AppModule {}
