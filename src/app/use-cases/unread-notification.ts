import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notification-repository";
import { NotificationNotFoundError } from "./errors/notification-not-found";

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    req: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = req;

    const notification =
      await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.unread()

    await this.notificationsRepository.save(notification)
  }
}
