import { User } from './user.model';

export interface LostItem {
  category: any;
  id: number;
  name: string;
  description: string;
  location: string;
  date: Date;
  user: User;
  color: string;
  image?:string;
}