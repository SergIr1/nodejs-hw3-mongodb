import { StudentCollections } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await StudentCollections.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await StudentCollections.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  return await StudentCollections.create(payload);
};

export const updateContact = async (contactId, payload) => {
  return await StudentCollections.findByIdAndUpdate(contactId, payload, {
    new: true,
  });
};

export const deleteContact = async (contactId) => {
  return await StudentCollections.findByIdAndDelete(contactId);
};

// ========================== Method PUT =====================================

// export const replaceContact = async (contactId, contact) => {
//   const result = await StudentCollections.findByIdAndUpdate(
//     contactId,
//     contact,
//     {
//       new: true,
//       upsert: true,
//       includeResultMetadata: true,
//     },
//   );

//   return {
//     value: result.value,
//     updatedExisting: result.lastErrorObject.updatedExisting,
//   };
// };

// ========================== /Method PUT =====================================
