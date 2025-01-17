import { PrismaAdapter } from "@auth/prisma-adapter";
import { HiringManager, Interviewer } from "@prisma/client";
import {
  type DefaultSession,
  type NextAuthOptions,
  getServerSession,
} from "next-auth";
import { type Adapter, AdapterUser } from "next-auth/adapters";
import Email from "next-auth/providers/email";

import { env } from "~/env";
import { db } from "~/server/db";

import { sendNudgeEmail } from "./services/nudge";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
      hiringManager?: HiringManager;
      interviewer?: Interviewer;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: {
    ...(PrismaAdapter(db) as Adapter),
    getUser: async (id) =>
      db.user.findUnique({
        where: { id },
        include: { hiringManager: true, interviewer: true, applicant: true },
      }) as Promise<AdapterUser | null>,
  },
  providers: [
    Email({
      sendVerificationRequest: async ({ identifier: email, token }) => {
        if (email.endsWith("@tilli.pro") || email.endsWith("@utilli.com")) {
          const result = await sendVerificationEmail(email, token);
          if (result) {
            console.log("Email sent successfully");
          } else {
            console.log("Email failed to send");
          }
        } else {
        }
      },
      from: "careers@tilli.pro",
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
    error: "/auth/error",
    verifyRequest: "/auth/otp",
    newUser: "/auth/create",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

const sendVerificationEmail = async (email: string, otp: string) =>
  sendNudgeEmail({ email }, env.NUDGE_OTP_ID, { otp });
