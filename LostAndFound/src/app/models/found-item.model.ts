import { User } from './user.model';

export interface FoundItem {
  id: number;
  name: string;
  description: string;
  location: string;
  date: Date;
  user: User;
  image?:string;
}