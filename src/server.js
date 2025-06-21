import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
// import {Serhii Karskyi} from serhiipraktic7@gmail.com;
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constans/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

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

  app.get('/', (request, response) => {
    response.json({ message: 'Hello World! My name is Serhii Karskyi' });
  });

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

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

    console.log(`Server is running Serhii Karskiy on port ${PORT}`);
  });
};
