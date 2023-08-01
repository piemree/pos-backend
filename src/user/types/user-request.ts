import { Request } from '@nestjs/common';

export interface UserJwtPayload {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

export interface UserRequest extends Request {
  user: UserJwtPayload;
}
