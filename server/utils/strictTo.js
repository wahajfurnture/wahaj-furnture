import AppError from "../core/AppError.js";
import { auth } from "./auth.js";

export default (role) => async (req, res, next) => {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    throw new AppError("غير مصرح، يرجى تسجيل الدخول", 401);
  }

  if (!session.user) {
    throw new AppError("غير مصرح، يرجى تسجيل الدخول", 401);
  }

  const user = session.user;

  if (!role.includes(user.role)) {
    throw new AppError("الوصول مرفوض، لا تملك الصلاحيات الكافية", 403);
  }

  req.user = user;

  next();
};
