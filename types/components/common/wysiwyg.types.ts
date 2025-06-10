import type {EditorConfig} from "ckeditor5";

export type WysiwygConfig = Omit<EditorConfig, 'language' | 'translations' | 'licenseKey'>