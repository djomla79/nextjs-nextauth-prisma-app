'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { registerUser } from '@/lib/actions';
import { RegisterSchema } from '@/lib/validation';
import { RegisterInputType } from '@/lib/types';
import RegisterForm from '../shared/RegisterForm';

const CreateUser = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
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
      await registerUser(user, 'admin');
      toast.success('User successfully created.');
      reset();
      router.push('/admin');
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

export default CreateUser;
