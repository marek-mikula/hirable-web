import type {Ref} from "vue";
import type {Promisable} from "~/types/common";

export type PollFn = () => Promisable<void>

export type UsePoll = {
    pollInterval: Ref<number | null>
    startPoll: (fn: PollFn, ms: number) => void
    endPoll: () => void
}