import type {PolicyInterface} from "~/types/plugins/policy.types";
import {PositionPolicy} from "~/policies/PositionPolicy";
import {CandidatePolicy} from "~/policies/CandidatePolicy";

export default defineNuxtPlugin({
    name: 'policy',
    async setup() {
        const policy: PolicyInterface = {
            position: new PositionPolicy(),
            candidate: new CandidatePolicy(),
        }

        return {
            provide: {
                policy
            }
        }
    }
})