// import createHttpError from 'http-errors';

import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  //   console.log(req.params.id);
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw createHttpError(400, 'Bad Request');
    // return next(createHttpError.BadRequest('Bad Request'));
  }

  next();
};
