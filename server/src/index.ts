import express from 'express';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import router from './routes';

const PORT = 3001;

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);
export default db;
const app = express();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My Flashcards',
    description: 'Приложение для запоминания слов',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Development server',
    },
  ],
};

const options = {
  explorer: true,
  swaggerDefinition,
  apis: ['**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  migrate(db, { migrationsFolder: 'drizzle' });
  console.log(`[OK] Server has been starter on port: ${PORT}`);
});
