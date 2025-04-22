import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/nextauth/route';

export async function requireAuth(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: { session } };
}

export async function requireAdmin(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/unauthorized',
        permanent: false,
      },
    };
  }

  return { props: { session } };
}

export async function requireStudent(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  if (!session || session.user.role !== 'student') {
    return {
      redirect: {
        destination: '/unauthorized',
        permanent: false,
      },
    };
  }

  return { props: { session } };
}