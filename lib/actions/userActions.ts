'use server';

import { revalidatePath } from 'next/cache';
import { verifyJwt } from '@/lib/jwt';
import {
  createUser,
  findAllUsers,
  findUserByEmail,
  findUserById,
  findAllByUserRole,
  findAllByAdminRole,
  updateEmailVerifiedById,
  updateUserById,
  deleteUserById,
} from './prismaActions';
import { sendMailTemplate } from './helperActions';
import { activationTemplate } from '../email/templates';
import { activationUserStatus } from '../constants';
import { RegisterUserType } from '../types';
import { UserSchema } from '../validation';

export const registerUser = async (user: RegisterUserType, page: string) => {
  const { firstName, lastName, email, username, password } = user;
  const validateUser = UserSchema.safeParse(user);

  if (!validateUser.success)
    throw new Error('Validation failed, user is not saved!');

  const fullName = `${firstName} ${lastName}`;

  const newUser = {
    fullName,
    email,
    username,
    role: 'user',
  };

  const userCreated = await createUser(newUser, password);

  if (page === 'admin') {
    revalidatePath('/admin');
  } else {
    revalidatePath('/users/profile');
  }

  sendMailTemplate(
    userCreated.id,
    fullName,
    email,
    'activation',
    activationTemplate
  );

  return { email, password };
};

export const activateUser = async (jwtUserID: string) => {
  const payload = verifyJwt(jwtUserID);

  if (payload === null) return activationUserStatus.TOKEN_EXPIRED;

  const userId = payload?.id;

  const user = await findUserById(userId);

  if (!user) return activationUserStatus.NOT_EXIST;

  if (typeof user.emailVerified === 'string')
    return activationUserStatus.ACTIVATED;

  await updateEmailVerifiedById(userId);

  // revalidatePath('/users');
  // revalidatePath('/users/profile');

  return activationUserStatus.SUCCESS;
};

export const getUserByEmail = async (email: string) => {
  const user = await findUserByEmail(email);

  if (!user) throw new Error('User is not found!');

  revalidatePath('/users/profile');

  return user;
};

export const getUserById = async (userId: string) => {
  const user = await findUserById(userId);

  if (!user) throw new Error('User is not found!');

  revalidatePath(`/admin/userDetails/${userId}`);

  return user;
};

export const verifyEmail = async (userId: string) => {
  revalidatePath(`/admin/userDetails/${userId}`);
  await updateEmailVerifiedById(userId);
};

export const getAllUsers = async () => {
  revalidatePath('/users');
  return await findAllUsers();
};

export const getAllByUserRole = async () => {
  revalidatePath('/admin');
  return await findAllByUserRole();
};

export const getAllByAdminRole = async () => {
  revalidatePath('/admin');
  return await findAllByAdminRole();
};

export const editUser = async (
  userId: string,
  fullName: string,
  username: string
) => {
  revalidatePath('/admin');
  return await updateUserById(userId, fullName, username);
};

export const deleteUser = async (userId: string) => {
  revalidatePath('/admin');
  return await deleteUserById(userId);
};
