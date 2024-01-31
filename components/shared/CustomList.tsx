'use client';

import { UserDetailsType, AdminDetailsType } from '@/lib/types';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from '@nextui-org/react';

type CustomListProps = {
  data: UserDetailsType[] | AdminDetailsType[];
  columns: { key: string; label: string }[];
};

const CustomList = ({ data, columns }: CustomListProps) => {
  return (
    <Table aria-label='Dynamic Table'>
      <TableHeader columns={columns}>
        {({ key, label }) => <TableColumn key={key}>{label}</TableColumn>}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={`${item.fullName}${item.email}`}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CustomList;
