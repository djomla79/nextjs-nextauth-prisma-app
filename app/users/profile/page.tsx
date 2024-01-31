import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { sendMailTemplate, getUserByEmail } from '@/lib/actions';
import { activationTemplate } from '@/lib/email/templates';
import UserDetails from '@/components/shared/UserDetails';

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  const sessionEmail = session?.user?.email ? session.user.email : '';

  const user = await getUserByEmail(sessionEmail);

  if (!user) throw new Error('User is not found!');

  const { id, fullName, email } = user;

  const activateUserEmailHandler = async () => {
    'use server';
    try {
      sendMailTemplate(id, fullName, email, 'activation', activationTemplate);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex justify-center items-center flex-col'>
      <UserDetails {...user} activateUserEmail={activateUserEmailHandler} />
    </div>
  );
};

export default ProfilePage;
