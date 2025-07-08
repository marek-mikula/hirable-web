# Hirable FE client

FE client for Hirable app.

## z-index list

| Depth | Objects                        |
|-------|--------------------------------|
| 10    | table loader                   |
| 20    | table head, table foot         |
| 30    | badge indicators               |
| 40    | sticky navbar                  |
| 50    | sidebars (notification + menu) |
| 100   | modal windows                  |
| 125   | selects, dropdowns, tooltips   |
| 150   | toast messages                 |

## Order of definitions in `setup` tag

1. Imports
2. `definePageMeta()` (if page)
3. `defineProps()`
4. `defineEmits()`
5. composables (`usei18n()`, `useAuth()`, ...)
6. `useAsyncData()`
7. `useHead()` (if page)
8. refs
9. computed properties
10. methods
11. watchers
12. lifecycle events (`onMounted()`, `onBeforeDestroy()`, ...)
13. `defineExpose()`