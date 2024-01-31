import { z } from 'zod';

export const RegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'First name must be at least 2 characters!')
      .max(40, 'First name must be less than 40 characters!')
      .regex(new RegExp('^[a-zA-Z0-9]+$'), 'No special characters allowed!'),
    lastName: z
      .string()
      .min(2, 'Last name must be at least 2 characters!')
      .max(40, 'Last name must be less than 40 characters!')
      .regex(new RegExp('^[a-zA-Z0-9]+$'), 'No special characters allowed!'),
    email: z.string().email('Please enter a valid email address!'),
    username: z
      .string()
      .min(2, 'Username must be at least 2 characters!')
      .max(30, 'Username must be less than 30 characters!')
      .regex(
        new RegExp('^[a-zA-Z0-9_@./#&+-?!*% ]*$'),
        'Some special characters not allowed!'
      ),
    password: z
      .string()
      .min(5, 'Password must be at least 5 characters!')
      .max(40, 'Password must be less than 40 characters!'),
    confirmPassword: z
      .string()
      .min(5, 'Password must be at least 5 characters!')
      .max(40, 'Password must be less than 40 characters!'),
    confirmSubmit: z.literal(true, {
      errorMap: () => ({
        message: 'Please, confirm submit!',
      }),
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password and confirm password doesn't match!",
    path: ['confirmPassword'],
  });

export const UserSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters!')
    .max(40, 'First name must be less than 40 characters!')
    .regex(new RegExp('^[a-zA-Z0-9]+$'), 'No special characters allowed!'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters!')
    .max(40, 'Last name must be less than 40 characters!')
    .regex(new RegExp('^[a-zA-Z0-9]+$'), 'No special characters allowed!'),
  email: z.string().email('Please enter a valid email address!'),
  username: z
    .string()
    .min(2, 'Username must be at least 2 characters!')
    .max(30, 'Username must be less than 30 characters!')
    .regex(
      new RegExp('^[a-zA-Z0-9_@./#&+-?!*% ]*$'),
      'Some special characters not allowed!'
    ),
  password: z
    .string()
    .min(5, 'Password must be at least 5 characters!')
    .max(40, 'Password must be less than 40 characters!'),
});

export const LoginSchema = z.object({
  email: z.string().email('Please, enter a valid email address!'),
  password: z.string({
    required_error: 'Please, enter your password!',
  }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address!'),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(5, 'Password must be at least 5 characters!')
      .max(40, 'Password must be less than 40 characters!'),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Password does not match!',
    path: ['confirmPassword'],
  });
