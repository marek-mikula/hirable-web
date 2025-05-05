import type {CLASSIFIER_TYPE} from "~/types/enums";
import type {SelectOptionLoader} from "~/types/common";

export function createClassifierSelectLoader(type: CLASSIFIER_TYPE): SelectOptionLoader {
    return () => useApi().classifier.list(type).then(response => response._data!.data.classifiers)
}