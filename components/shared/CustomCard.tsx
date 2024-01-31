'use client';

import { useInput } from '@/lib/hooks';
import { toast } from 'react-toastify';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Input,
  //   Image,
} from '@nextui-org/react';
import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/20/solid';

type CustomCardProps = {
  fullName: string;
  email: string;
  emailVerified: string | null | undefined;
  username: string;
  isEdit?: boolean;
  isAdmin?: boolean;
  editUser?: (fullName: string, username: string) => Promise<void>;
  activateUserEmail: () => void;
};

const CustomCard = ({
  fullName: name,
  email,
  emailVerified,
  username: uname,
  isEdit,
  isAdmin,
  editUser,
  activateUserEmail,
}: CustomCardProps) => {
  const { fullName, username, onChangeHandler } = useInput(name, uname);

  const editUserHandler = () => {
    editUser && editUser(fullName, username);
    toast.success('User successfully updated.');
  };

  const userEmailActivationHandler = () => {
    activateUserEmail();
  };

  return (
    <Card className='max-w-[600px] min-w-[600px]'>
      <CardHeader className='flex gap-3 justify-center'>
        {/* <Image
            alt='image'
            height={40}
            radius='sm'
            src={image}
            width={40}
          /> */}
        <div className='flex justify-center'>{`${
          isAdmin ? 'NAME:' : 'WELCOME'
        } ${fullName}`}</div>
      </CardHeader>
      <Divider />
      {!isEdit ? (
        <CardBody className='flex justify-center items-center'>
          {isAdmin && <div>{`Username: ${username}`}</div>}
          <div>{`Email: ${email}`}</div>
          {emailVerified ? (
            <div>{`Verification date: ${emailVerified}`}</div>
          ) : (
            <div className='flex flex-row justify-center'>
              <div className='mr-2'>Not yet verified</div>
              <ShieldExclamationIcon className='w-5' />
            </div>
          )}
        </CardBody>
      ) : (
        <CardBody className='flex justify-center items-center'>
          <Input
            type='text'
            name='fullName'
            placeholder='Full Name'
            value={fullName}
            onChange={onChangeHandler}
          />
          <Input
            type='text'
            name='username'
            placeholder='Username'
            value={username}
            onChange={onChangeHandler}
          />
          <div className='flex self-start m-2'>{`Email: ${email}`}</div>
          {emailVerified ? (
            <div className='flex self-start m-2'>{`Verification date: ${emailVerified}`}</div>
          ) : (
            <div className='flex flex-row justify-center'>
              <div className='mr-2'>Not yet verified</div>
              <ShieldExclamationIcon className='w-5' />
            </div>
          )}
          <Button onClick={editUserHandler}>Edit</Button>
        </CardBody>
      )}
      <Divider />
      <CardFooter className='flex justify-center'>
        {!emailVerified ? (
          <Button onClick={userEmailActivationHandler}>{`${
            isAdmin ? 'Activate User Email' : 'Resend Email Activation'
          }`}</Button>
        ) : (
          <div className='flex flex-row justify-center'>
            <div className='mr-2'>Email verified by user</div>
            <ShieldCheckIcon className='w-5' />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
