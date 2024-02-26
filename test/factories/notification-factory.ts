import { Content } from "@app/entities/content";
import { Notification, NotificationProps } from "@app/entities/notification";

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: "social",
    content: new Content("test content"),
    recipientId: "recipient-1",
    ...override,
  });
}
