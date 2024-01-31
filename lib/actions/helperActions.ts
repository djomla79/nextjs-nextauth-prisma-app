'use server';

import { revalidatePath } from 'next/cache';
import {
  findUserByEmail,
  findUserById,
  updatePasswordById,
} from './prismaActions';
import { verifyJwt, signJwt } from '@/lib/jwt';
import { compileTemplate, sendMail } from '@/lib/email';
import { resetPasswordTemplate } from '../email/templates';
import { BASE_URL, activationUserStatus } from '../constants';

export const forgotPassword = async (email: string) => {
  const user = await findUserByEmail(email);

  if (!user) throw new Error('User does not exist!');

  const { id, fullName } = user;

  return sendMailTemplate(
    id,
    fullName,
    email,
    'resetPassword',
    resetPasswordTemplate
  );
};

export const resetPassword = async (jwtUserId: string, password: string) => {
  const payload = verifyJwt(jwtUserId);

  if (!payload) return activationUserStatus.NOT_EXIST;

  const userId = payload.id;
  const user = await findUserById(userId);

  if (!user) return activationUserStatus.NOT_EXIST;

  const resetPassword = await updatePasswordById(userId, password);

  if (!resetPassword) throw new Error('Reset password has failed!');

  return activationUserStatus.SUCCESS;
};

export const sendMailTemplate = async (
  id: string,
  name: string,
  email: string,
  urlType: string,
  template: string
) => {
  const jwtUserId = signJwt({ id });
  const path = `/auth/${urlType}/${jwtUserId}`;
  const url = `${BASE_URL}${path}`;
  const body = compileTemplate(name, url, template);
  const subject =
    urlType === 'activation' ? 'Account Activation' : 'Reset Password';

  revalidatePath(path);

  return await sendMail({
    from: 'user.example@example.com',
    to: email,
    subject,
    body,
  });
};
