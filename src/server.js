import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

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

  // app.get('/contacts', getAllContactsController);

  // app.get('/contacts/:contactId', getContactByIdController);

  app.use(contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, (err) => {
    if (err) {
      throw err;
    }

    console.log(`Server is running on port ${PORT}`);
  });
};
