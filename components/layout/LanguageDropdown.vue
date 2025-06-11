<template>
  <CommonDropdown>

    <template #button>
      <button
          type="button"
          class="flex items-center p-2 text-gray-700 ring-1 ring-inset ring-gray-200 space-x-1 hover:text-primary-600 hover:bg-gray-50 rounded-md"
          v-tooltip="{ content: $t('tooltip.layout.language') }"
      >
        <CommonSpinner v-if="isLoading" class="size-5"/>
        <LanguageIcon v-else class="size-5"/>
      </button>
    </template>

    <template #list="{ close }">
      <div
          class="absolute right-0 z-[125] mt-2 w-40 divide-y divide-gray-100 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          tabindex="-1"
      >
        <div class="p-1 space-y-1" role="none">
          <button
              v-for="locale in locales"
              :key="locale.code"
              type="button"
              :class="[locale.code === currentLocale ? 'bg-gray-50 text-primary-600' : 'text-gray-700 hover:text-primary-600', 'w-full rounded-md flex gap-x-1 text-gray-700 block p-2 text-sm']"
              @click.prevent="switchLocale(locale.code, close)"
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

const {setUser} = useAuth<true>()
const api = useApi()
const toaster = useToaster()
// @ts-expect-error wrongly typed composable
const { locales, locale: currentLocale, setLocale } = useI18n()
const moment = useMoment()

const isLoading = ref<boolean>(false)

async function switchLocale(locale: string, closeDropdown: () => void) {
  if (locale === currentLocale.value) {
    return
  }

  isLoading.value = true

  await handle(async () => {
    // save selected locale
    const response = await api.auth.update({
      keys: ['language'],
      language: locale
    })

    const user = response._data!.data.user

    // update user model reference
    setUser(user)

    setLocale(locale)
    moment.locale(locale)

    await toaster.success({
      title: 'toast.languageChange'
    })

    closeDropdown()
  })

  isLoading.value = false
}
</script>
