'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { EnvelopeIcon } from '@heroicons/react/20/solid';
import { forgotPassword } from '@/lib/actions';
import { ForgotPasswordSchema } from '@/lib/validation';
import { ForgotPasswordInputType } from '@/lib/types/validationTypes';

const ForgotPassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInputType>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const submitRequest: SubmitHandler<ForgotPasswordInputType> = async ({
    email,
  }) => {
    try {
      const result = await forgotPassword(email);
      if (result) toast.success('Reset password link was sent to your email.');
      reset();
      router.push('/auth/login');
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <form
        className='flex flex-col min-w-[800px] gap-2 p-2 border m-2 rounded-md shadow'
        onSubmit={handleSubmit(submitRequest)}
      >
        <Input
          label='Email'
          {...register('email')}
          startContent={<EnvelopeIcon className='w-6' />}
          errorMessage={errors.email?.message}
        />
        <Button
          isLoading={isSubmitting}
          type='submit'
          disabled={isSubmitting}
          color='primary'
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
