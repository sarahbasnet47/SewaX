export const isUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res
      .status(403)
      .json({ message: "you are not a user so access denied" });
  }
  next();
};
