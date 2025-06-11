import type {Response} from "~/types/request";
import type {IndexResponse, UnreadResponse} from "~/repositories/notification/responses";

export interface NotificationRepositoryInterface {
    index(page: number): Response<IndexResponse, 'json'>
    unread(): Response<UnreadResponse, 'json'>
}