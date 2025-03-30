import type {Response} from "~/types/request";
import type {IndexResponse} from "~/repositories/user/response";
import type {GridQueryString} from "~/types/grid";

export interface UserRepositoryInterface {
    index(gridQuery: GridQueryString): Response<IndexResponse, 'json'>
}