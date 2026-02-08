import ResponseFormatter from "../core/ResponseFormatter.js";
import AuthService from "../services/authService.js";
import createJWTToken from "../utils/createJWTToken.js";
import AppError from "../core/AppError.js";

const authService = new AuthService();

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.findUserByEmail(email, password);

  const token = createJWTToken({ userId: user._id });

  ResponseFormatter.success(res, {
    user,
    token,
  });
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new AppError("currentPassword and newPassword are required", 400);
  }

  const user = req.user;
  if (!user) throw new AppError("Not Authorized", 401);

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) throw new AppError("Current password is incorrect", 401);

  user.password = newPassword;
  await user.save();

  const token = createJWTToken({ userId: user._id });

  ResponseFormatter.success(
    res,
    {
      user,
      token,
    },
    "Password changed successfully",
  );
};
