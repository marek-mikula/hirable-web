import type {Promisable} from "~/types/common";

export type InfiniteScrollFn = () => Promisable<void>

export type UseInfiniteScroll = {
    startInfiniteScroll: (parent: Element, el: Element, fn: InfiniteScrollFn) => void
    stopInfiniteScroll: (el: Element) => void
}