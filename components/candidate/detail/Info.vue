<template>
  <div class="space-y-3 lg:space-y-4">

    <div class="overflow-hidden bg-white shadow-xs rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 flex items-center space-x-2 bg-gray-100">
          <h2 class="flex-1 min-w-0 truncate font-semibold text-gray-900">
            {{ $t('model.candidate.sections.info') }}
          </h2>
          <CommonButton
              v-if="policy.candidate.update(candidate)"
              variant="blank"
              class="shrink-0"
              :size="1"
              :icon="PencilIcon"
              v-tooltip="{ content: $t('common.action.edit') }"
              @click="editSectionModal = CANDIDATE_SECTION.INFO"
          />
        </div>
        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.common.firstname') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ candidate.firstname }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.common.lastname') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ candidate.lastname }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.common.email') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <CommonClipboard :value="candidate.email"/>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.common.phone') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <CommonClipboard :value="candidate.phone"/>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.common.language') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ $t(`common.language.${candidate.language}`) }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.common.gender') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ candidate.gender ? $t(`common.gender.${candidate.gender}`) : '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.common.birthDate') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ candidate.birthDate ? $formatter.date(candidate.birthDate) : '-' }}
            </dd>
          </div>
        </template>
      </dl>
    </div>

    <div class="overflow-hidden bg-white shadow-xs rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 flex items-center space-x-2 bg-gray-100">
          <h2 class="flex-1 min-w-0 truncate font-semibold text-gray-900">
            {{ $t('model.candidate.sections.experience') }}
          </h2>
          <CommonButton
              v-if="policy.candidate.update(candidate)"
              variant="blank"
              class="shrink-0"
              :size="1"
              :icon="PencilIcon"
              v-tooltip="{ content: $t('common.action.edit') }"
              @click="editSectionModal = CANDIDATE_SECTION.EXPERIENCE"
          />
        </div>
        <template v-if="true">

        </template>
      </dl>
    </div>

    <div class="overflow-hidden bg-white shadow-xs rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 flex items-center space-x-2 bg-gray-100">
          <h2 class="flex-1 min-w-0 truncate font-semibold text-gray-900">
            {{ $t('model.candidate.sections.links') }}
          </h2>
          <CommonButton
              v-if="policy.candidate.update(candidate)"
              variant="blank"
              class="shrink-0"
              :size="1"
              :icon="PencilIcon"
              v-tooltip="{ content: $t('common.action.edit') }"
              @click="editSectionModal = CANDIDATE_SECTION.LINKS"
          />
        </div>
        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.common.linkedin') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <CommonClipboard v-if="candidate.linkedin" :value="candidate.linkedin"/>
              <span v-else>-</span>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.common.instagram') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <CommonClipboard v-if="candidate.instagram" :value="candidate.instagram"/>
              <span v-else>-</span>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.common.github') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <CommonClipboard v-if="candidate.github" :value="candidate.github"/>
              <span v-else>-</span>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.common.portfolio') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <CommonClipboard v-if="candidate.portfolio" :value="candidate.portfolio"/>
              <span v-else>-</span>
            </dd>
          </div>
        </template>
      </dl>
    </div>

    <div class="overflow-hidden bg-white shadow-xs rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 flex items-center space-x-2 bg-gray-100">
          <h2 class="flex-1 min-w-0 truncate font-semibold text-gray-900">
            {{ $t('model.candidate.sections.other') }}
          </h2>
          <CommonButton
              v-if="policy.candidate.update(candidate)"
              variant="blank"
              class="shrink-0"
              :size="1"
              :icon="PencilIcon"
              v-tooltip="{ content: $t('common.action.edit') }"
              @click="editSectionModal = CANDIDATE_SECTION.OTHER"
          />
        </div>
        <template v-if="true">
          <div class="p-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.common.tags') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2">
              <div v-if="candidate.tags.length > 0" class="flex flex-wrap items-center -ml-1 -mt-1">
                <CommonBadge v-for="(tag, index) in candidate.tags" class="ml-1 mt-1" :key="index" variant="secondary" :label="tag"/>
              </div>
              <span v-else>-</span>
            </dd>
          </div>
        </template>
      </dl>
    </div>

  </div>
</template>

<script lang="ts" setup>
import type {Candidate} from "~/repositories/resources";
import {PencilIcon} from "@heroicons/vue/24/outline";
import {CANDIDATE_SECTION} from "~/types/enums";

const props = defineProps<{
  candidate: Candidate
}>()

const emit = defineEmits<{
  (e: 'update', candidate: Candidate): void
}>()

const toaster = useToaster()
const policy = usePolicy()

const editSectionModal = ref<CANDIDATE_SECTION|null>(null)

function onUpdate(candidate: Candidate): void {
  editSectionModal.value = null
  emit('update', candidate)
}
</script>