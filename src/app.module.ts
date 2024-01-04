import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { ProjectModule } from './modules/project/project.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    ProjectModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
