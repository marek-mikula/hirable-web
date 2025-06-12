import type {Response} from "~/types/request";
import type {CLASSIFIER_TYPE} from "~/types/enums";
import type {IndexResponse, ListResponse} from "~/repositories/classifier/responses";

export interface ClassifierRepositoryInterface {
    index(types: CLASSIFIER_TYPE[]): Promise<Response<'json', IndexResponse>>
    list(type: CLASSIFIER_TYPE): Promise<Response<'json', ListResponse>>
}