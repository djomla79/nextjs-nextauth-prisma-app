import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../constants';
import { OptionType } from '../types';

const initialOptions: OptionType = {
  expiresIn: '10m',
};

export const signJwt = (
  payload: JwtPayload,
  options: OptionType = initialOptions
) => {
  return jwt.sign(payload, JWT_SECRET_KEY!, options);
};

export const verifyJwt = (token: string) => {
  try {
    const result = jwt.verify(token, JWT_SECRET_KEY!);
    return result as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
};
