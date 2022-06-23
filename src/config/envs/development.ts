/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unsafe-call */

export const config = {
  db: {
    type: process.env['DB_TYPE'] || 'mysql',
    // https://typeorm.io/#/connection-options/common-connection-options
    synchronize: true,
    // logging: true,
    // logger: new LoggerCustom(),
    host: process.env['DB_HOST'] || '127.0.0.1',
    port: process.env['DB_PORT'] || 3306,
    username: process.env['DB_USER'] || 'username',
    password: process.env['DB_PASSWORD'] || '',
    database: process.env['DB_NAME'] || 'dbname',
    extra: {
      connectionLimit: 10,
    },
    autoLoadEntities: true,
    migrationsRun: true,
    entities: [`${__dirname}/../entity/**/*.{js,ts}`],
    migrations: [`${__dirname}/../migration/**/*.{js,ts}`],
    migrationsTableName: 'migrations_typeorm',
    cli: {
      migrationsDir: 'migrations',
    },
    // subscribers: [`${__dirname}/../subscriber/**/*.{js,ts}`],
    //
  },
  foo: 'dev-bar',
};
