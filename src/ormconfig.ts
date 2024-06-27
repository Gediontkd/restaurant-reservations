import { ConnectionOptions } from 'typeorm';
import { User } from './entities/User';
import { Reservation } from './entities/Reservation';
import { Table } from './entities/Table';

const config: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'mysql_db',
  port: parseInt(process.env.DB_PORT as string, 10) || 3306,
  username: process.env.DB_USERNAME || 'db-reservation',
  password: process.env.DB_PASSWORD || 'db-reservation',
  database: process.env.DB_DATABASE || 'db-reservation',
  entities: [User, Reservation, Table],
  synchronize: true,
  logging: false,
};

export default config;
