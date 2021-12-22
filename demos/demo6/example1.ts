import { MikroORM } from '@mikro-orm/core';
import { Article } from './entities/Article';
import { Author } from './entities/Author';
import { Book } from './entities/Book';
import { BookTag } from './entities/BookTag';

(async () => {
  const orm = await MikroORM.init({
    entities: [Article, Author, Book, BookTag],
    dbName: 'documentdb',
    type: 'mongo', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
    clientUrl: 'mongodb://localhost:27017',
  });

  const articles = await orm.em.find('Article', {});
  console.log(articles);
  /* Output:

    [
      Article {
        _id: '16592454',
        title: 'Sock’s hot arm propels Pearland past Dawson, 25-23'
      }
    ]
  */
  orm.close();
})();
