import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "@/lib/db";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const authOptions = {
  session: {
    strategy: "jwt" as const,
  },

  pages: {
    signIn: "/auth/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        console.log("LOGIN ATTEMPT:", credentials);

        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          console.log("VALIDATION FAILED");
          return null;
        }

        const { email, password } = parsed.data;

const dbInfo = await prisma.$queryRawUnsafe(
  "SELECT current_database(), current_schema()"
);

console.log("DB INFO:", dbInfo);

const count = await prisma.user.count();
console.log("USER COUNT:", count);

console.log("EMAIL:", email);

const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
  },
});

console.log("ALL USERS:", users);

const user = await prisma.user.findUnique({
  where: { email },
});

        console.log("USER FOUND:", !!user);

        if (!user) {
          console.log("USER NOT FOUND");
          return null;
        }

        const { verifyPassword } = await import("@/lib/auth/password");

        const ok = await verifyPassword({
          password,
          passwordHash: user.passwordHash,
        });

        console.log("PASSWORD MATCH:", ok);

        if (!ok) {
          console.log("INVALID PASSWORD");
          return null;
        }

        console.log("LOGIN SUCCESS");

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }: any) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }

      return session;
    },
  },
};