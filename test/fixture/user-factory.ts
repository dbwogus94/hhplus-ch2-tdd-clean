import { faker } from '@faker-js/faker';
import { UserEntity } from 'src/common';

export class UserFactory {
  static seq = 0;

  static create(options: { length: number } = { length: 1 }): UserEntity[] {
    return Array.from({ length: options.length }).map(() => this.#create());
  }

  static #create(): UserEntity {
    return {
      id: ++this.seq,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    };
  }
}
