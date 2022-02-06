import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';
import { AppConstantsEnum } from '../constants/app-constants.enum';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      const currentEnv = process.env.NODE_ENV || 'development';
      const dbConnection: any = {
        ssl: false,
        type: 'postgres',
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        schema: config.get(AppConstantsEnum.ENV_DB_SCHEMA),
      };
      if (currentEnv === 'production') {
        dbConnection.ssl = true;
        dbConnection.url = process.env.DATABASE_URL;
        dbConnection.extra = {
          ssl: {
            sslmode: 'require',
            rejectUnauthorized: false,
          },
        };
      } else {
        dbConnection.host = config.get(AppConstantsEnum.ENV_DB_HOST);
        dbConnection.username = config.get(AppConstantsEnum.ENV_DB_USER);
        dbConnection.password = config.get(AppConstantsEnum.ENV_DB_PWD);
        dbConnection.database = config.get(AppConstantsEnum.ENV_DB_NAME);
      }
      return dbConnection as ConnectionOptions;
    },
  }),
];

@Injectable()
export class DatabaseService {}
