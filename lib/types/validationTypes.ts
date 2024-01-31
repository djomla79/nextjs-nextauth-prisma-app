import { z } from 'zod';
import {
  RegisterSchema,
  LoginSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from '../validation';

export type RegisterInputType = z.infer<typeof RegisterSchema>;
export type LoginInputType = z.infer<typeof LoginSchema>;
export type ForgotPasswordInputType = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordInputType = z.infer<typeof ResetPasswordSchema>;
