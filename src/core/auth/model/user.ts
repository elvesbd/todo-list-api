import { Entity } from '@core/shared/model';
import { UserProps } from './types/user-props';

export class User extends Entity<UserProps> {
  private _email: string;
  private _password: string;

  constructor(props: UserProps) {
    super(props);

    this._email = props.email;
    this._password = props.password;
  }


  static create(props: UserProps): User {
    return new User(props);
  }

  get id() {
    return this._id.value;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }
}
