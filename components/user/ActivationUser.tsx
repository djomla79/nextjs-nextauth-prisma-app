import { activationUserStatus } from '@/lib/constants';

type ActivationUserProps = {
  status: string;
};

const ActivationUser = ({ status }: ActivationUserProps) => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      {status === activationUserStatus.NOT_EXIST ? (
        <div className='text-red-500 text-2xl'>User does not exist!</div>
      ) : status === activationUserStatus.ACTIVATED ? (
        <div className='text-yellow-500 text-2xl'>
          User is already activated!
        </div>
      ) : status === activationUserStatus.SUCCESS ? (
        <div className='text-green-500 text-2xl'>
          User is successfully activated!
        </div>
      ) : status === activationUserStatus.TOKEN_EXPIRED ? (
        <div className='text-red-500 text-2xl'>Jwt token expired!</div>
      ) : (
        <div className='text-red-500 text-2xl'>User activation failed!</div>
      )}
    </div>
  );
};

export default ActivationUser;
