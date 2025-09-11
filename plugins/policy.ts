import type {PolicyInterface} from "~/types/plugins/policy.types";
import {PositionPolicy} from "~/policies/PositionPolicy";
import {CandidatePolicy} from "~/policies/CandidatePolicy";
import {PositionProcessStepPolicy} from "~/policies/PositionProcessStepPolicy";
import {PositionCandidatePolicy} from "~/policies/PositionCandidatePolicy";
import {PositionCandidateActionPolicy} from "~/policies/PositionCandidateActionPolicy";
import {PositionCandidateSharePolicy} from "~/policies/PositionCandidateSharePolicy";
import {PositionCandidateEvaluationPolicy} from "~/policies/PositionCandidateEvaluationPolicy";

export default defineNuxtPlugin({
    name: 'policy',
    async setup() {
        const policy: PolicyInterface = {
            position: new PositionPolicy(),
            positionCandidate: new PositionCandidatePolicy(),
            positionCandidateAction: new PositionCandidateActionPolicy(),
            positionCandidateShare: new PositionCandidateSharePolicy(),
            positionCandidateEvaluation: new PositionCandidateEvaluationPolicy(),
            positionProcessStep: new PositionProcessStepPolicy(),
            candidate: new CandidatePolicy(),
        }

        return {
            provide: {
                policy
            }
        }
    }
})