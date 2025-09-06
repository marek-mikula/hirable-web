import type {PositionProcessStep} from "~/repositories/resources";

export interface PositionProcessStepUpdateModalExpose {
    open(positionProcessStep: PositionProcessStep): void
    close(): void
}