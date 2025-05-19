import type {PollFn, UsePoll} from "~/types/composables/poll.types";

export const usePoll = (): UsePoll => {
    const pollInterval = ref<number | null>(null)

    function startPoll(fn: PollFn, ms: number = 5_000): void {
        pollInterval.value = window.setInterval(fn, ms)
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