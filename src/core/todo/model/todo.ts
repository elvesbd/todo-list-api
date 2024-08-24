import { TodoProps } from './types';
import { Entity } from '@core/shared/model';
import { Name } from '@core/shared/value-objects';
import { Notification } from '@core/shared/notification';

export class TodoList extends Entity<TodoProps> {
  private _name: Name;
  private _status: boolean;

  constructor(props: TodoProps) {
    const notification = new Notification();
    super(props, notification);

    this._status = props.status;
    this._name = new Name(props.name, this._notification);
  }

  static create(props: TodoProps): TodoList {
    return new TodoList(props);
  }

  public update(props: Partial<TodoProps>): void {
    this._status = props.status;
    this._name = new Name(props.name, this._notification);
  }

  get status() {
    return this._status;
  }

  get name() {
    return this._name.value;
  }
}
