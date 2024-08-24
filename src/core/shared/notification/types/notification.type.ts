export type NotificationsErrorType = {
  message: string;
  context: string;
};

export type NotificationType = {
  hasNotifications(): boolean;
  getNotifications(): { [key: string]: string[] };
  addNotification(notification: NotificationsErrorType): void;
};
