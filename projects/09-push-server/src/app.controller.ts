import { Body, Controller, Post } from '@nestjs/common';
import { PushNotificationsService } from './push-notifications/push-notifications.service';

@Controller()
export class AppController {
  constructor(
    private readonly pushNotificationsService: PushNotificationsService,
  ) {}

  @Post('send-notification')
  sendNotification(@Body() body: { toTokens: string[] }) {
    // const toTokens = ['ExponentPushToken[cl8ZrFElm0b0xYhU8SG07C]'];

    this.pushNotificationsService.sendNotification(body.toTokens);
  }
}
