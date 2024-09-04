import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SecureHeadersMiddleware } from './core/common/secure-headers';
import { LoggerMiddleware } from './core/util/logger.service';

import { AppService } from './app.service';
import { configureCloudinary } from './core/config/cloudinary.config';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [
    AuthModule,
    CategoryModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: 'CLOUDINARY_CONFIG',
      useFactory: (configService: ConfigService) =>
        configureCloudinary(configService),
      inject: [ConfigService],
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, SecureHeadersMiddleware).forRoutes('*');
  }
}
