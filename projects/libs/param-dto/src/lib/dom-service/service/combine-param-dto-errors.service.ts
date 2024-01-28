import {singleton} from "tsyringe";

import {ParamDtoErrorModel} from "../../model/param-dto-error.model";
import {ParamDtoError} from "../domain/param-dto-error";

@singleton()
export class CombineParamDtoErrorsService {
    combine(errors: ParamDtoError[]): ParamDtoErrorModel[] {
        return [
            ...errors.map(error => error.supportedSignsErrors ?? []).flat(),
            ...errors.map(error => error.correctPatternErrors ?? []).flat(),
            ...errors.map(error => error.canExistErrors ?? []).flat(),
            ...errors.map(error => error.correctOrderErrors ?? []).flat(),
        ];
    }
}
// todo: refactor the code