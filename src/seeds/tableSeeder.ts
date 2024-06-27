import { getConnection } from 'typeorm';
import { Table } from '../entities/Table';

export const seedTables = async () => {
  const connection = await getConnection();
  const tableRepository = connection.getRepository(Table);

  // check if tables already exist
  const tables = await tableRepository.find();
  if (tables.length === 0) {
    // insert initial tables
    const initialTables = [
      { number: 1, seats: 4 },
      { number: 2, seats: 4 },
      { number: 3, seats: 4 },
      { number: 4, seats: 4 },
      { number: 5, seats: 4 },
    ];

    await tableRepository.save(initialTables);
    console.log('Tables have been seeded.');
  } else {
    console.log('Tables already exist, skipping seeding.');
  }
};
