import { Router } from 'express';
import authRouter from './auth.js';
import contactsRouter from './contacts.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use('/contacts', authenticate, contactsRouter);
router.use('/auth', authRouter);

export default router;
