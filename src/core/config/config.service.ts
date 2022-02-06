import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { parse } from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

    if (isDevelopmentEnv) {
      const envFilePath = `${__dirname}/../../../.env`;
      const existsPath = fs.existsSync(envFilePath);

      if (!existsPath) {
        console.log('.env file does not exist');
        process.exit(0);
      }

      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
        DB_HOST: process.env.DB_HOST,
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PWD: process.env.DB_PWD,
        DB_SCHEMA: process.env.DB_SCHEMA,
        //JWT_SECRET: process.env.JWT_SECRET,
        //JWT_EXPIRES_TIME: process.env.JWT_EXPIRES_TIME,
        //SMTP_EMAIL: process.env.SMTP_EMAIL,
        //SMTP_PWD: process.env.SMTP_PWD,
        //PATH_API: process.env.PATH_API,
        //PATH_FRONT_CONFIRM_EMAIL: process.env.PATH_FRONT_CONFIRM_EMAIL,
      };
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
