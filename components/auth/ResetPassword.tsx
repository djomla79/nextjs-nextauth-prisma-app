'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Button, Input } from '@nextui-org/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import PasswordStrength from './PasswordStrength';
import { resetPassword } from '@/lib/actions';
import { ResetPasswordSchema } from '@/lib/validation';
import { ResetPasswordInputType } from '@/lib/types';
import { activationUserStatus } from '@/lib/constants';

type ResetPasswordProps = {
  jwtUserId: string;
};

const ResetPassword = ({ jwtUserId }: ResetPasswordProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInputType>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'onBlur',
  });

  const togglePassword = () => setIsVisible((prev) => !prev);

  const resetPasswordHandler: SubmitHandler<ResetPasswordInputType> = async ({
    password,
  }) => {
    try {
      const result = await resetPassword(jwtUserId, password);
      if (result === activationUserStatus.SUCCESS)
        toast.success('Your password has been reset successfully!');
      reset();
      router.push('/auth/login');
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(resetPasswordHandler)}
      className='flex flex-col min-w-[800px] gap-2 p-2 m-2 border rounded-md shadow'
    >
      <div className='text-center p-2'>Reset Your Password</div>
      <Input
        type={isVisible ? 'text' : 'password'}
        label='Password'
        {...register('password')}
        errorMessage={errors.password?.message}
        endContent={
          <button type='button' onClick={togglePassword}>
            {isVisible ? (
              <EyeSlashIcon className='w-6' />
            ) : (
              <EyeIcon className='w-6' />
            )}
          </button>
        }
      />
      <PasswordStrength watch={watch} />
      <Input
        type={isVisible ? 'text' : 'password'}
        label='Confirm Password'
        {...register('confirmPassword')}
        errorMessage={errors.confirmPassword?.message}
      />
      <div className='flex justify-center'>
        <Button
          isLoading={isSubmitting}
          type='submit'
          disabled={isSubmitting}
          color='primary'
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default ResetPassword;
