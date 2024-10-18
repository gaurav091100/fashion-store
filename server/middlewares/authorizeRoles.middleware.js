const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.status(403).json({
          message: `Role: ${req.user.role} is not allowed to access this resource.`,
        })
      );
    }
    next();
  };
};

module.exports = {
  authorizeRoles,
};
