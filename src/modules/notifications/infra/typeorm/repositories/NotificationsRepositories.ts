import { MongoRepository, getMongoRepository } from 'typeorm';
import Notification from '../schemas/Notification';
import INotificationsRepository from '../../../repositories/INotificationsRepository';
import ICreateNotification from '../../../dtos/ICreateNotificationDTO';

export default class NotificationsRepository
  implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotification): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}
