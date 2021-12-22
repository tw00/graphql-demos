import {
  PrimaryKey,
  SerializedPrimaryKey,
  Enum,
  Collection,
  Entity,
  OneToMany,
  ManyToMany,
  Property,
  ManyToOne,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { BaseEntity } from './BaseEntity';
import { Book } from './Book';

export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

export const enum UserStatus {
  DISABLED,
  ACTIVE,
}

@Entity()
export class Author extends BaseEntity {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Enum(() => UserRole)
  role!: UserRole; // string enum

  @Enum()
  status!: UserStatus; // numeric/const enum

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property({ nullable: true })
  age?: number;

  @Property()
  termsAccepted = false;

  @Property({ nullable: true })
  identities?: string[];

  @Property({ nullable: true })
  born?: Date;

  @OneToMany(() => Book, (book) => book.author)
  books = new Collection<Book>(this);

  @ManyToMany(() => Author)
  friends = new Collection<Author>(this);

  @ManyToOne(() => Book, { nullable: true })
  favouriteBook?: Book;

  @Property({ version: true })
  version!: number;

  constructor(name: string, email: string) {
    super();
    this.name = name;
    this.email = email;
  }
}
