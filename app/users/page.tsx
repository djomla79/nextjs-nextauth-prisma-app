import { getAllUsers } from '@/lib/actions/userActions';
import UserList from '@/components/user/UserList';

const UsersPage = async () => {
  const users = await getAllUsers();
  return (
    <div>
      <div className='flex justify-center'>User List Page</div>
      <UserList data={users} />
    </div>
  );
};

export default UsersPage;
