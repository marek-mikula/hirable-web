import type {PositionProcessStep, PositionShow} from "~/repositories/resources";
import {POSITION_STATE} from "~/types/enums";

export class PositionProcessStepPolicy {
    public index(position: PositionShow): boolean {
        const { user } = useAuth()

        if (!user.value) {
            return false
        }

        if (position.state !== POSITION_STATE.OPENED) {
            return false
        }

        return usePolicy().position.show(position)
    }

    public store(position: PositionShow): boolean {
        const { user } = useAuth()

        if (!user.value) {
            return false
        }

        if (position.state !== POSITION_STATE.OPENED) {
            return false
        }

        return usePolicy().position.update(position)
    }

    public show(positionProcessStep: PositionProcessStep, position: PositionShow): boolean {
        const { user } = useAuth()

        if (!user.value) {
            return false
        }

        if (position.state !== POSITION_STATE.OPENED) {
            return false
        }

        if (position.id !== positionProcessStep.positionId) {
            return false
        }

        return usePolicy().position.show(position)
    }

    public update(positionProcessStep: PositionProcessStep, position: PositionShow): boolean {
        const { user } = useAuth()

        if (!user.value) {
            return false
        }

        if (position.state !== POSITION_STATE.OPENED) {
            return false
        }

        if (position.id !== positionProcessStep.positionId) {
            return false
        }

        return usePolicy().position.update(position)
    }

    public delete(positionProcessStep: PositionProcessStep, position: PositionShow): boolean {
        return this.update(positionProcessStep, position)
    }
}
