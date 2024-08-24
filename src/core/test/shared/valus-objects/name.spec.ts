import { Notification } from '@core/shared/notification';
import { Name } from '@core/shared/value-objects';

describe('Name validation', () => {
  let notification: Notification;

  beforeEach(() => {
    notification = new Notification();
  });

  it('Should add notifications if value is null', () => {
    new Name(null as any, notification);
    expect(notification.hasNotifications()).toBe(true);
    expect(notification.getNotifications()).toEqual({
      nome: [
        'não pode ser nulo',
        'não pode estar vazio',
        'não pode ter mais que 140 caracteres',
      ],
    });
  });

  it('Should add notifications if value is an empty string', () => {
    new Name('', notification);
    expect(notification.hasNotifications()).toBe(true);
    expect(notification.getNotifications()).toEqual({
      nome: ['não pode estar vazio'],
    });
  });

  it('Should add notifications if value exceeds 140 characters', () => {
    const longName = 'a'.repeat(141);
    new Name(longName, notification);
    expect(notification.hasNotifications()).toBe(true);
    expect(notification.getNotifications()).toEqual({
      nome: ['não pode ter mais que 140 caracteres'],
    });
  });

  it('Should not add notifications for valid name', () => {
    const validName = 'John Doe';
    new Name(validName, notification);
    expect(notification.hasNotifications()).toBe(false);
    expect(notification.getNotifications()).toEqual({});
  });

  it('should return the correct value for Name', () => {
    const notification = new Notification();
    const nameValue = 'John Doe';
    const name = new Name(nameValue, notification);

    expect(name.value).toBe(nameValue);
  });
});
