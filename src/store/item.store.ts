import { Item } from "../models/item.model";
import { generateId } from "../utils/generate-id";

const items: Map<string, Item> = new Map();
// function create map  all this data (id' | 'createdAt' | 'updatedAt) 
const create = (data: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Item => {
  const id = generateId();
  const now = new Date();
  const item: Item = {
    id,
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  
  items.set(id, item);
  return item;
}
// search all 
const findAll = (): Item[] => {
  return Array.from(items.values());
}
// search by id 
const findById = (id: string): Item | undefined => {
  return items.get(id);
}
// search by listid 
const findByListId = (listId: string): Item[] => {
  return findAll().filter(item => item.listId === listId);
}
// update 
const update = (id: string, data: Partial<Omit<Item, 'id' | 'listId' | 'createdAt'>>): Item | undefined => {
  const item = items.get(id);
  if (!item) return undefined;

  const updatedItem: Item = {
    ...item,
    ...data,
    updatedAt: new Date(),
  };
//  save ..
  items.set(id, updatedItem);
  return updatedItem;
}
// delete item by id
const deleteItem = (id: string): boolean => {
  return items.delete(id);
}
// delete item by ListId
const deleteByListId = (listId: string): void => {
  const itemsToDelete = findByListId(listId);
  itemsToDelete.forEach(item => items.delete(item.id));
}
// export all to use it at controller file
export const itemStore = {
  create,
  findAll,
  findById,
  findByListId,
  update,
  delete: deleteItem,
  deleteByListId,
};