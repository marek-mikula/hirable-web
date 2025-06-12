import type {Response} from "~/types/request";
import type {
    IndexResponse,
    MarkAllReadResponse,
    MarkReadResponse,
    UnreadResponse
} from "~/repositories/notification/responses";

export interface NotificationRepositoryInterface {
    index(page: number): Promise<Response<'json', IndexResponse>>
    unread(): Promise<Response<'json', UnreadResponse>>
    markRead(id: number): Promise<Response<'json', MarkReadResponse>>
    markAllRead(): Promise<Response<'json', MarkAllReadResponse>>
}