'use client';

import { useState, useEffect } from 'react';
import { passwordStrength } from 'check-password-strength';
import { cn } from 'clsx-tailwind-merge';

const PasswordStrength = ({ watch }: any) => {
  const [strength, setStrength] = useState(0);
  const watchPassword = watch().password;

  useEffect(() => {
    setStrength(passwordStrength(watchPassword).id);
  }, [watchPassword]);

  return (
    <div className='col-span-2 flex gap-2'>
      {Array.from({ length: strength + 1 }).map((_, index) => (
        <div
          key={index}
          className={cn('h-2 w-32 rounded-md', {
            'bg-red-500': strength === 0,
            'bg-orange-500': strength === 1,
            'bg-yellow-500': strength === 2,
            'bg-green-500': strength === 3,
          })}
        ></div>
      ))}
    </div>
  );
};

export default PasswordStrength;
