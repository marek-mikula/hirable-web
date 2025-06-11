import {Repository} from "~/repositories/Repository";
import type {NotificationRepositoryInterface} from "~/repositories/notification/NotificationRepositoryInterface";
import type {IndexResponse, UnreadResponse} from "~/repositories/notification/responses";

export class NotificationRepository extends Repository implements NotificationRepositoryInterface {
    public async index(page: number) {
        return this.get<IndexResponse>('/api/notifications', { query: { page }})
    }

    public async unread() {
        return this.get<UnreadResponse>('/api/notifications/unread')
    }
}