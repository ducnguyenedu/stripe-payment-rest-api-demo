/* eslint-disable @typescript-eslint/dot-notation */
export const config = {
  db: {
    type: process.env['DB_TYPE'] || 'mysql',
    synchronize: false,
    logging: false,
    host: process.env['DB_HOST'] || 'masterHost',
    port: process.env['DB_PORT'] || 3306,
    username: process.env['DB_USER'] || 'username',
    password: process.env['DB_PASSWORD'] || 'password',
    database: process.env['DB_NAME'] || 'dbname',
    // replication: {
    //   master: {
    //     host: process.env.DB_HOST || 'masterHost',
    //     port: process.env.DB_PORT || 3306,
    //     username: process.env.DB_USER || 'username',
    //     password: process.env.DB_PASSWORD || 'password',
    //     database: process.env.DB_NAME || 'dbname',
    //   },
    //   slaves: [{ // fix if necessary
    //     host: 'slaveHost',
    //     port: 3306,
    //     username: 'username',
    //     password: 'password',
    //     database: 'dbname',
    //   }],
    // },
    extra: {
      connectionLimit: 30,
    },
    autoLoadEntities: true,
    // entities: [`${__dirname}/../entity/**/*.{js,ts}`],
    // subscribers: [`${__dirname}/../subscriber/**/*.{js,ts}`],
    // migrations: [`${__dirname}/../migration/**/*.{js,ts}`],
  },
  redis: {
    url: process.env['REDIS_URL'] || 'redis://localhost:6379',
  },
  graphql: {
    debug: false,
    playground: false,
  },
  foo: 'pro-bar',
};
