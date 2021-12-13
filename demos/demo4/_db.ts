import { sleep } from '../lib';

export interface User {
  id: number;
  friendId: number | null;
  firstName: string;
  lastName: string;
}

const db = {
  data: <User[]>[
    { id: 1, friendId: null, firstName: 'Tom', lastName: 'Coleman' },
    { id: 2, friendId: 3, firstName: 'Sashko', lastName: 'Stubailo' },
    { id: 3, friendId: 1, firstName: 'Mikhail', lastName: 'Novikov' },
    { id: 4, friendId: null, firstName: 'Mark', lastName: 'Smith' },
  ],
  findOne(id) {
    return db.data.find((item) => item.id === id);
  },
  async fetchAllKeys(keys): Promise<(User | undefined)[]> {
    await sleep(100);
    return keys.map((key) => db.findOne(key));
  },
};

export default db;
