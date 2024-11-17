import {jsonIgnore} from 'json-ignore';

export class User {

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

  id: number | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  age: number | undefined;
  gender: string | undefined;
  comments: string | undefined;
  @jsonIgnore()
  selected: any;
}
