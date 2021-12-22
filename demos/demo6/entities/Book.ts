import {
  Collection,
  Entity,
  Property,
  ManyToOne,
  ManyToMany,
} from '@mikro-orm/core';

import { BaseEntity } from './BaseEntity';
import { Author } from './Author';
import { BookTag } from './BookTag';

@Entity()
export class Book extends BaseEntity {
  @Property()
  title!: string;

  @ManyToOne(() => Author)
  author!: Author;

  @ManyToMany({ entity: 'BookTag', fixedOrder: true })
  tags = new Collection<BookTag>(this);
}
