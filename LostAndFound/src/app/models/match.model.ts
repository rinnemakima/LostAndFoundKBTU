import { LostItem } from './lost-item.model';
import { FoundItem } from './found-item.model';

export interface Match {
  id: number;
  lostItem: LostItem;
  foundItem: FoundItem;
  status: 'pending' | 'confirmed' | 'rejected';
}