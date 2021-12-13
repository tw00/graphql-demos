import DataLoader from 'dataloader';
import db, { User } from './_db';

async function batchFunction(keys) {
  console.log('-> batchFunction called with', keys);

  const results = await db.fetchAllKeys(keys);
  return results.map(
    (_, idx) => results[idx] || new Error(`No result for ${keys[idx]}`),
  );
}

(async () => {
  const userLoader = new DataLoader<number, User>(batchFunction, {
    batchScheduleFn: (callback) => setTimeout(callback, 200),
  });

  async function op1() {
    // Somewher in your application
    const user = await userLoader.load(2);
    const invitedBy = await userLoader.load(user.friendId); // 3
    console.log(`User 1 was invited by ${invitedBy.firstName}`);
  }

  async function op2() {
    // Elsewhere in your application
    const user = await userLoader.load(3);
    const invitedBy = await userLoader.load(user.friendId); // 1
    console.log(`User 2 was invited by ${invitedBy.firstName}`);
  }

  async function op3() {
    // Elsewhere in your application
    const user = await userLoader.load(4);
    console.log(`User 4 is called ${user.firstName}`);
  }

  // Run in parallel
  await Promise.all([op1(), op2(), op3()]);
  console.log('-'.repeat(process.stdout.columns));
})();
