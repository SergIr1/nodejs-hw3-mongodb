import { Router } from 'express';
import {
  createContactsController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  // rootController,
  //   replaceContactController,
  updateContactsController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema, updateContactSchema } from '../validation/contact.js';
// import { authenticate } from '../middlewares/authenticate.js';
const router = Router();

// router.use(authenticate);

// router.get('/', ctrlWrapper(rootController));

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  validateBody(contactSchema),
  ctrlWrapper(createContactsController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactsController),
);

// ========================== Method PUT =====================================

// router.put('/:contactId', isValidId, validateBody(contactSchema), ctrlWrapper(replaceContactController));

// ========================== /Method PUT =====================================

export default router;
