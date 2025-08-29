import {Repository} from "~/repositories/Repository";
import type {ClassifierRepositoryInterface} from "~/repositories/classifier/ClassifierRepositoryInterface";
import type {CLASSIFIER_TYPE} from "~/types/enums";
import type {IndexResponse, ListResponse} from "~/repositories/classifier/responses";

export class ClassifierRepository extends Repository implements ClassifierRepositoryInterface {
    public async index(types: CLASSIFIER_TYPE[]) {
        const query: Record<string, string> = {}

        for (const [index, type] of types.entries()) {
            query[`types[${index}]`] = type
        }

        return this.get<'json', IndexResponse>('/api/classifiers/', { query })
    }

    public async list(type: CLASSIFIER_TYPE) {
        return this.get<'json', ListResponse>(`/api/classifiers/${type}`)
    }
}