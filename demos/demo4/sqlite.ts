import DataLoader from 'dataloader';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./db.sql');

function mapResult(ids: readonly string[], rows: any[]): ArrayLike<Error> {
  return ids.map(
    (id) =>
      rows.find((row) => row.id === id) || new Error(`Row not found: ${id}`),
  );
}

// Dispatch a WHERE-IN query, ensuring response has rows in correct order.
const userLoader = new DataLoader<string, any>(async (ids) => {
  const result = await db.all('SELECT * FROM users WHERE id IN $ids', {
    $ids: ids,
  });
  return mapResult(ids, result);
});

// Usage
(async () => {
  const promise1 = userLoader.load('1234');
  const promise2 = userLoader.load('5678');
  const [user1, user2] = await Promise.all([promise1, promise2]);
  console.log(user1, user2);
})();
