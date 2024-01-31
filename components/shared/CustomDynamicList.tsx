'use client';

import { useCallback } from 'react';
import { Link } from '@nextui-org/react';
import { UserDetailsType } from '@/lib/types';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from '@nextui-org/react';
import {
  EyeIcon,
  TrashIcon,
  PencilSquareIcon,
} from '@heroicons/react/20/solid';

type CustomDynamicListProps = {
  users: UserDetailsType[];
  columns: { name: string; uid: string }[];
  deleteUser: (userId: string) => void;
};

const CustomDynamicList = ({
  users,
  columns,
  deleteUser,
}: CustomDynamicListProps) => {
  const deleteUserHandler = useCallback(
    (userId: string) => {
      deleteUser(userId);
    },
    [deleteUser]
  );

  const renderCell = useCallback(
    (user: any, columnKey: string | number) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case 'fullName':
          return (
            <div className='flex flex-col'>
              <p className='text-bold text-sm capitalize'>{cellValue}</p>
            </div>
          );
        case 'username':
          return (
            <div className='flex flex-col'>
              <p className='text-bold text-sm'>{cellValue}</p>
            </div>
          );
        case 'email':
          return (
            <div className='flex flex-col'>
              <p className='text-bold text-sm'>{cellValue}</p>
            </div>
          );
        case 'emailVerified':
          return (
            <div className='flex flex-col'>
              <p className='text-bold text-sm'>{cellValue}</p>
            </div>
          );
        case 'actions':
          return (
            <div className='relative flex items-center gap-2'>
              <Tooltip content='Details'>
                <Link
                  href={`/admin/userDetails/${user.id}`}
                  className='text-lg text-default-400 cursor-pointer active:opacity-50'
                >
                  <EyeIcon className='w-5' />
                </Link>
              </Tooltip>
              <Tooltip content='Edit user'>
                <Link
                  href={`/admin/userDetails/${user.id}?isEdit=true`}
                  className='text-lg text-default-400 cursor-pointer active:opacity-50'
                >
                  <PencilSquareIcon className='w-5' />
                </Link>
              </Tooltip>
              <Tooltip color='danger' content='Delete user'>
                <span
                  onClick={() => deleteUserHandler(user.id)}
                  className='text-lg text-danger cursor-pointer active:opacity-50'
                >
                  <TrashIcon className='w-5' />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [deleteUserHandler]
  );

  return (
    <Table aria-label='Table with custom cells'>
      <TableHeader columns={columns}>
        {({ uid, name }) => (
          <TableColumn key={uid} align={uid === 'actions' ? 'center' : 'start'}>
            {name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CustomDynamicList;
