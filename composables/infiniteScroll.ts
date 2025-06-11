import type {InfiniteScrollFn, UseInfiniteScroll} from "~/types/composables/inifinityScroll.types";

export const useInfiniteScroll = (): UseInfiniteScroll => {
    const observer = ref<IntersectionObserver|null>(null)

    const startInfiniteScroll = (parent: Element, el: Element, fn: InfiniteScrollFn) => {
        observer.value = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fn()
            }
        }, {
            root: parent,
            threshold: 1.0
        })

        observer.value.observe(el)
    }

    const stopInfiniteScroll = (el: Element) => {
        if (observer.value) {
            observer.value.unobserve(el)
        }
    }

    return {
        startInfiniteScroll,
        stopInfiniteScroll,
    }
}