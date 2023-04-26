import { DataSource } from 'typeorm';

export const databaseProviders = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'gs-biblioteca-api',
  logging: false,
  synchronize: false,
  // name: 'default',
  // entities: [__dirname + './../../domain/entity/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
});
