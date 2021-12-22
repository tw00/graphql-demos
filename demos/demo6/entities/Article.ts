import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Author } from './Author';

@Entity({ collection: 'articles' })
export class Article extends BaseEntity {
  @Property()
  title!: string;

  @ManyToOne(() => Author)
  author!: Author;
}
