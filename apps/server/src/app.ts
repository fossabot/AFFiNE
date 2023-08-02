import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ConfigModule } from './config';
import { MetricsModule } from './metrics';
import { BusinessModules, Providers } from './modules';
import { PrismaModule } from './prisma';
import { StorageModule } from './storage';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(),
    StorageModule.forRoot(),
    MetricsModule,
    ...BusinessModules,
  ],
  providers: Providers,
  controllers: [AppController],
})
export class AppModule {}
