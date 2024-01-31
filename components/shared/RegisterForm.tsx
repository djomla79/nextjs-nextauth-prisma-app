import { Button, Checkbox, Input } from '@nextui-org/react';
import {
  Controller,
  UseFormHandleSubmit,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
  Control,
} from 'react-hook-form';
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  UserIcon,
  UserCircleIcon,
} from '@heroicons/react/20/solid';
import PasswordStrength from '../auth/PasswordStrength';
import { RegisterInputType } from '@/lib/types';

type RegisterFormProps = {
  data: {
    handleSubmit: UseFormHandleSubmit<RegisterInputType>;
    saveUser: SubmitHandler<RegisterInputType>;
    register: UseFormRegister<RegisterInputType>;
    errors: FieldErrors<RegisterInputType>;
    control: Control<RegisterInputType>;
    togglePassword: () => void;
    isVisible: boolean;
    watch: () => void;
  };
};

const RegisterForm = ({ data }: RegisterFormProps) => {
  const {
    handleSubmit,
    saveUser,
    register,
    errors,
    control,
    togglePassword,
    isVisible,
    watch,
  } = data;
  return (
    <form
      onSubmit={handleSubmit(saveUser)}
      className='grid grid-cols-2 p-2 gap-2 place-self-stretch shadow border rounded-md min-w-[860px]'
    >
      <Input
        errorMessage={errors.firstName?.message}
        isInvalid={!!errors.firstName}
        {...register('firstName')}
        label='First Name'
        startContent={<UserIcon className='w-6' />}
      />
      <Input
        errorMessage={errors.lastName?.message}
        isInvalid={!!errors.lastName}
        {...register('lastName')}
        label='Last Name'
        startContent={<UserIcon className='w-6' />}
      />
      <Input
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        {...register('email')}
        className='col-span-2'
        label='Email'
        startContent={<EnvelopeIcon className='w-6' />}
      />
      <Input
        errorMessage={errors.username?.message}
        isInvalid={!!errors.username}
        {...register('username')}
        className='col-span-2'
        label='Username'
        startContent={<UserCircleIcon className='w-6' />}
      />
      <Input
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        {...register('password')}
        className='col-span-2'
        label='Password'
        type={isVisible ? 'text' : 'password'}
        startContent={<KeyIcon className='w-6' />}
        endContent={
          isVisible ? (
            <EyeSlashIcon
              className='w-6 cursor-pointer'
              onClick={togglePassword}
            />
          ) : (
            <EyeIcon className='w-6 cursor-pointer' onClick={togglePassword} />
          )
        }
      />
      <PasswordStrength watch={watch} />
      <Input
        errorMessage={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword}
        {...register('confirmPassword')}
        className='col-span-2 mb-2'
        label='Confirm Password'
        type={isVisible ? 'text' : 'password'}
        startContent={<KeyIcon className='w-6' />}
      />
      <Controller
        control={control}
        name='confirmSubmit'
        render={({
          field: { onChange, onBlur, value },
          formState,
          fieldState,
        }) => (
          <>
            <Checkbox
              onBlur={onBlur}
              onChange={onChange}
              checked={value}
              className='col-span-2'
            >
              Confirm Submit
            </Checkbox>
            {value !== undefined && !value && (
              <div
                className={`${
                  fieldState.isTouched || formState.isSubmitted || !value
                    ? 'text-red-800'
                    : ''
                }`}
              >
                {errors.confirmSubmit?.message || 'Please, confirm submit!'}
              </div>
            )}
          </>
        )}
      />
      <div className='flex justify-center col-span-2'>
        <Button className='w-48' color='primary' type='submit'>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
