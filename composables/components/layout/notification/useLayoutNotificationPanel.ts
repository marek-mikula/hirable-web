import type {Ref} from "vue";

const useNotificationPanelState = (): Ref<boolean> => {
    return useState<boolean>('notificationPanel', () => false)
}

export const useLayoutNotificationPanel = () => {
    const panelOpened = computed<boolean>(() => useNotificationPanelState().value)

    function toggleNotificationPanel(value?: boolean): void {
        if (value !== undefined) {
            useNotificationPanelState().value = value
        } else {
            useNotificationPanelState().value = !useNotificationPanelState().value
        }
    }

    return {
        panelOpened,
        toggleNotificationPanel
    }
}