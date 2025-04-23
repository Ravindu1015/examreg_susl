import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET, // Make sure this is defined in your .env

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        indexNumber: { label: 'Index Number', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.indexNumber || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        await dbConnect();

        const user = await User.findOne({ indexNumber: credentials.indexNumber });
        if (!user) {
          throw new Error('No user found with this index number');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          indexNumber: user.indexNumber,
          name: user.name,
          email: user.email,
          role: user.role,
          faculty: user.faculty,
          department: user.department,
          degree: user.degree,
          batch: user.batch,
        };
      },
    }),
  ],

  session: {
    strategy: 'jwt' as 'jwt',
  },

  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.indexNumber = user.indexNumber;
        token.role = user.role;
        token.faculty = user.faculty;
        token.department = user.department;
        token.degree = user.degree;
        token.batch = user.batch;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.indexNumber = token.indexNumber;
        session.user.role = token.role;
        session.user.faculty = token.faculty;
        session.user.department = token.department;
        session.user.degree = token.degree;
        session.user.batch = token.batch;
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login', // Same as signIn if you want to show errors there
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
