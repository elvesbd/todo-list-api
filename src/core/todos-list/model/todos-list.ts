import { TodosListProps } from './types';
import { Entity } from '@core/shared/model';
import { Name, Color } from '@core/shared/value-objects';
import { Notification } from '@core/shared/notification';

export class TodosList extends Entity<TodosListProps> {
  private _name: Name;
  private _color: Color;

  constructor(props: TodosListProps) {
    const notification = new Notification();
    super(props, notification);

    this._name = new Name(props.name, this._notification);
    this._color = new Color(props.color, this._notification);
  }

  static create(props: TodosListProps): TodosList {
    return new TodosList(props);
  }

  public update(props: Partial<TodosListProps>): void {
    this._name = new Name(props.name, this._notification);
    this._color = new Color(props.color, this._notification);
  }

  get id() {
    return this._id.value;
  }

  get color() {
    return this._color.value;
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
