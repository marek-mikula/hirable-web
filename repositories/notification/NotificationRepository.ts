import {Repository} from "~/repositories/Repository";
import type {NotificationRepositoryInterface} from "~/repositories/notification/NotificationRepositoryInterface";
import type {
    IndexResponse,
    MarkAllReadResponse,
    MarkReadResponse,
    UnreadResponse
} from "~/repositories/notification/responses";

export class NotificationRepository extends Repository implements NotificationRepositoryInterface {
    public async index(page: number) {
        return this.client.get<'json', IndexResponse>('/api/notifications', { query: { page }})
    }

    public async unread() {
        return this.client.get<'json', UnreadResponse>('/api/notifications/unread')
    }

    public async markRead(id: number) {
        return this.client.patch<'json', MarkReadResponse>(`/api/notifications/${id}/mark-read`)
    }

    public async markAllRead() {
        return this.client.patch<'json', MarkAllReadResponse>('/api/notifications/mark-all-read')
    }
}