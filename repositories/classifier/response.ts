import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {Classifier} from "~/repositories/resources";

export type ListResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    classifiers: Classifier[]
}>