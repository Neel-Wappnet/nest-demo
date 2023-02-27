import { Injectable } from '@nestjs/common';
import { Cat } from './interface/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findOne(id: number): Cat[] {
    return this.cats.filter((cat) => cat.id === id);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
