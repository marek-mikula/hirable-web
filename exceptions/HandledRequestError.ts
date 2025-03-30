import type {JsonResponse} from "~/types/request";
import type {FetchResponse} from "ofetch";

export class HandledRequestError extends Error {
    constructor(public readonly response: FetchResponse<JsonResponse>) {
        super()
    }
}