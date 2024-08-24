import { Notification } from '@core/shared/notification';

export class Color {
  private _value: string;
  private _context: string;

  constructor(value: string, notification: Notification) {
    this._value = value;
    this._context = 'cor';
    this.validate(notification);
  }

  private validate(notification: Notification) {
    const hexColorRegex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;

    if (this._value === null || this._value === undefined) {
      notification.addNotification({
        context: this._context,
        message: 'não pode ser nulo',
      });
      return;
    }

    if (!hexColorRegex.test(this._value)) {
      notification.addNotification({
        context: this._context,
        message: 'deve estar no formato hexadecimal (#RRGGBB ou #RGB)',
      });
    }
  }

  get value(): string {
    return this._value;
  }
}
