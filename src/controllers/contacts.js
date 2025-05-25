import mongoose from 'mongoose';
import {
  getContactById,
  getAllContacts,
  createContact,
  deleteContact,
  updateContact,
  // replaceContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactByIdController = async (req, res, next) => {
  // try {
  const { contactId } = req.params;

  // throw new Error('Error');

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Invalid contact ID');
  }

  const contact = await getContactById(contactId);

  // if (!contact) {
  //   res.status(404).json({ message: 'Contact not found' });
  //   return;
  // }

  if (contact === null) {
    // next(new Error('Contact not found'));
    // return;
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
  // } catch (error) {
  //   if (error.name === 'CastError' && error.kind === 'ObjectId') {
  //     return res.status(404).json({ message: 'Contact not found' });
  //   }
  //   next(error);
  // }
};

export const getAllContactsController = async (req, res, next) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const createContactsController = async (req, res) => {
  const contact = await createContact(req.body);

  console.log(contact);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const updateContactsController = async (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Invalid contact ID');
  }

  const contact = await updateContact(contactId, req.body);

  if (contact === null) {
    throw createHttpError(404, 'Contact not found');
    // next(createHttpError(404, 'Contact not found'));
    // return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);

  if (contact === null) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).end();
};

// ========================== Method PUT =====================================

// export const replaceContactController = async (req, res) => {
//   const { contactId } = req.params;
//   const { value, updatedExisting } = await replaceContact(contactId, req.body);

//   if (updatedExisting === true) {
//     return res.json({
//       status: 200,
//       message: 'Student updated Successfully',
//       data: value,
//     });
//   }

//   res.status(201).json({
//     status: 201,
//     message: 'Successfully created a contact!',
//     data: value,
//   });
// };

// ========================== /Method PUT =====================================
