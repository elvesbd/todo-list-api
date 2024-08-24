import { Notification } from '@core/shared/notification';
import { Color } from '@core/shared/value-objects';

describe('Color validation', () => {
  let notification: Notification;

  beforeEach(() => {
    notification = new Notification();
  });

  it('Should add notifications if color is null', () => {
    new Color(null as any, notification);
    expect(notification.hasNotifications()).toBe(true);
    expect(notification.getNotifications()).toEqual({
      cor: [
        'não pode ser nulo',
        'deve estar no formato hexadecimal (#RRGGBB ou #RGB)',
      ],
    });
  });

  it('Should add notifications if color does not include the "#" symbol', () => {
    new Color('RRGGBB', notification); // Sem o #
    expect(notification.hasNotifications()).toBe(true);
    expect(notification.getNotifications()).toEqual({
      cor: ['deve estar no formato hexadecimal (#RRGGBB ou #RGB)'],
    });
  });

  it('Should add notifications if color has "#" but is in an invalid format', () => {
    new Color('#FF573', notification);
    expect(notification.hasNotifications()).toBe(true);
    expect(notification.getNotifications()).toEqual({
      cor: ['deve estar no formato hexadecimal (#RRGGBB ou #RGB)'],
    });
  });

  it('Should not add notifications for a valid hexadecimal color', () => {
    new Color('#FF5733', notification);
    expect(notification.hasNotifications()).toBe(false);
    expect(notification.getNotifications()).toEqual({});
  });

  it('should return the correct value for Color', () => {
    const colorValue = '#FF5733';
    const color = new Color(colorValue, notification);

    expect(color.value).toBe(colorValue);
  });
});
