import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const configMigration: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'username',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'dbname',
  entities: ['dist/src/entity/**/*.entity.ts'],
  synchronize: false,
  migrations: ['dist/src/db/migrations.js'],
};

export = configMigration;
