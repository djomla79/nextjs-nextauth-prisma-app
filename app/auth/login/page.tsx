import { Button } from '@nextui-org/react';
import Link from 'next/link';
import Login from '@/components/auth/Login';

const LoginPage = () => {
  return (
    <div className='flex items-center justify-center flex-col '>
      <Login />
      <Button className='mt-2' as={Link} href='/auth/forgotPassword'>
        Forgot Your Password?
      </Button>
    </div>
  );
};

export default LoginPage;
