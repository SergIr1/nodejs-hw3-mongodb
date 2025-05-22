import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
// import { getAllStudents, getStudentById } from './services/contacts.js';
import {
  getStudentByIdController,
  getAllStudentsController,
} from './controllers/contacts.js';
import { middleware404, middleware500 } from './middlewares/middelware.js';
// import mongoose from 'mongoose';

const app = express();

const PORT = Number(getEnvVar('PORT', '3000'));

// console.log(PORT);

export const setupServer = () => {
  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (request, response) => {
    response.json({ message: 'Hello World! My name is Serhii Karskyi' });
  });

  app.get('/contacts', getAllStudentsController);

  app.get('/contacts/:contactId', getStudentByIdController);

  app.use(middleware404);

  app.use(middleware500);

  app.listen(PORT, (err) => {
    if (err) {
      throw err;
    }

    console.log(`Server is running on port ${PORT}`);
  });
};