import { getUserById, verifyEmail, editUser } from '@/lib/actions';
import UserDetails from '@/components/shared/UserDetails';

type UserDetailsPageProps = {
  params: {
    userId: string;
  };
  searchParams: {
    isEdit: boolean;
  };
};

const UserDetailsPage = async ({
  params: { userId },
  searchParams: { isEdit: isEditFromParams },
}: UserDetailsPageProps) => {
  const user = await getUserById(userId);

  const isEdit = isEditFromParams ? isEditFromParams : false;

  const activateUserEmailHandler = async () => {
    'use server';
    try {
      await verifyEmail(userId);
    } catch (error) {
      console.log(error);
    }
  };

  const editUserHandler = async (fullName: string, username: string) => {
    'use server';
    try {
      await editUser(userId, fullName, username);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) throw new Error('User is not found!');

  return (
    <div className='flex justify-center items-center flex-col'>
      <UserDetails
        {...user}
        isAdmin
        isEdit={isEdit}
        editUser={editUserHandler}
        activateUserEmail={activateUserEmailHandler}
      />
    </div>
  );
};

export default UserDetailsPage;
