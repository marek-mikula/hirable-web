import type {PositionCandidate, PositionCandidateAction, PositionShow} from "~/repositories/resources";

export class PositionCandidateActionPolicy {
    public store(positionCandidate: PositionCandidate, position: PositionShow): boolean {
        return usePolicy().positionCandidate.update(positionCandidate, position)
    }

    public update(positionCandidateAction: PositionCandidateAction, positionCandidate: PositionCandidate, position: PositionShow): boolean {
        const { user } = useAuth()

        if (!user.value) {
            return false
        }

        if (positionCandidateAction.positionCandidateId !== positionCandidate.id) {
            return false
        }

        if (positionCandidateAction.userId !== user.value!.id) {
            return false
        }

        return usePolicy().positionCandidate.update(positionCandidate, position)
    }
}
