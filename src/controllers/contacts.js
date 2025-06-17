import mongoose from 'mongoose';
import {
  getContactById,
  getAllContacts,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';

export const getAllContactsController = async (req, res, next) => {
  // console.log('query:', req.query);
  console.log(req.user);

  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  // console.log('parsed:', { page, perPage });
  // console.log('parsed:', { sortBy, sortOrder });

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user.id,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(contactId)) {
  //   throw createHttpError(400, 'Invalid contact ID');
  // }

  // const contact = await getContactById(contactId);
  const contact = await getContactById(contactId, req.user.id);

  if (contact === null) {
    throw createHttpError(404, 'Contact not found');
  }

  if (contact.userId.toString() !== req.user.id.toString()) {
    // throw new createHttpError(403, 'Access denided for contact');
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

// export const rootController = async (request, response) => {
//   response.json({ message: `My name is Serhii Karskiy. Hello World!` });
// };

export const createContactsController = async (req, res) => {
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const contact = await createContact({
    ...req.body,
    userId: req.user.id,
    photo: photoUrl,
  });

  // console.log(contact);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const updateContactsController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;
  console.log(photo);

  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Invalid contact ID');
  }

  // const contact = await updateContact(contactId, req.body);
  const contact = await updateContact(contactId, req.user.id, {
    ...req.body,
    photo: photoUrl,
  });

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
  const contact = await deleteContact(contactId, req.user.id);

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
