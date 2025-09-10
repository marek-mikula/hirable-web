import type {Notification} from "~/repositories/resources";
import type {NotificationCardVariant} from "~/types/components/layout/notification/card.types";
import {NOTIFICATION_TYPE} from "~/types/enums";
import type {RouteLocationRaw} from "vue-router";

export const useLayoutNotificationCard = () => {
    const api = useApi()
    const toaster = useToaster()
    const {user} = useAuth<true>()

    const isLoading = ref<boolean>(false)

    async function markRead(id: number): Promise<Notification|null> {
        isLoading.value = true

        const result = await handle<Notification>(
            async () => api.notification.markRead(id).then(res => res._data!.data.notification)
        )

        isLoading.value = false

        if (! result.success) {
            return null
        }

        await toaster.success({
            title: 'toast.notification.markRead'
        })

        return result.result
    }

    function getCardVariant(notification: Notification): NotificationCardVariant {
        if ([
            NOTIFICATION_TYPE.POSITION_APPROVAL_REJECTED,
        ].includes(notification.type)) {
            return 'danger'
        }

        if ([
            NOTIFICATION_TYPE.POSITION_APPROVAL_EXPIRED,
            NOTIFICATION_TYPE.POSITION_APPROVAL_CANCELED,
        ].includes(notification.type)) {
            return 'warning'
        }

        if ([
            NOTIFICATION_TYPE.POSITION_APPROVAL_APPROVED,
            NOTIFICATION_TYPE.POSITION_OPENED,
        ].includes(notification.type)) {
            return 'success'
        }

        return 'info'
    }

    function getTranslationKey(notification: Notification): string {
        return notification.type.replace(':', '.')
    }

    function getRoute(notification: Notification): RouteLocationRaw | null {
        if ([
            NOTIFICATION_TYPE.POSITION_APPROVAL_REJECTED,
            NOTIFICATION_TYPE.POSITION_APPROVAL_EXPIRED,
        ].includes(notification.type)) {
            const {
                ownerId,
                positionId,
            } = notification.data

            if (user.value.id !== (ownerId as number)) {
                return null
            }

            return `/positions/${positionId}`
        }

        if ([
            NOTIFICATION_TYPE.POSITION_APPROVAL,
            NOTIFICATION_TYPE.POSITION_APPROVAL_REMINDER,
        ].includes(notification.type)) {
            const {
                positionId,
            } = notification.data
            return `/positions/approve/${positionId}`
        }

        if ([
            NOTIFICATION_TYPE.INVITATION_ACCEPTED,
        ].includes(notification.type)) {
            return '/company/users'
        }

        if ([
            NOTIFICATION_TYPE.POSITION_CANDIDATE_EVALUATION_CANCELED,
            NOTIFICATION_TYPE.POSITION_OPENED,
            NOTIFICATION_TYPE.POSITION_APPROVAL_APPROVED,
            NOTIFICATION_TYPE.POSITION_ASSIGNED_AS_RECRUITER,
            NOTIFICATION_TYPE.POSITION_ASSIGNED_AS_HM,
        ].includes(notification.type)) {
            const {
                positionId,
            } = notification.data
            return `/positions/${positionId}`
        }

        if ([
            NOTIFICATION_TYPE.POSITION_CANDIDATE_SHARED,
            NOTIFICATION_TYPE.POSITION_CANDIDATE_EVALUATION_REQUESTED,
            NOTIFICATION_TYPE.POSITION_CANDIDATE_EVALUATION_CANCELED,
        ].includes(notification.type)) {
            const {
                positionId,
            } = notification.data
            return `/positions/${positionId}/candidates`
        }

        return null
    }

    return {
        isLoading,
        markRead,
        getCardVariant,
        getTranslationKey,
        getRoute,
    }
}