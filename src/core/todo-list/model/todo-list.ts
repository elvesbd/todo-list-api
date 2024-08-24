import { Entity } from '@core/shared/model';
import { Name } from '@core/shared/value-objects';
import { Notification } from '@core/shared/notification';

export type TodoListProps = {
  id?: string;
  name: string;
  color: string;
};

export class TodoList extends Entity<TodoListProps> {
  private _name: Name;
  private _color: string;

  constructor(props: TodoListProps) {
    const notification = new Notification();
    super(props, notification);

    this._color = props.color;
    this._name = new Name(props.name, this._notification);
  }

  static create(props: TodoListProps): TodoList {
    return new TodoList(props);
  }

  public update(props: Partial<TodoListProps>): void {
    this._color = props.color;
    this._name = new Name(props.name, this._notification);
  }

  get color() {
    return this._color;
  }

  get name() {
    return this._name.value;
  }
}
