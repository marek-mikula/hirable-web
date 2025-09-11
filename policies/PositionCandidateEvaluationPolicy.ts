import type {PositionCandidate, PositionCandidateEvaluation, PositionShow} from "~/repositories/resources";
import {ROLE} from "~/types/enums";

export class PositionCandidateEvaluationPolicy {
    public index(positionCandidate: PositionCandidate, position: PositionShow): boolean {
        return usePolicy().positionCandidate.index(position)
    }

    public store(positionCandidate: PositionCandidate, position: PositionShow): boolean {
        const { user } = useAuth()

        if (!user.value) {
            return false
        }

        return user.value!.companyRole === ROLE.HIRING_MANAGER || usePolicy().positionCandidate.update(positionCandidate, position)
    }

    public request(positionCandidate: PositionCandidate, position: PositionShow): boolean {
        return usePolicy().positionCandidate.update(positionCandidate, position)
    }

    public update(positionCandidateEvaluation: PositionCandidateEvaluation, positionCandidate: PositionCandidate, position: PositionShow): boolean {
        const { user } = useAuth()

        if (!user.value) {
            return false
        }

        if (positionCandidate.positionId !== position.id) {
            return false;
        }

        if (positionCandidateEvaluation.positionCandidateId !== positionCandidate.id) {
            return false;
        }

        return user.value!.companyRole === ROLE.HIRING_MANAGER && positionCandidateEvaluation.userId === user.value!.id;
    }

    public delete(positionCandidateEvaluation: PositionCandidateEvaluation, positionCandidate: PositionCandidate, position: PositionShow): boolean {
        const { user } = useAuth()

        if (!user.value) {
            return false
        }

        if (positionCandidate.positionId !== position.id) {
            return false;
        }

        if (positionCandidateEvaluation.positionCandidateId !== positionCandidate.id) {
            return false;
        }

        if (user.value!.companyRole === ROLE.HIRING_MANAGER) {
            return positionCandidateEvaluation.creatorId === user.value!.id && positionCandidateEvaluation.userId === user.value!.id;
        }

        return positionCandidateEvaluation.creatorId === user.value!.id;
    }
}
