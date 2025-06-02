import { Router } from 'express';
import {
  createContactsController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  rootController,
  //   replaceContactController,
  updateContactsController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema, updateContactSchema } from '../validation/contact.js';
const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/', ctrlWrapper(rootController));

router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/contacts',
  validateBody(contactSchema),
  ctrlWrapper(createContactsController),
);

router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactsController),
);

// ========================== Method PUT =====================================

// router.put('/contacts/:contactId', isValidId, validateBody(contactSchema), ctrlWrapper(replaceContactController));

// ========================== /Method PUT =====================================

export default router;
