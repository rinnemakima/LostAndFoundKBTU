export interface User {
  id: number;
  username: string;
  email: string;
  phone_number: string;
  token?: string;
  isAdmin?: boolean;
}