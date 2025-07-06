import type {PolicyInterface} from "~/types/plugins/policy.types";
import {PositionPolicy} from "~/policies/PositionPolicy";

export default defineNuxtPlugin({
    name: 'policy',
    async setup() {
        const policy: PolicyInterface = {
            position: new PositionPolicy(),
        }

        return {
            provide: {
                policy
            }
        }
    }
})