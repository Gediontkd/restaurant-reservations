import express from 'express';
import { createConnection } from 'typeorm';
import userRoutes from './routes/userRoutes';
import reservationRoutes from './routes/reservationRoutes';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import { seedTables } from './seeds/tableSeeder';
import config from './ormconfig'

const app = express();
const port = 3000;

app.use(express.json());

createConnection(config)
  .then(async () => {
    console.log('Connected to MySQL database');
    await seedTables();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => console.log('TypeORM connection error: ', error));

app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
