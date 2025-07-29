import type {SelectOptionLoader} from "~/types/common";
import type {PositionProcessStep, ProcessStep} from "~/repositories/resources";

export function getProcessStepLabel(processStep: ProcessStep | PositionProcessStep): string {
    return processStep.isCustom ? processStep.step : getI18n().t(`model.processStep.steps.${processStep.step}`)
}

export function createProcessStepOptionLoader(includeCommon?: boolean): SelectOptionLoader {
    return () => useApi().processStep.index(includeCommon).then(response => response._data!.data.processSteps.map(processStep => ({
        label: getProcessStepLabel(processStep),
        value: processStep.id,
    })))
}