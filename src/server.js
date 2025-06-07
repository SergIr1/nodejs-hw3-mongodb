import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
// import {Serhii Karskyi} from serhiipraktic7@gmail.com;
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
// import contactsRouter from './routers/contacts.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // app.get('/contacts', getAllContactsController);

  // Server started by serhii karskyi serhiipraktic7@gmail.com

  // app.get('/contacts/:contactId', getContactByIdController);

  app.use(router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, (err) => {
    if (err) {
      throw err;
    }

    console.log(`Server is running serhii karskiy on port ${PORT}`);
  });
};
