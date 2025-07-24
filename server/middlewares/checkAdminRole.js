const checkAdminRole = (req, res, next) => {
  const role = req.user.role;

  if (role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "Terlarang!",
    });
  }

  next();
};

module.exports = checkAdminRole;
