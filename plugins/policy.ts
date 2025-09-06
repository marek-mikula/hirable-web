import type {PolicyInterface} from "~/types/plugins/policy.types";
import {PositionPolicy} from "~/policies/PositionPolicy";
import {CandidatePolicy} from "~/policies/CandidatePolicy";
import {PositionProcessStepPolicy} from "~/policies/PositionProcessStepPolicy";
import {PositionCandidatePolicy} from "~/policies/PositionCandidatePolicy";

export default defineNuxtPlugin({
    name: 'policy',
    async setup() {
        const policy: PolicyInterface = {
            position: new PositionPolicy(),
            positionCandidate: new PositionCandidatePolicy(),
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