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
        </div>
        <template v-if="true">

          <ul role="list" class="p-3 space-y-3">
            <li v-for="(experience, index) in candidate.experience" :key="index" class="p-3 border border-gray-200 rounded-md">
              <div class="flex justify-between gap-x-4">
                <div class="py-0.5 text-sm text-gray-500">
                  <span class="font-medium text-gray-900">{{ experience.position }}</span>
                  <span v-if="experience.employer" class="ml-2">@{{ experience.employer }}</span>
                </div>
                <span v-if="experience.from && experience.to" class="flex-none py-0.5 text-xs/5 text-gray-500">
                  {{ $formatter.year(experience.from) }} - {{ $formatter.year(experience.to) }}
                </span>
                <span v-else-if="experience.from" class="flex-none py-0.5 text-xs/5 text-gray-500">
                  {{ $formatter.year(experience.from) }} - ?
                </span>
                <span v-else-if="experience.to" class="flex-none py-0.5 text-xs/5 text-gray-500">
                  ? - {{ $formatter.year(experience.to) }}
                </span>
              </div>
              <p v-if="experience.description " class="mt-2 text-sm text-gray-500">
                {{ experience.description }}
              </p>
            </li>
          </ul>

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
          <div class="p-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.candidate.cv') }}
            </dt>
            <dd v-if="candidate.cvs.length > 0" class="mt-2 sm:col-span-2 space-y-1">
              <CommonFile
                  v-for="file in candidate.cvs"
                  :key="file.id"
                  :file="file"
                  :disable-edit="!policy.candidate.update(candidate)"
                  @delete="(f) => onDeleteFile(f, 'cvs')"
              />
            </dd>
            <dd v-else class="mt-2 text-sm text-gray-700 sm:col-span-2">
              -
            </dd>
          </div>
          <div class="p-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.candidate.otherFiles') }}
            </dt>
            <dd v-if="candidate.otherFiles.length > 0" class="mt-2 sm:col-span-2 space-y-1">
              <CommonFile
                  v-for="file in candidate.otherFiles"
                  :key="file.id"
                  :file="file"
                  :disable-edit="!policy.candidate.update(candidate)"
                  @delete="(f) => onDeleteFile(f, 'otherFiles')"
              />
            </dd>
            <dd v-else class="mt-2 text-sm text-gray-700 sm:col-span-2">
              -
            </dd>
          </div>
        </template>
      </dl>
    </div>

    <LazyCandidateDetailEditModal
        v-if="policy.candidate.update(candidate)"
        :candidate="candidate"
        :section="editSectionModal"
        @close="editSectionModal = null"
        @update="onUpdate"
    />

  </div>
</template>

<script lang="ts" setup>
import type {CandidateShow} from "~/repositories/resources";
import {PencilIcon} from "@heroicons/vue/24/outline";
import {CANDIDATE_SECTION} from "~/types/enums";
import type {File as FileResource} from "~/repositories/resources";

const props = defineProps<{
  candidate: CandidateShow
}>()

const emit = defineEmits<{
  (e: 'update', candidate: CandidateShow): void
}>()

const toaster = useToaster()
const policy = usePolicy()

const editSectionModal = ref<CANDIDATE_SECTION|null>(null)

function onUpdate(candidate: CandidateShow): void {
  editSectionModal.value = null
  emit('update', candidate)
}

async function onDeleteFile(file: FileResource, key: 'cvs' | 'otherFiles'): Promise<void> {
  const index = props.candidate[key].findIndex(item => item.id === file.id)

  // remove file from existing files array
  if (index > -1) {
    props.candidate[key].splice(index, 1)
  }

  await toaster.success({
    title: 'toast.file.delete'
  })
}
</script>