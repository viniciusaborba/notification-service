import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { Notification } from "@app/entities/notification";
import { Content } from "@app/entities/content";
import { NotificationNotFoundError } from "../errors/notification-not-found";
import { CountRecipientNotifications } from "../count-recipient-notifications";

describe("Count recipient notifications", () => {
  it("should be able to count recipient notifications", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await Promise.all([
      notificationsRepository.create(
        new Notification({
          category: "social",
          content: new Content("test content"),
          recipientId: "recipient-1",
        }),
      ),
      notificationsRepository.create(
        new Notification({
          category: "social",
          content: new Content("test content"),
          recipientId: "recipient-1",
        }),
      ),
      notificationsRepository.create(
        new Notification({
          category: "social",
          content: new Content("test content"),
          recipientId: "recipient-2",
        }),
      ),
    ]);

    const { count } = await countRecipientNotifications.execute({
      recipientId: "recipient-1",
    });

    expect(count).toEqual(2);
  });

  //   it.skip("should not be able to cancel a notification when it does not exist", async () => {
  //     const notificationsRepository = new InMemoryNotificationsRepository();
  //     const cancelNotification = new CountRecipientNotifications(
  //       notificationsRepository,
  //     );

  //     expect(() => {
  //       return cancelNotification.execute({
  //         notificationId: "fake-notification-id",
  //       });
  //     }).rejects.toThrow(NotificationNotFoundError);
  //   });
});
