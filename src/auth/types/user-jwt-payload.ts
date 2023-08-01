export interface UserJwtPayload {
  id: string;
  username: string;
  role: 'admin' | 'user';
}
