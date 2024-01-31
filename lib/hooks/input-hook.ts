import { useState, ChangeEvent } from 'react';

const useInput = (name: string, uname: string) => {
  const [fullName, setFullName] = useState(name);
  const [username, setUsername] = useState(uname);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, value } = event.target;

    if (name === 'fullName') {
      setFullName(value);
    }
    if (name === 'username') {
      setUsername(value);
    }
  };

  return { fullName, username, onChangeHandler };
};

export default useInput;
