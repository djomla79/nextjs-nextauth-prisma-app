'use client';

import CustomList from '../shared/CustomList';
import { AdminDetailsType } from '@/lib/types';

type AdminListProps = {
  data: AdminDetailsType[];
};

const adminColumns = [
  {
    key: 'fullName',
    label: 'NAME',
  },
  {
    key: 'email',
    label: 'EMAIL',
  },
];

const AdminList = ({ data }: AdminListProps) => {
  return <CustomList data={data} columns={adminColumns} />;
};

export default AdminList;
