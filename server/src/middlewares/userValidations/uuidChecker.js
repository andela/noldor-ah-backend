const uuidChecker = (req, res, next) => {
  // https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
  const regExpUuid = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  const user = req.params.userId;
  const trimeduserId = user.trim();
  const validRegEx = regExpUuid.test(trimeduserId);
  if (validRegEx === false) {
    return res.status(400).json({
      success: false,
      message: 'Invalid parameter'
    });
  }
  next();
};

export default uuidChecker;
