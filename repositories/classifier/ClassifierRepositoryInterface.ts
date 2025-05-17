import type {Response} from "~/types/request";
import type {CLASSIFIER_TYPE} from "~/types/enums";
import type {ListResponse} from "~/repositories/classifier/responses";

export interface ClassifierRepositoryInterface {
    list(type: CLASSIFIER_TYPE): Response<ListResponse, 'json'>
}