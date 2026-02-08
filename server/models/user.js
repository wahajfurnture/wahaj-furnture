import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: [3, "username is too short"],
      maxLength: [75, "username is too long"],
    },
    email: {
      type: String,
      maxLength: [75, "email is too short"],
      required: true,
      unique: true,
    },
    role: { type: String, default: "user", required: true },
    image: {
      type: String,
      maxLength: [200, "email is too short"],
    },
    password: { type: String },
    passwordUpdatedAt: Date,
    isActive: { type: Boolean, default: false },
    confirmationToken: {
      token: String,
      expiresAt: Date,
    },
    resetPassword: {
      token: String,
      expiresAt: Date,
    },
    deactiveate: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.passwordChangeDate = function (issueAtJWT) {
  if (!this.password) return false;
  const passwordUpdatedAt = parseInt(
    this.passwordUpdatedAt.getTime() / 1000,
    10
  );

  return passwordUpdatedAt > issueAtJWT;
};

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.pre("save", function () {
  if (!this.isModified("password")) return;

  this.passwordUpdatedAt = Date.now() - 1000;
});

const User = mongoose.model("user", userSchema);

export default User;
