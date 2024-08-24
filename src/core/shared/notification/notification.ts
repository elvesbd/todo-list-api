import { NotificationType, NotificationsErrorType } from './types';

export class Notification implements NotificationType {
  protected notifications: NotificationsErrorType[] = [];

  addNotification(notification: NotificationsErrorType): void {
    this.notifications.push(notification);
  }

  hasNotifications(): boolean {
    return this.notifications.length > 0;
  }

  getNotifications(): { [key: string]: string[] } {
    return this.notifications.reduce(
      (acc, notification) => {
        if (!acc[notification.context]) {
          acc[notification.context] = [];
        }
        acc[notification.context]?.push(notification.message);
        return acc;
      },
      {} as { [key: string]: string[] },
    );
  }
}
