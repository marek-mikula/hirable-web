import type {GeneratedPosition, Position} from "~/repositories/resources";

export type FormButton = 'save' | 'open' | 'sendForApproval' | 'cancelApproval'

export type PositionFormExpose = {
    setPosition(position: Position): void
    setGeneratedPosition(position: GeneratedPosition): void
}