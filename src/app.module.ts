import { DatabaseModule } from './database/database.module';
import { DynamicModule, Inject, Module, OnModuleInit } from '@nestjs/common';
import { configure as i18nConfigure } from 'i18n';
import { UserService } from './services/user.service';
import { UserGrpcController } from './controllers/user.grpc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CryptoUtil } from './utils/crypto.util';
import { RequestUtil } from './utils/request.util';
import { JWTUtil } from './utils/jwt.util';
import { CurlUtil } from './utils/curl.util';
import * as config from 'config';
import { join } from 'path';

const settings: IDBSettings = config.get('DB_SETTINGS');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...settings,
      entities: [join(__dirname, '/entities/**.entity{.ts,.js}')],
      synchronize: this.databaseSynchronize,
      migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
      cli: {
        migrationsDir: 'src/migrations',
      },
      maxQueryExecutionTime: 1000,
      logging: "all",
      logger: "file"
  }),
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [UserGrpcController],
  providers: [UserService, CryptoUtil, RequestUtil, JWTUtil, CurlUtil],
})
export class AppModule{

  static forRoot(options: { i18n: 'en-US' | 'zh-CN' }): DynamicModule {
    i18nConfigure({
      locales: ['en-US', 'zh-CN'],
      defaultLocale: options.i18n,
      directory: 'src/i18n'
    });
    return {
      module: AppModule
    };
  }
}
