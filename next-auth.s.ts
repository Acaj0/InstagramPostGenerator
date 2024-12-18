import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      /** Add any additional properties here */
      role?: string;
    } & DefaultSession["user"];
  }
}
