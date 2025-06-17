// (key, value ) >> seam what we did at mockAPI >> this model file for data type
// cheldren we take  listId to releanship with the parent (list)
export interface Item {
  id: string;
  listId: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

