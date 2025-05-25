import { Router } from 'express';
import {
  createContactsController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactsController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post('/contacts', ctrlWrapper(createContactsController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

router.patch('/contacts/:contactId', ctrlWrapper(updateContactsController));

export default router;
