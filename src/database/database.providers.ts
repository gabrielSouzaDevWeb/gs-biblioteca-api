import { DataSource } from 'typeorm';
import * as entities from './../common/entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'db-gs-biblioteca-api',
        entities,
        migrations: [__dirname + './../../dist/migrations/*.js'],
        synchronize: false,

        // logger: false,
        logging: false,
      });

      return dataSource.initialize();
    },
  },
];
