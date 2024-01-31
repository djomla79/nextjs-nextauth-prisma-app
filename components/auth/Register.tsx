'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { registerUser } from '@/lib/actions';
import { RegisterSchema } from '@/lib/validation';
import { RegisterInputType } from '@/lib/types';
import { BASE_URL } from '@/lib/constants';
import RegisterForm from '../shared/RegisterForm';

const Register = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<RegisterInputType>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onBlur',
  });

  const togglePassword = () => setIsVisible((prev) => !prev);

  const saveUser: SubmitHandler<RegisterInputType> = async (data) => {
    const { confirmSubmit, confirmPassword, ...user } = data;

    try {
      const { email, password } = await registerUser(user, 'user');
      await signIn('credentials', {
        email,
        password,
        callbackUrl: `${BASE_URL}/users/profile`,
      });
      toast.success('User successfully registered.');
      reset();
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  return (
    <RegisterForm
      data={{
        handleSubmit,
        saveUser,
        register,
        errors,
        control,
        togglePassword,
        isVisible,
        watch,
      }}
    />
  );
};

export default Register;
