import type {PositionPolicy} from "~/policies/PositionPolicy";
import type {CandidatePolicy} from "~/policies/CandidatePolicy";
import type {PositionProcessStepPolicy} from "~/policies/PositionProcessStepPolicy";
import type {PositionCandidatePolicy} from "~/policies/PositionCandidatePolicy";

export interface PolicyInterface {
    position: PositionPolicy
    positionCandidate: PositionCandidatePolicy
    positionProcessStep: PositionProcessStepPolicy
    candidate: CandidatePolicy
}