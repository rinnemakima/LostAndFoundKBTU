import { User } from './user.model';

export interface LostItem {
  id: number;
  name: string;
  description: string;
  location: string;
  date: Date;
  user: User;
}