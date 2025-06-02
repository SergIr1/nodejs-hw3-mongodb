import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  //   if (err instanceof HttpError) {
  //     res.status(err.status).json({
  //       status: err.status,
  //       message: err.name,
  //       data: err,
  //     });
  //     return;
  //   }
  if (isHttpError(err)) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err,
    });
  }

  console.error('Error Handler', err);

  res.status(500).json({
    status: 500,
    message: `Something went wrong`,
    data: err.message,
  });
};
