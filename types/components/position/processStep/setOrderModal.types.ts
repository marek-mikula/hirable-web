import type {PositionProcessStep} from "~/repositories/resources";

export interface PositionProcessStepSetOrderModalExpose {
    open(positionProcessSteps: PositionProcessStep[]): void
    close(): void
}