import { Notification } from "@app/entities/notification";
import { NotificationsRepository } from "@app/repositories/notification-repository";
import { PrismaService } from "@infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification> {
    const notification = this.prismaService.notification.findFirst({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return null;
    }

    return;
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
