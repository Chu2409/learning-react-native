import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';

@Injectable()
export class PushNotificationsService {
  private expo = new Expo({
    accessToken: process.env.EXPO_ACCESS_TOKEN,
    useFcmV1: true,
  });

  sendNotification(toTokens: string[]) {
    const areExpoTokens = toTokens.every((token) =>
      Expo.isExpoPushToken(token),
    );
    if (!areExpoTokens)
      throw new BadRequestException('Invalid Expo push token(s)');

    const messages: ExpoPushMessage[] = toTokens.map((token) => ({
      to: token,
      sound: 'default',
      body: 'This is a test notification',
      title: 'Test Notification',
      data: { chatId: 'XYAZ-321' },
    }));

    const chunks = this.expo.chunkPushNotifications(messages);
    const tickets: Promise<ExpoPushTicket[]>[] = [];

    for (const chunk of chunks) {
      try {
        const ticketChunk = this.expo.sendPushNotificationsAsync(chunk);
        tickets.push(ticketChunk);
      } catch (error) {
        console.error('Error sending notification:', error);
        throw new InternalServerErrorException('Failed to send notification');
      }
    }

    return {
      done: true,
    };
  }
}
