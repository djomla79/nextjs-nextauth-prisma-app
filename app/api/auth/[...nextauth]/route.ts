import NextAuth from 'next-auth/next';
import { Account, AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { Adapter } from 'next-auth/adapters';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcrypt';
import prisma from '@/lib/db/prisma';
import { User as UserPrisma } from '@prisma/client';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET,
} from '@/lib/constants/config';

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: NEXTAUTH_SECRET,
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.sub,
          fullName: `${profile.given_name} ${profile.family_name}`,
          username: profile.email,
          email: profile.email,
          emailVerified: profile.email_verified,
          image: profile.picture,
          role: profile.role ?? 'user',
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email) throw new Error('Please, provide your email.');

        if (!credentials?.password)
          throw new Error('Please, provide your password.');

        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) throw new Error('User does not match!');

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) throw new Error('Password does not match!');

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: User;
      account: Account | null;
    }): Promise<any> {
      if (account?.provider === 'google') {
        try {
          const { id, fullName, email, emailVerified, role, image } =
            user as UserPrisma;
          const isUserExist = await prisma.user.findUnique({
            where: { email },
          });

          if (isUserExist) {
            return true;
          } else {
            let emailVerifiedNow = null;

            if (emailVerified)
              emailVerifiedNow = new Date().toISOString().substring(0, 16);

            const newUser = {
              id,
              fullName,
              username: email,
              password: await bcrypt.hash(email, 10),
              email: email,
              emailVerified: emailVerifiedNow,
              role,
              image,
            };
            await prisma.user.create({
              data: {
                ...newUser,
              },
            });
            return true;
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token = {
          role: user.role,
          email: user.email,
          username: user.username,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        role: token.role,
        email: token.email,
        username: token.username,
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
