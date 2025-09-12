<template>
  <CommonDropdown>

    <template #button="{open}">
      <button
          type="button"
          class="flex items-center p-2 text-gray-700 ring-1 ring-inset ring-gray-200 space-x-1 hover:text-primary-600 hover:bg-gray-50 rounded-md"
          v-tooltip="$t('tooltip.layout.language')"
          @click="open"
      >
        <CommonSpinner v-if="isLoading" class="size-5"/>
        <LanguageIcon v-else class="size-5"/>
      </button>
    </template>

    <template #list="{close}">
      <div
          class="w-44 divide-y divide-gray-100 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-200 focus:outline-hidden"
          role="menu"
          tabindex="-1"
      >
        <div class="p-1 space-y-1" role="none">
          <button
              v-for="locale in locales"
              :key="locale.code"
              :class="[locale.code === currentLocale ? 'bg-gray-50 text-primary-600' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50', 'w-full text-left rounded-md flex gap-x-1 text-gray-700 block p-2 text-sm']"
              type="button"
              @click="close(() => switchLocale(locale.code))"
          >
            {{ locale.label }}
          </button>
        </div>
      </div>
    </template>

  </CommonDropdown>
</template>

<script setup lang="ts">
import {LanguageIcon} from '@heroicons/vue/24/outline'

const {user, setUser} = useAuth<true>()
const api = useApi()
const toaster = useToaster()
// @ts-expect-error wrongly typed composable
const { locales, locale: currentLocale, setLocale } = useI18n()
const moment = useMoment()

const isLoading = ref<boolean>(false)

async function switchLocale(locale: string) {
  if (locale === currentLocale.value) {
    return
  }

  isLoading.value = true

  await handle(async () => {
    // save selected locale
    const response = await api.user.update(user.value.id, {
      keys: ['language'],
      language: locale
    })

    const newUser = response._data!.data.user

    // update user model reference
    setUser(newUser)

    setLocale(locale)
    moment.locale(locale)

    await toaster.success({
      title: 'toast.languageChange'
    })
  })

  isLoading.value = false
}
</script>
