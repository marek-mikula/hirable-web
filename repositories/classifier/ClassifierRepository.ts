import {Repository} from "~/repositories/Repository";
import type {ClassifierRepositoryInterface} from "~/repositories/classifier/ClassifierRepositoryInterface";
import type {CLASSIFIER_TYPE} from "~/types/enums";
import type {ListResponse} from "~/repositories/classifier/response";

export class ClassifierRepository extends Repository implements ClassifierRepositoryInterface {
    public list(type: CLASSIFIER_TYPE) {
        return this.get<ListResponse>(`/api/classifiers/${type}`)
    }
}