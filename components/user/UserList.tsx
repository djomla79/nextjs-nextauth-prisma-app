'use client';

import CustomList from '../shared/CustomList';
import { UserDetailsType } from '@/lib/types';

type UserListProps = {
  data: UserDetailsType[];
};

const userColumns = [
  {
    key: 'fullName',
    label: 'NAME',
  },
  {
    key: 'username',
    label: 'USERNAME',
  },
  {
    key: 'email',
    label: 'EMAIL',
  },
  {
    key: 'emailVerified',
    label: 'EMAIL VERIFIED',
  },
];

const UserList = ({ data }: UserListProps) => {
  return <CustomList data={data} columns={userColumns} />;
};

export default UserList;
