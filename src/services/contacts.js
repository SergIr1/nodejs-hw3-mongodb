import mongoose from 'mongoose';
import { StudentCollections } from '../db/models/contact.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  // ================================ Перший Варіант ================================

  // const contactQeury = StudentCollections.find(filter);

  // const [totalItems, data] = await Promise.all([
  //   StudentCollections.countDocuments(filter),
  //   contactQeury
  //     .sort({ [sortBy]: sortOrder })
  //     .skip(skip)
  //     .limit(perPage),
  //   // await StudentCollections.find()
  //   //   .sort({ [sortBy]: sortOrder })
  //   //   .skip(skip)
  //   //   .limit(perPage),
  // ]);

  // ================================ /Перший Варіант ================================

  // ================================ Second Варіант ================================

  // const contactQury = StudentCollections.find({ userId });

  const contactQury = StudentCollections.find();

  contactQury.where('userId').equals(new mongoose.Types.ObjectId(userId));

  if (filter.isFavourite !== undefined) {
    contactQury.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter.contactType !== undefined) {
    contactQury.where('contactType').equals(filter.contactType);
  }

  const countFilter = { userId: new mongoose.Types.ObjectId(userId) };

  if (filter.isFavourite !== undefined) {
    countFilter.isFavourite = filter.isFavourite;
  }

  if (filter.contactType !== undefined) {
    countFilter.contactType = filter.contactType;
  }

  const [totalItems, data] = await Promise.all([
    StudentCollections.countDocuments(countFilter),
    contactQury
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  // ================================ /Second Варіант ================================

  // ================================ Варіант з ЧИСЛАМИ================================

  // let contactQury = StudentCollections.find();

  // if (typeof filter.minYear !== 'undefined') {
  //   contactQury = contactQury.where('minYear').gte(filter.minYear);
  // }

  // if (typeof filter.maxYear !== 'undefined') {
  //   contactQury = contactQury.where('maxYear').lte(filter.maxYear);
  // }

  // const [totalItems, contacts] = await Promise.all([
  //   StudentCollections.countDocuments(contactQury),
  //   contactQury
  //     .sort({ [sortBy]: sortOrder })
  //     .skip(skip)
  //     .limit(perPage),
  // ]);

  // ================================ /Варіант з ЧИСЛАМИ================================

  // console.log({ totalItems, data });
  const totalPages = Math.ceil(totalItems / perPage);
  // const currentPage = Math.min(page, totalPages || 1);
  // const hasNextPage = Boolean(totalPages - page);
  // const hasPreviousPage = page !== 1;

  // return {
  //   data,
  //   page: currentPage,
  //   perPage,
  //   totalItems,
  //   totalPages,
  //   hasNextPage: currentPage < totalPages,
  //   hasPreviousPage: currentPage > 1,
  // };
  // const allContacts = await StudentCollections.find();
  // console.log('All contacts in DB:', allContacts);

  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasNextPage: totalPages > page,
    hasPreviousPage: page > 1,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await StudentCollections.findOne({
    _id: contactId,
    userId: new mongoose.Types.ObjectId(userId),
  });
  console.log('Searching contact with ID:', contactId, 'and userId:', userId);
  return contact;
};

export const createContact = async (payload) => {
  return await StudentCollections.create(payload);
};

export const updateContact = async (contactId, userId, payload) => {
  return await StudentCollections.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
    },
  );
};

export const deleteContact = async (contactId, userId) => {
  return await StudentCollections.findOneAndDelete({ _id: contactId, userId });
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
