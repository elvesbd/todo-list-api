import { TodoProps } from './types';
import { Entity } from '@core/shared/model';
import { Name } from '@core/shared/value-objects';
import { Notification } from '@core/shared/notification';

export class Todo extends Entity<TodoProps> {
  private _name: Name;
  private _status: boolean;

  constructor(props: TodoProps) {
    const notification = new Notification();
    super(props, notification);

    this._status = props.status;
    this._name = new Name(props.name, this._notification);
  }

  static create(props: TodoProps): Todo {
    return new Todo(props);
  }

  public updateStatus(status: boolean): void {
    this._status = status;
  }

  public updateName(name: string): void {
    this._name = new Name(name, this._notification);
  }

  get id() {
    return this._id.value;
  }

  get status() {
    return this._status;
  }

  get name() {
    return this._name.value;
  }

  get notifications() {
    return this.getNotifications();
  }

  get containNotifications() {
    return this.hasNotifications();
  }
}
