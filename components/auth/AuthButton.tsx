'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@nextui-org/react';

const AuthButton = () => {
  const { data, status } = useSession();
  const router = useRouter();

  return (
    <div className='flex items-center gap-2'>
      {status === 'authenticated' ? (
        <>
          <Link
            className='tex-sky-500 hover:text-sky-600 transition-colors mr-2'
            href='/users/profile'
          >{`${data?.user?.username}`}</Link>
          <Button
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                router.push('/auth/login');
              });
            }}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() => signIn()}>Login</Button>
          <Button as={Link} href='/auth/register'>
            Register
          </Button>
        </>
      )}
    </div>
  );
};

export default AuthButton;
