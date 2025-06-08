<template>
  <div class="space-y-3 lg:space-y-4">

    <div class="overflow-hidden bg-white shadow-sm rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 flex items-center space-x-2">
          <h2 class="flex-1 min-w-0 truncate text-sm font-semibold text-gray-900">
            {{ $t('model.position.sections.basicInfo') }}
          </h2>
          <button
              type="button"
              class="shrink-0 font-medium text-gray-900 hover:text-primary-600"
              v-tooltip="{ content: $t('common.action.edit') }"
              @click="editSectionModal = POSITION_SECTION.INFO"
          >
            <PencilIcon class="size-4"/>
          </button>
        </div>
        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.name') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 relative">
              {{ position.name }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.department') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.department ?? '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.field') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.field ? position.field.label : '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.workload') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul class="pl-3 list-disc" v-if="position.workloads.length > 0">
                <li v-for="workload in position.workloads" :key="workload.value">
                  {{ workload.label }}
                </li>
              </ul>
              <span v-else>-</span>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.employmentRelationship') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul class="pl-3 list-disc" v-if="position.employmentRelationships.length > 0">
                <li v-for="relationship in position.employmentRelationships" :key="relationship.value">
                  {{ relationship.label }}
                </li>
              </ul>
              <span v-else>-</span>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.employmentForm') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul class="pl-3 list-disc" v-if="position.employmentForms.length > 0">
                <li v-for="form in position.employmentForms" :key="form.value">
                  {{ form.label }}
                </li>
              </ul>
              <span v-else>-</span>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.address') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.address ?? '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.jobSeatsNum') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.jobSeatsNum }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.isTechnical') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.isTechnical ? $t('common.boolean.yes') : $t('common.boolean.no') }}
            </dd>
          </div>
          <div class="p-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.description') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2">
              {{ position.description ?? '-' }}
            </dd>
          </div>
        </template>
      </dl>
    </div>

    <div class="overflow-hidden bg-white shadow-sm rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 flex items-center space-x-2">
          <h2 class="flex-1 min-w-0 truncate text-sm font-semibold text-gray-900">
            {{ $t('model.position.sections.roles.title') }}
          </h2>
          <div class="flex items-center space-x-2">
            <button
                type="button"
                class="shrink-0 font-medium text-gray-900 hover:text-primary-600"
                v-tooltip="{ content: $t('modal.position.approvalHistory.title') }"
                @click="approvalHistoryModal = true"
            >
              <UsersIcon class="size-4"/>
            </button>
            <button
                type="button"
                class="shrink-0 font-medium text-gray-900 hover:text-primary-600"
                v-tooltip="{ content: $t('common.action.edit') }"
                @click="editSectionModal = POSITION_SECTION.ROLES"
            >
              <PencilIcon class="size-4"/>
            </button>
          </div>
        </div>
        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.hiringManagers') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.hiringManagers.length > 0 ? _.map(position.hiringManagers, 'fullName').join(', ') : '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.approvers') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.approvers.length > 0 ? _.map(position.approvers, 'fullName').join(', ') : '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.externalApprovers') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.externalApprovers.length > 0 ? _.map(position.externalApprovers, 'fullName').join(', ') : '-' }}
            </dd>
          </div>
        </template>
      </dl>
    </div>

    <div class="overflow-hidden bg-white shadow-sm rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 flex items-center space-x-2">
          <h2 class="flex-1 min-w-0 truncate text-sm font-semibold text-gray-900">
            {{ $t('model.position.sections.offer') }}
          </h2>
          <button
              type="button"
              class="shrink-0 font-medium text-gray-900 hover:text-primary-600"
              v-tooltip="{ content: $t('common.action.edit') }"
              @click="editSectionModal = POSITION_SECTION.OFFER"
          >
            <PencilIcon class="size-4"/>
          </button>
        </div>
        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.salary') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.salaryFrom && position.salaryTo ? `${position.salaryFrom} - ${position.salaryTo}` : position.salaryFrom }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.salaryType') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.salaryType ? position.salaryType.label : '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.salaryFrequency') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.salaryFrequency ? position.salaryFrequency.label : '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.salaryCurrency') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.salaryCurrency ? position.salaryCurrency.label : '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.salaryVar') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.salaryVar ?? '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.benefits') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul class="pl-3 list-disc" v-if="position.benefits.length > 0">
                <li v-for="benefit in position.benefits" :key="benefit.value">
                  {{ benefit.label }}
                </li>
              </ul>
              <span v-else>-</span>
            </dd>
          </div>
        </template>
      </dl>
    </div>

    <div class="overflow-hidden bg-white shadow-sm rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 flex items-center space-x-2">
          <h2 class="flex-1 min-w-0 truncate text-sm font-semibold text-gray-900">
            {{ $t('model.position.sections.hardSkills') }}
          </h2>
          <button
              type="button"
              class="shrink-0 font-medium text-gray-900 hover:text-primary-600"
              v-tooltip="{ content: $t('common.action.edit') }"
              @click="editSectionModal = POSITION_SECTION.HARD_SKILLS"
          >
            <PencilIcon class="size-4"/>
          </button>
        </div>
        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.minEducationLevel') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.minEducationLevel?.label ?? '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.seniority') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.seniority?.label ?? '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.experience') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.experience ?? '-' }}
            </dd>
          </div>
        </template>
      </dl>
    </div>

    <div class="overflow-hidden bg-white shadow-sm rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 flex items-center space-x-2">
          <h2 class="flex-1 min-w-0 truncate text-sm font-semibold text-gray-900">
            {{ $t('model.position.sections.softSkills.title') }}
          </h2>
          <button
              type="button"
              class="shrink-0 font-medium text-gray-900 hover:text-primary-600"
              v-tooltip="{ content: $t('common.action.edit') }"
              @click="editSectionModal = POSITION_SECTION.SOFT_SKILLS"
          >
            <PencilIcon class="size-4"/>
          </button>
        </div>
        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.organisationSkills') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.organisationSkills }} / 10
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.teamSkills') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.teamSkills }} / 10
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.timeManagement') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.timeManagement }} / 10
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.communicationSkills') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.communicationSkills }} / 10
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.leadership') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.leadership }} / 10
            </dd>
          </div>
        </template>
      </dl>
    </div>

    <div class="overflow-hidden bg-white shadow-sm rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 flex items-center space-x-2">
          <h2 class="flex-1 min-w-0 truncate text-sm font-semibold text-gray-900">
            {{ $t('model.position.sections.languageSkills.title') }}
          </h2>
          <button
              type="button"
              class="shrink-0 font-medium text-gray-900 hover:text-primary-600"
              v-tooltip="{ content: $t('common.action.edit') }"
              @click="editSectionModal = POSITION_SECTION.LANGUAGE_SKILLS"
          >
            <PencilIcon class="size-4"/>
          </button>
        </div>
        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.languageSkills') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul class="pl-3 list-disc" v-if="position.languageRequirements.length > 0">
                <li v-for="requirement in position.languageRequirements" :key="requirement.language.value">
                  {{ requirement.language.label }} ({{ requirement.level.label }})
                </li>
              </ul>
              <span v-else>-</span>
            </dd>
          </div>
        </template>
      </dl>
    </div>

    <div class="overflow-hidden bg-white shadow-sm rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 flex items-center space-x-2">
          <h2 class="flex-1 min-w-0 truncate text-sm font-semibold text-gray-900">
            {{ $t('model.position.sections.other') }}
          </h2>
          <button
              type="button"
              class="shrink-0 font-medium text-gray-900 hover:text-primary-600"
              v-tooltip="{ content: $t('common.action.edit') }"
              @click="editSectionModal = POSITION_SECTION.OTHER"
          >
            <PencilIcon class="size-4"/>
          </button>
        </div>
        <template v-if="true">
          <div class="p-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.note') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2">
              {{ position.note ?? '-' }}
            </dd>
          </div>
          <div class="p-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.files') }}
            </dt>
            <dd v-if="position.files.length > 0" class="mt-2 sm:col-span-2 space-y-1">
              <CommonFile
                  v-for="file in position.files"
                  :key="file.id"
                  :file="file"
                  :actions="[
                      {
                        key: 'delete',
                        handler: deleteFile,
                        icon: TrashIcon,
                        label: 'common.action.remove'
                      }
                  ]"
              />
            </dd>
            <dd v-else class="mt-2 text-sm/6 text-gray-700 sm:col-span-2">
              -
            </dd>
          </div>
        </template>
      </dl>
    </div>

    <PositionDetailEditModal :position="position" :section="editSectionModal" @close="editSectionModal = null" @update="onUpdate"/>

    <PositionApprovalHistoryModal v-if="position.approvals.length > 0" :position="position" :open="approvalHistoryModal" @close="approvalHistoryModal = false"/>

  </div>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import type {Position} from "~/repositories/resources";
import type {File as FileResource} from "~/repositories/resources";
import {TrashIcon, PencilIcon, UsersIcon} from "@heroicons/vue/24/outline";
import {POSITION_SECTION} from "~/types/enums";

const props = defineProps<{
  position: Position
}>()

const emit = defineEmits<{
  (e: 'update', position: Position): void
}>()

const api = useApi()
const modalConfirm = useModalConfirm()
const {t} = useI18n()
const toaster = useToaster()

const editSectionModal = ref<POSITION_SECTION|null>(null)
const approvalHistoryModal = ref<boolean>(false)

async function deleteFile(file: FileResource): Promise<void> {
  const confirm = await modalConfirm.showConfirmModalPromise({
    title: t('modal.fileDelete.title'),
    text: t('modal.fileDelete.text', {file: file.name}),
  })

  if (!confirm) {
    return
  }

  const result = await handle(async () => {
    await api.positionFile.destroy(props.position!.id, file.id)
  })

  if (!result.success) {
    return
  }

  const index = props.position.files.findIndex(item => item.id === file.id)

  // remove file from existing files array
  if (index > -1) {
    props.position.files.splice(index, 1)
  }

  await toaster.success({
    title: 'toast.position.file.delete.success'
  })
}

function onUpdate(position: Position): void {
  editSectionModal.value = null
  emit('update', position)
}
</script>