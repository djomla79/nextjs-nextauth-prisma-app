'use client';

import CustomCard from './CustomCard';
import { UserDetailsType } from '@/lib/types';

type UserDetailsProps = UserDetailsType & {
  isEdit?: boolean;
  isAdmin?: boolean;
  editUser?: (fullName: string, username: string) => Promise<void>;
  activateUserEmail: () => void;
};

const UserDetails = ({
  fullName,
  email,
  emailVerified,
  username,
  isEdit,
  isAdmin,
  editUser,
  activateUserEmail,
}: UserDetailsProps) => {
  return (
    <CustomCard
      fullName={fullName}
      email={email}
      emailVerified={emailVerified}
      username={username}
      isEdit={isEdit}
      isAdmin={isAdmin}
      editUser={editUser}
      activateUserEmail={activateUserEmail}
    />
  );
};

export default UserDetails;
