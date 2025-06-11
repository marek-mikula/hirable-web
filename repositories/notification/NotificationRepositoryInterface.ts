import type {Response} from "~/types/request";
import type {
    IndexResponse,
    MarkAllReadResponse,
    MarkReadResponse,
    UnreadResponse
} from "~/repositories/notification/responses";

export interface NotificationRepositoryInterface {
    index(page: number): Response<IndexResponse, 'json'>
    unread(): Response<UnreadResponse, 'json'>
    markRead(id: number): Response<MarkReadResponse, 'json'>
    markAllRead(): Response<MarkAllReadResponse, 'json'>
}