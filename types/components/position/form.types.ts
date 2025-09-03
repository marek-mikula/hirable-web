import type {GeneratedPosition} from "~/repositories/resources";

export type FormButton = 'save' | 'open' | 'sendForApproval' | 'cancelApproval'

export type PositionFormExpose = {
    setGeneratedPosition(position: GeneratedPosition): void
}