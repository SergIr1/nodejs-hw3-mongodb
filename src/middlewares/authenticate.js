import createHttpError from 'http-errors';
import { SessionCollection } from '../db/models/session.js';
import { UserCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  // console.log(req.headers);
  const { authorization } = req.headers;

  if (typeof authorization !== 'string') {
    return next(
      new createHttpError(401, 'Please provide Authorization header'),
    );
  }

  const [bearer, accessToken] = authorization.split(' ', 2);

  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    return next(
      new createHttpError(401, 'Please provide Authorization header'),
    );
  }

  // console.log({ bearer, accessToken });

  const session = await SessionCollection.findOne({ accessToken });

  if (session === null) {
    return next(new createHttpError(401, 'Session not found'));
  }

  if (session.accessTokenValidUntil < new Date()) {
    return next(new createHttpError(401, 'Access token expired'));
  }

  const user = await UserCollection.findOne({ _id: session.userId });

  if (user === null) {
    return next(new createHttpError(401, 'User not found'));
  }

  req.user = { id: user._id, name: user.name };

  next();
};
