import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  // bcryptjs includes salt generation internally
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(params: {
  password: string;
  passwordHash: string;
}) {
  return bcrypt.compare(params.password, params.passwordHash);
}


