import type {PositionCandidate, PositionShow} from "~/repositories/resources";
import {POSITION_STATE} from "~/types/enums";

export class PositionCandidatePolicy {
    public index(position: PositionShow): boolean {
        if (position.state !== POSITION_STATE.OPENED) {
            return false
        }

        return usePolicy().position.show(position)
    }

    public show(positionCandidate: PositionCandidate, position: PositionShow): boolean {
        if (positionCandidate.positionId !== position.id) {
            return false
        }

        if (position.state !== POSITION_STATE.OPENED) {
            return false
        }

        return usePolicy().position.show(position)
    }

    public update(positionCandidate: PositionCandidate, position: PositionShow): boolean {
        if (positionCandidate.positionId !== position.id) {
            return false
        }

        if (position.state !== POSITION_STATE.OPENED) {
            return false
        }

        return usePolicy().position.update(position)
    }
}
