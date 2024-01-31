'use client';

import Link from 'next/link';
import { UserDetailsType } from '@/lib/types';
import CustomDynamicList from '../shared/CustomDynamicList';
import { Button } from '@nextui-org/react';
import { UserPlusIcon } from '@heroicons/react/20/solid';

type UserDynamicListProps = {
  data: UserDetailsType[];
  deleteUser: (userId: string) => void;
};

const userColumns = [
  { name: 'FULLNAME', uid: 'fullName' },
  { name: 'USERNAME', uid: 'username' },
  { name: 'EMAIL', uid: 'email' },
  { name: 'EMAIL VERIFIED', uid: 'emailVerified' },
  { name: 'ACTIONS', uid: 'actions' },
];

const UserDynamicList = ({ data, deleteUser }: UserDynamicListProps) => {
  return (
    <div>
      <CustomDynamicList
        users={data}
        columns={userColumns}
        deleteUser={deleteUser}
      />
      <div className='flex justify-start flex-row'>
        <Button as={Link} href='/admin/createUser'>
          Add User
        </Button>
        <UserPlusIcon className='w-5 ml-2' />
      </div>
    </div>
  );
};

export default UserDynamicList;
