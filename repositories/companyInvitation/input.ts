import type {ROLE} from "~/types/enums";

export type InviteData = {
    role: ROLE | null
    email: string | null
}