import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {TokenInfo} from "~/repositories/resources";

export type TokenInfoResponse = JsonResponse<RESPONSE_CODE.SUCCESS, TokenInfo>
