import type {PositionCandidate, PositionShow} from "~/repositories/resources";
import {ROLE} from "~/types/enums";

export class PositionCandidateEvaluationPolicy {
    public store(positionCandidate: PositionCandidate, position: PositionShow): boolean {
        const { user } = useAuth()

        if (!user.value) {
            return false
        }

        return user.value!.companyRole === ROLE.HIRING_MANAGER
    }

    public request(positionCandidate: PositionCandidate, position: PositionShow): boolean {
        return usePolicy().positionCandidate.update(positionCandidate, position)
    }
}
