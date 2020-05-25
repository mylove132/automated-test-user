import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const settings: IDBSettings = config.get('DB_SETTINGS');

export function getOrmConfig(): TypeOrmModuleOptions {
  let ormConfig: TypeOrmModuleOptions;

    ormConfig = {
      type: 'postgres',
      ...settings,
      entities: [__dirname + '../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      migrationsRun: true,
      maxQueryExecutionTime: 0.1 /** To log request runtime */,
      synchronize: true,
      cli: {
        migrationsDir: __dirname + '/migrations/**/*{.ts,.js}',
      },
    };
  
  return ormConfig;
}
