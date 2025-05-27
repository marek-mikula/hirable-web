import type {Position} from "~/repositories/resources";
import {POSITION_STATE} from "~/types/enums";
import type {RouteLocationRaw} from "vue-router";

export function getRouteByPosition(position: Position): RouteLocationRaw {
    if (position.state === POSITION_STATE.DRAFT) {
        return `/positions/${position.id}/edit`
    }

    return `/positions/${position.id}`
}