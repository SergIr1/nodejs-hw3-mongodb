export const middleware404 = (req, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
};

export const middleware500 = (err, req, res, next) => {
  res.status(500).json({
    message: `Something went wrong`,
    error: err.message,
  });
};

// console.log(typeof middleware404);

// export default { middelware404 };
