<template>
  <FormBasicSelect
    v-model="locale"
    name="locale"
    :options="options"
  />
</template>

<script setup lang="ts">
import type {Locale} from "~/types/common";

// @ts-expect-error wrongly typed composable
const { locales, locale: currentLocale, setLocale } = useI18n()
const moment = useMoment()

const options = locales.value.map((locale: Locale) => ({
  value: locale.code,
  label: locale.label,
}))

const locale = ref<string>(currentLocale.value)

watch(() => locale.value, (val) => {
  setLocale(val)
  moment.locale(val)
})
</script>
