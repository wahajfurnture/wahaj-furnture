import jwt from "jsonwebtoken";
import AppError from "../core/AppError.js";
import getUserProtectedRoutes from "../utils/getUserProtectedRoutes.js";

export default async (req, res, next) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];

  if (!accessToken) throw new AppError("Not Authorized", 401);

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    const user = await getUserProtectedRoutes(decoded);

    if (user.passwordChangeDate(decoded.iat)) {
      next(new AppError("Password changed recently, please login again", 401));
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
