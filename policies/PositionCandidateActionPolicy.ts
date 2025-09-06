import type {PositionCandidate, PositionShow} from "~/repositories/resources";

export class PositionCandidateActionPolicy {
    public store(positionCandidate: PositionCandidate, position: PositionShow): boolean {
        return usePolicy().positionCandidate.update(positionCandidate, position)
    }
}
