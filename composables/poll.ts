import type {PollFn, UsePoll} from "~/types/composables/poll.types";

export const usePoll = (): UsePoll => {
    const pollInterval = ref<number | null>(null)

    function startPoll(fn: PollFn, ms: number = 5_000, immediate?: boolean): void {
        pollInterval.value = window.setInterval(fn, ms)

        if (immediate) {
            fn()
        }
    }

    function endPoll(): void {
        if (pollInterval.value) {
            window.clearInterval(pollInterval.value)
        }
    }

    return {
        pollInterval,
        startPoll,
        endPoll,
    }
}