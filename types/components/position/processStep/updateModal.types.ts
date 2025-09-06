import type {PositionProcessStep} from "~/repositories/resources";

export interface UpdateModalExpose {
    open(positionProcessStep: PositionProcessStep): void
    close(): void
}