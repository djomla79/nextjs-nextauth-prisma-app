'use server';

import { cache } from 'react';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/db/prisma';
import { CreateUserType } from '../types';

export const createUser = async (user: CreateUserType, password: string) => {
  return await prisma.user.create({
    data: {
      ...user,
      password: await bcrypt.hash(password, 10),
    },
  });
};

export const findUserByEmail = cache(async (email: string) => {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
});

export const findUserById = cache(async (userId: string) => {
  return await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
});

export const updateEmailVerifiedById = async (userId: string) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      // TODO: use date lib such as dayjs or moment
      emailVerified: new Date().toISOString().substring(0, 16),
    },
  });
};

export const updatePasswordById = async (userId: string, password: string) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: await bcrypt.hash(password, 10),
    },
  });
};

export const findAllUsers = cache(async () => {
  return await prisma.user.findMany();
});

export const findAllByAdminRole = cache(async () => {
  return await prisma.user.findMany({
    where: {
      role: 'admin',
    },
  });
});

export const findAllByUserRole = cache(async () => {
  return await prisma.user.findMany({
    where: {
      role: 'user',
    },
  });
});

export const updateUserById = cache(
  async (userId: string, fullName: string, username: string) => {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        fullName,
        username,
      },
    });
  }
);

export const deleteUserById = cache(async (userId: string) => {
  return await prisma.user.delete({
    where: {
      id: userId,
    },
  });
});
