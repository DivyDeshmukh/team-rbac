import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "../db/client";
import { Role, User } from "../generated/prisma/client";

const JWT_SECRET = process.env.JWT_SECRET!;

// Hashing is about protecting user credentials if your database is compromised.
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

/* 
bcrypt never decodes the stored hash. Hasing is one way.

At login, bcrypt takes the plaintext password you provide, uses the salt inside the stored hash, re-hashes it, and checks whether the hashes match.

If they match → user is authenticated, else → authentication fails.
*/
export const verifyPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

/*
Need for async:- bcrypt performs many rounds of cryptographic work, which is intentionally slow (that’s what makes it secure). For example, 12 rounds means the hashing algorithm is iterated many times to make brute force attacks harder.
Because this work is expensive (CPU heavy), bcrypt provides async versions that run on the event loop without blocking the entire server thread.
*/

export const generateJwtToken = (userId: string): string => {
  return jwt.sign(
    {
      userId,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

export const verifyJwtToken = (token: string): { userId: string } => {
  return jwt.verify(token, JWT_SECRET) as { userId: string };
  // assertion to tell TS that we are sure verify will return an object that will contain userId that will have type string
};

// Because jwt ops are fast, they are provided as synchronous functions — no need for async/await.

export const getCurrentUser = async (): Promise<User | null> => {
  // You don’t get req with cookies at the top level; you explicitly call cookies(). You don’t call middleware like cookieParser() — Next.js does cookie parsing for you. cookies() gives a store you query by name.
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const decoded = verifyJwtToken(token);

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user) return null;

  // no need to send the password
  const { password, ...rest } = user;

  return rest as User;
}

export const checkUserPermission = (
  user: User,
  requiredRole: Role
): boolean => {
  const roleHierarchy = {
    [Role.GUEST]: 0,
    [Role.USER]: 1,
    [Role.MANAGER]: 2,
    [Role.ADMIN]: 3
  };

  return roleHierarchy[user.role] >= roleHierarchy[requiredRole]; 
}