import { Body, Controller, Get, Post } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { randomUUID } from "crypto";
import { CreateNotificationBody } from "./create-notification-body";

@Controller("notifications")
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { category, content, recipientId } = body

    return this.prisma.notification.create({
      data: {
        id: randomUUID(),
        category,
        content, 
        recipientId 
      }
    })
  }
}
