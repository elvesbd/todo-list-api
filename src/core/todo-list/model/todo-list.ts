import { TodoListProps } from './types';
import { Entity } from '@core/shared/model';
import { Name, Color } from '@core/shared/value-objects';
import { Notification } from '@core/shared/notification';

export class TodoList extends Entity<TodoListProps> {
  private _name: Name;
  private _color: Color;

  constructor(props: TodoListProps) {
    const notification = new Notification();
    super(props, notification);

    this._name = new Name(props.name, this._notification);
    this._color = new Color(props.color, this._notification);
  }

  static create(props: TodoListProps): TodoList {
    return new TodoList(props);
  }

  public update(props: Partial<TodoListProps>): void {
    this._name = new Name(props.name, this._notification);
    this._color = new Color(props.color, this._notification);
  }

  get color() {
    return this._color;
  }

  get name() {
    return this._name.value;
  }
}
