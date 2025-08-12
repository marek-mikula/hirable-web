import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {PositionCandidate} from "~/repositories/resources";

export type SetStepResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positionCandidate: PositionCandidate
}>
