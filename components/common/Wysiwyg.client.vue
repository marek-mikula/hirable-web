<template>
  <div>
    <ckeditor
        v-model="model"
        :editor="ClassicEditor"
        :config="editorConfig"
        :disabled="disabled"
        @ready="onReady"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        @destroy="onDestroy"
    />
  </div>
</template>

<script lang="ts" setup>
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
import 'ckeditor5/ckeditor5.css';
import type {WysiwygConfig, WysiwygExpose} from "~/types/components/common/wysiwyg.types";
import type {EventInfo, EditorConfig} from "ckeditor5";
import {
  ClassicEditor,
  Alignment,
  AutoLink,
  Autoformat,
  BlockQuote,
  Bold,
  Code,
  CodeBlock,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontSize,
  Heading,
  HorizontalLine,
  Indent,
  Italic,
  Link,
  List,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableToolbar,
  TextTransformation,
  Underline,
  Undo,
  WordCount
} from 'ckeditor5'
import csTranslations from "ckeditor5/translations/cs.js";
import enTranslations from "ckeditor5/translations/en.js";

const {locale} = useI18n()

const props = withDefaults(defineProps<{
  config: WysiwygConfig
  disabled?: boolean
}>(), {
  disabled: false,
})

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

  plugins: [
    Alignment,
    AutoLink,
    Autoformat,
    BlockQuote,
    Bold,
    Code,
    CodeBlock,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontSize,
    Heading,
    HorizontalLine,
    Indent,
    Italic,
    Link,
    List,
    Paragraph,
    PasteFromOffice,
    RemoveFormat,
    Strikethrough,
    Subscript,
    Superscript,
    Table,
    TableToolbar,
    TextTransformation,
    Underline,
    Undo,
    WordCount
  ],

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

function focus(): void {
  instance.value?.focus()
}

defineExpose<WysiwygExpose>({
  focus
})
</script>

<style scoped>
/*fix lists padding caused by Tailwind library*/
:deep(.ck.ck-editor__main .ck-content) ul,
:deep(.ck.ck-editor__main .ck-content) ol {
  padding-left: 15px;
}
:deep(.ck.ck-editor__main .ck-content) h1 {
  font-size: 1.5rem;
  font-weight: bold;
}

:deep(.ck.ck-editor__main .ck-content) h2 {
  font-size: 1.25rem;
  font-weight: bold;
}

:deep(.ck.ck-editor__main .ck-content) h3 {
  font-size: 1.125rem;
  font-weight: bold;
}

:deep(.ck.ck-editor__main .ck-content) h4 {
  font-size: 1rem;
  font-weight: bold;
}

:deep(.ck.ck-editor__main .ck-content) h5 {
  font-size: 0.875rem;
  font-weight: bold;
}

:deep(.ck.ck-editor__main .ck-content) h6 {
  font-size: 0.75rem;
  font-weight: bold;
}
</style>
