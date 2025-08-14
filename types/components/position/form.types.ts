import type {Position} from "~/repositories/resources";

export type FormButton = 'save' | 'open' | 'sendForApproval' | 'cancelApproval'

export type PositionFormExpose = {
    setPosition(position: Position): void
}