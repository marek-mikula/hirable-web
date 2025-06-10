<template>
  <div>
    <ckeditor v-model="model" :editor="ClassicEditor" :config="editorConfig"/>
  </div>
</template>

<script lang="ts" setup>
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
import 'ckeditor5/ckeditor5.css';
import type {WysiwygConfig} from "~/types/components/common/wysiwyg.types";
import type {EventInfo, EditorConfig} from "ckeditor5";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
} from 'ckeditor5'
import csTranslations from "ckeditor5/translations/cs.js";
import enTranslations from "ckeditor5/translations/en.js";

const {locale} = useI18n()

const props = defineProps<{
  config: WysiwygConfig
}>()

const emit = defineEmits<{
  (e: 'ready', editor: ClassicEditor): void,
  (e: 'focus', event: EventInfo, editor: ClassicEditor): void,
  (e: 'blur', event: EventInfo, editor: ClassicEditor): void,
  (e: 'input', value: string, event: EventInfo, editor: ClassicEditor): void,
  (e: 'destroy'): void,
}>()

const model = defineModel<string | null>({
  default: '',
  required: false,
  // CKEditor throw exception if value
  // is null, though we must cast it
  // always to string
  get(val) {
    return val === null ? '' : val
  }
})
const instance = ref<ClassicEditor | null>(null)
const editorConfig = ref<EditorConfig>({
  // set language based on currently
  // selected language
  language: locale.value,

  licenseKey: 'GPL',

  translations: [
      csTranslations,
      enTranslations,
  ],

  plugins: [ Essentials, Paragraph, Bold, Italic ],

  // merge in config from outside
  ...props.config
})


function onReady(editor: ClassicEditor): void {
  instance.value = editor
  emit('ready', editor)
}

function onFocus(event: EventInfo, editor: ClassicEditor): void {
  emit('focus', event, editor)
}

function onBlur(event: EventInfo, editor: ClassicEditor): void {
  emit('blur', event, editor)
}

function onInput(value: string, event: EventInfo, editor: ClassicEditor): void {
  emit('input', value, event, editor)
}

function onDestroy(): void {
  instance.value = null
  emit('destroy')
}
</script>
