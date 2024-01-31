export type RegisterUserType = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  username: string;
};

export type CreateUserType = {
  fullName: string;
  email: string;
  username: string;
  role: string;
};

export type UserDetailsType = {
  id: string;
  fullName: string;
  email: string;
  username: string;
  emailVerified?: string | null;
};
