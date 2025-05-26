import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {Classifier} from "~/repositories/resources";
import type {CLASSIFIER_TYPE} from "~/types/enums";

export type ClassifiersMap = { [key in CLASSIFIER_TYPE]?: Classifier[] }

export type IndexResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    classifiers: ClassifiersMap
}>

export type ListResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    classifiers: Classifier[]
}>