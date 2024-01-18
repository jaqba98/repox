import {ParamTypeEnum} from "../enum/param-type.enum";

/**
 * The DTO model of parameters (data transport model)
 * for all parameters directly from the command line.
 */

export interface ParamDtoEntityModel {
    baseValue: string;
    index: number;
    type: ParamTypeEnum;
    hasValue: boolean;
    name: string;
    values: string[];
    hasManyValues: boolean;
}

export interface ParamDtoModel {
    params: ParamDtoEntityModel[];
}

// todo: refactor the code