const httpResponse = {
  goodResponse: (res, statusCode, ...message) => res.status(statusCode).json({
    success: true,
    message
  }),

  badResponse: (res, statusCode, ...message) => res.status(statusCode).json({
    success: false,
    message
  }),
};

export default httpResponse;
