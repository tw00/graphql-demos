export const toJSON = (obj) => JSON.parse(JSON.stringify(obj));

export const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));
