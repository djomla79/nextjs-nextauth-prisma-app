import { verifyJwt } from '@/lib/jwt';
import ResetPassword from '@/components/auth/ResetPassword';

type ResetPasswordPageProps = {
  params: {
    jwt: string;
  };
};

const ResetPasswordPage = ({ params: { jwt } }: ResetPasswordPageProps) => {
  const verify = verifyJwt(jwt);

  if (!verify)
    return (
      <div className='flex items-center justify-center h-screen text-red-500 text-2xl'>
        Jwt verification failed!
      </div>
    );

  return (
    <div className='flex justify-center items-center'>
      <ResetPassword jwtUserId={jwt} />
    </div>
  );
};

export default ResetPasswordPage;
