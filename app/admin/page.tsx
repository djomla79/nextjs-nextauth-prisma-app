import { getAllByAdminRole, getAllByUserRole, deleteUser } from '@/lib/actions';
import AdminList from '@/components/admin/AdminList';
import UserDynamicList from '@/components/user/UserDynamicList';

const AdminPage = async () => {
  const admins = await getAllByAdminRole();
  const users = await getAllByUserRole();
  return (
    <div className='grid grid-cols-[1fr_2fr] gap-2'>
      <div className='flex flex-col'>
        <div className='p-3'>Administrators</div>
        <AdminList data={admins} />
      </div>
      <div className='flex flex-col'>
        <div className='p-3'>Users</div>
        <UserDynamicList data={users} deleteUser={deleteUser} />
      </div>
    </div>
  );
};

export default AdminPage;
