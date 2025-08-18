import type {PositionPolicy} from "~/policies/PositionPolicy";
import type {CandidatePolicy} from "~/policies/CandidatePolicy";

export interface PolicyInterface {
    position: PositionPolicy
    candidate: CandidatePolicy
}