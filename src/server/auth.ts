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
    getUser: async (id) =>
      db.user.findFirst({
        where: { id },
        include: { hiringManager: true, interviewer: true },
      }) as Promise<AdapterUser | null>,
    ...(PrismaAdapter(db) as Adapter),
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
        }
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

export const sendVerificationEmail = async (email: string, otp: string) => {
  const result = await fetch("https://app.nudge.net/api/v1/Nudge/Send", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: env.NUDGE_API_KEY,
    },
    body: JSON.stringify({
      nudgeId: env.NUDGE_OTP_ID,
      toEmailAddress: email,
      toName: "Tilli Team Member",
      mergeTags: [
        {
          tagName: "otp",
          tagValue: otp,
        },
      ],
      channel: 0,
    }),
  });

  if (result.status >= 200 && result.status <= 399) {
    return true;
  }

  return false;
};
