

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/db';
import User from '@/models/User';

// Ensure authOptions is exported from this file
export const authOptions = {
  // Add your authentication options here
  secret: process.env.AUTH_SECRET,
  providers: [
    // Add your authentication providers here
  ],
};

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        indexNumber: { label: "Index Number", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Record<"indexNumber" | "password", string> | undefined) {
        if (!credentials?.indexNumber || !credentials?.password) {
          return null;
        }

        await dbConnect();
        
        const user = await User.findOne({ indexNumber: credentials.indexNumber });
        
        if (!user) {
          return null;
        }
        
        const isValid = await user.comparePassword(credentials.password);
        
        if (!isValid) {
          return null;
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
          batch: user.batch
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.indexNumber = token.indexNumber as string;
        session.user.faculty = token.faculty as string;
        session.user.department = token.department as string;
        session.user.degree = token.degree as string;
        session.user.batch = token.batch as string;
      }
      return session;
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.indexNumber = user.indexNumber;
        token.faculty = user.faculty;
        token.department = user.department;
        token.degree = user.degree;
        token.batch = user.batch;
      }
      return token;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  }
});

export { handler as GET, handler as POST };