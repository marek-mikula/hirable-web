<template>
  <div class="space-y-3 lg:space-y-4">

    <div class="overflow-hidden bg-white shadow-xs rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 flex items-center space-x-2 bg-gray-100">
          <h2 class="flex-1 min-w-0 truncate font-semibold text-gray-900">
            {{ $t('model.position.sections.info') }}
          </h2>
          <CommonButton
              v-if="policy.position.update(position)"
              variant="blank"
              class="shrink-0"
              :size="1"
              :icon="PencilIcon"
              v-tooltip="{ content: $t('common.action.edit') }"
              @click="editSectionModal = POSITION_SECTION.INFO"
          />
        </div>
        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.name') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0 relative">
              {{ position.name }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.department') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.department ?? '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.field') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.field ? position.field.label : '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.workload') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
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
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
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
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <ul class="pl-3 list-disc" v-if="position.employmentForms.length > 0">
                <li v-for="form in position.employmentForms" :key="form.value">
                  {{ form.label }}
                </li>
              </ul>
              <span v-else>-</span>
            </dd>
          </div>
          <div v-if="shouldShowAddress" class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.address') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.address ?? '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.jobSeatsNum') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.jobSeatsNum }}
            </dd>
          </div>
          <div class="p-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.description') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 whitespace-pre-line" v-text="position.description ?? '-'"/>
          </div>
        </template>
      </dl>
    </div>

    <div class="overflow-hidden bg-white shadow-xs rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 flex items-center space-x-2 bg-gray-100">
          <h2 class="flex-1 min-w-0 truncate font-semibold text-gray-900">
            {{ $t('model.position.sections.roles') }}
          </h2>
          <CommonButton
              v-if="policy.position.update(position)"
              variant="blank"
              class="shrink-0"
              :size="1"
              :icon="PencilIcon"
              v-tooltip="{ content: $t('common.action.edit') }"
              @click="editSectionModal = POSITION_SECTION.ROLES"
          />
        </div>
        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.common.owner') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.user.label }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.hiringManagers') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <ul class="pl-3 list-disc" v-if="position.hiringManagers.length > 0">
                <li v-for="hm in position.hiringManagers" :key="hm.id">
                  {{ hm.label }}
                </li>
              </ul>
              <span v-else>-</span>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.recruiters') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <ul class="pl-3 list-disc" v-if="position.recruiters.length > 0">
                <li v-for="recruiter in position.recruiters" :key="recruiter.id">
                  {{ recruiter.label }}
                </li>
              </ul>
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
            {{ $t('model.position.sections.approval') }}
          </h2>
          <div class="flex items-center space-x-2">
            <CommonButton
                v-if="position.approvals.length > 0"
                variant="blank"
                class="shrink-0"
                :size="1"
                :icon="UsersIcon"
                v-tooltip="{ content: $t('modal.position.approvalHistory.title') }"
                @click="approvalHistoryModal = true"
            />
          </div>
        </div>
        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.approvers') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <ul class="pl-3 list-disc" v-if="position.approvers.length > 0">
                <li v-for="approver in position.approvers" :key="approver.id">
                  {{ approver.label }}
                </li>
              </ul>
              <span v-else>-</span>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.externalApprovers') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <ul class="pl-3 list-disc" v-if="position.externalApprovers.length > 0">
                <li v-for="externalApprover in position.externalApprovers" :key="externalApprover.id">
                  {{ externalApprover.label }}
                </li>
              </ul>
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
            {{ $t('model.position.sections.offer') }}
          </h2>
          <CommonButton
              v-if="policy.position.update(position)"
              variant="blank"
              class="shrink-0"
              :size="1"
              :icon="PencilIcon"
              v-tooltip="{ content: $t('common.action.edit') }"
              @click="editSectionModal = POSITION_SECTION.OFFER"
          />
        </div>
        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.salary') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.salary.from && position.salary.to ? `${position.salary.from} - ${position.salary.to}` : position.salary.from }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.salaryType') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.salary.type.label }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.salaryFrequency') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.salary.frequency.label }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.salaryCurrency') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.salary.currency.label }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.salaryVar') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.salary.var ?? '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.benefits') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
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

    <div class="overflow-hidden bg-white shadow-xs rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 flex items-center space-x-2 bg-gray-100">
          <h2 class="flex-1 min-w-0 truncate font-semibold text-gray-900">
            {{ $t('model.position.sections.hardSkills') }}
          </h2>
          <CommonButton
              v-if="policy.position.update(position)"
              variant="blank"
              class="shrink-0"
              :size="1"
              :icon="PencilIcon"
              v-tooltip="{ content: $t('common.action.edit') }"
              @click="editSectionModal = POSITION_SECTION.HARD_SKILLS"
          />
        </div>
        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.minEducationLevel') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.minEducationLevel?.label ?? '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.educationField') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.educationField ?? '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.seniority') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <ul class="pl-3 list-disc" v-if="position.seniority.length > 0">
                <li v-for="seniority in position.seniority" :key="seniority.value">
                  {{ seniority.label }}
                </li>
              </ul>
              <span v-else>-</span>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.experience') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.experience ?? '-' }}
            </dd>
          </div>
          <div class="p-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.hardSkills') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 whitespace-pre-line" v-text="position.hardSkills ?? '-'"/>
          </div>
        </template>
      </dl>
    </div>

    <div class="overflow-hidden bg-white shadow-xs rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 flex items-center space-x-2 bg-gray-100">
          <h2 class="flex-1 min-w-0 truncate font-semibold text-gray-900">
            {{ $t('model.position.sections.softSkills.title') }}
          </h2>
          <CommonButton
              v-if="policy.position.update(position)"
              variant="blank"
              class="shrink-0"
              :size="1"
              :icon="PencilIcon"
              v-tooltip="{ content: $t('common.action.edit') }"
              @click="editSectionModal = POSITION_SECTION.SOFT_SKILLS"
          />
        </div>
        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.organisationSkills') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <CommonScale :value="position.organisationSkills" :max="100"/>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.teamSkills') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <CommonScale :value="position.teamSkills" :max="100"/>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.timeManagement') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <CommonScale :value="position.timeManagement" :max="100"/>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.communicationSkills') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <CommonScale :value="position.communicationSkills" :max="100"/>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.leadership') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <CommonScale :value="position.leadership" :max="100"/>
            </dd>
          </div>
        </template>
      </dl>
    </div>

    <div class="overflow-hidden bg-white shadow-xs rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 flex items-center space-x-2 bg-gray-100">
          <h2 class="flex-1 min-w-0 truncate font-semibold text-gray-900">
            {{ $t('model.position.sections.languageSkills.title') }}
          </h2>
          <CommonButton
              v-if="policy.position.update(position)"
              variant="blank"
              class="shrink-0"
              :size="1"
              :icon="PencilIcon"
              v-tooltip="{ content: $t('common.action.edit') }"
              @click="editSectionModal = POSITION_SECTION.LANGUAGE_SKILLS"
          />
        </div>
        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.languageSkills') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
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

    <div class="overflow-hidden bg-white shadow-xs rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 flex items-center space-x-2 bg-gray-100">
          <h2 class="flex-1 min-w-0 truncate font-semibold text-gray-900">
            {{ $t('model.position.sections.recruitment.title') }}
          </h2>
          <CommonButton
              v-if="policy.position.update(position)"
              variant="blank"
              class="shrink-0"
              :size="1"
              :icon="PencilIcon"
              v-tooltip="{ content: $t('common.action.edit') }"
              @click="editSectionModal = POSITION_SECTION.RECRUITMENT"
          />
        </div>
        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.hardSkillsWeight') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <CommonScale :value="position.hardSkillsWeight" :max="100"/>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.softSkillsWeight') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <CommonScale :value="position.softSkillsWeight" :max="100"/>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.languageSkillsWeight') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <CommonScale :value="position.languageSkillsWeight" :max="100"/>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.experienceWeight') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <CommonScale :value="position.experienceWeight" :max="100"/>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.educationWeight') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <CommonScale :value="position.educationWeight" :max="100"/>
            </dd>
          </div>
        </template>
      </dl>
    </div>

    <div class="overflow-hidden bg-white shadow-xs rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 flex items-center space-x-2 bg-gray-100">
          <h2 class="flex-1 min-w-0 truncate font-semibold text-gray-900">
            {{ $t('model.position.sections.share.title') }}
          </h2>
          <CommonButton
              v-if="policy.position.update(position)"
              variant="blank"
              class="shrink-0"
              :size="1"
              :icon="PencilIcon"
              v-tooltip="{ content: $t('common.action.edit') }"
              @click="editSectionModal = POSITION_SECTION.SHARE"
          />
        </div>
        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.externName') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.externName }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.shareSalary') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.shareSalary ? $t('common.boolean.yes') : $t('common.boolean.no') }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.shareContact') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.shareContact ? $t('common.boolean.yes') : $t('common.boolean.no') }}
            </dd>
          </div>
        </template>
      </dl>
    </div>

    <div class="overflow-hidden bg-white shadow-xs rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="p-3 flex items-center space-x-2 bg-gray-100">
          <h2 class="flex-1 min-w-0 truncate font-semibold text-gray-900">
            {{ $t('model.position.sections.other') }}
          </h2>
          <CommonButton
              v-if="policy.position.update(position)"
              variant="blank"
              class="shrink-0"
              :size="1"
              :icon="PencilIcon"
              v-tooltip="{ content: $t('common.action.edit') }"
              @click="editSectionModal = POSITION_SECTION.OTHER"
          />
        </div>
        <template v-if="true">
          <div class="p-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.common.tags') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2">
              <div v-if="position.tags.length > 0" class="flex flex-wrap items-center -ml-1 -mt-1">
                <CommonBadge v-for="(tag, index) in position.tags" class="ml-1 mt-1" :key="index" variant="secondary" :label="tag"/>
              </div>
              <span v-else>-</span>
            </dd>
          </div>
          <div class="p-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.note') }}
            </dt>
            <dd class="mt-2 text-sm text-gray-700 sm:col-span-2">
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
                  :disable-edit="!policy.position.update(position)"
                  @delete="onDeleteFile"
              />
            </dd>
            <dd v-else class="mt-2 text-sm text-gray-700 sm:col-span-2">
              -
            </dd>
          </div>
        </template>
      </dl>
    </div>

    <LazyPositionDetailEditModal
        v-if="policy.position.update(position)"
        :position="position"
        :section="editSectionModal"
        @close="editSectionModal = null"
        @update="onUpdate"
    />

    <LazyPositionApprovalHistoryModal
        v-if="position.approvals.length > 0"
        :position="position"
        :open="approvalHistoryModal"
        @close="approvalHistoryModal = false"
    />

  </div>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import type {PositionShow} from "~/repositories/resources";
import type {File as FileResource} from "~/repositories/resources";
import {PencilIcon, UsersIcon} from "@heroicons/vue/24/outline";
import {POSITION_SECTION} from "~/types/enums";

const props = defineProps<{
  position: PositionShow
}>()

const emit = defineEmits<{
  (e: 'update', position: PositionShow): void
}>()

const toaster = useToaster()
const policy = usePolicy()

const editSectionModal = ref<POSITION_SECTION|null>(null)
const approvalHistoryModal = ref<boolean>(false)

const shouldShowAddress = computed<boolean>(() => {
  const employmentForms = _.map(props.position.employmentForms, 'value')
  return employmentForms.includes('on_site') || employmentForms.includes('hybrid')
})

async function onDeleteFile(file: FileResource): Promise<void> {
  const index = props.position.files.findIndex(item => item.id === file.id)

  // remove file from existing files array
  if (index > -1) {
    props.position.files.splice(index, 1)
  }

  await toaster.success({
    title: 'toast.file.delete'
  })
}

function onUpdate(position: PositionShow): void {
  editSectionModal.value = null
  emit('update', position)
}
</script>