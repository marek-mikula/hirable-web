import type {PositionPolicy} from "~/policies/PositionPolicy";
import type {CandidatePolicy} from "~/policies/CandidatePolicy";
import type {PositionProcessStepPolicy} from "~/policies/PositionProcessStepPolicy";
import type {PositionCandidatePolicy} from "~/policies/PositionCandidatePolicy";
import type {PositionCandidateActionPolicy} from "~/policies/PositionCandidateActionPolicy";

export interface PolicyInterface {
    position: PositionPolicy
    positionCandidate: PositionCandidatePolicy
    positionCandidateAction: PositionCandidateActionPolicy
    positionProcessStep: PositionProcessStepPolicy
    candidate: CandidatePolicy
}