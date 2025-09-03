<template>
  <div class="space-y-2">
    <div class="text-sm font-semibold">
      🗒️ Komentáře
    </div>

    <div class="space-y-2">
      <FormTextarea name="comment"/>
      <div class="text-right">
        <CommonButton :label="$t('common.action.save')"/>
      </div>
    </div>

    <div class="space-y-2">

      <div v-for="n in 3" class="bg-gray-50 p-2 rounded-md border border-gray-200 space-y-1 shadow-xs">

        <div class="text-xs flex items-center justify-start space-x-2">
          <span class="min-w-0 truncate font-semibold">Marek Mikula</span>
          <span class="shrink-0 text-gray-500">Před 3 dny</span>
        </div>

        <div class="text-sm text-gray-500">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur bibendum justo non orci. Praesent vitae arcu tempor neque lacinia pretium. Etiam egestas wisi a erat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In rutrum. Proin in tellus sit amet nibh dignissim sagittis. Nam sed tellus id magna elementum tincidunt. In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Morbi scelerisque luctus velit. Phasellus enim erat, vestibulum vel, aliquam a, posuere eu, velit.
        </div>

      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import type {PositionShow} from "~/repositories/resources";

const props = defineProps<{
  position: PositionShow
}>()
</script>
