/**
 * The dto model of parameters (data transport model)
 * for all parameters directly from the command line.
 */

export interface ArgumentParamDtoModel extends BaseParamDtoModel {
    hasValue: boolean;
    name: string;
    values: string[];
    hasManyValues: boolean;
    isAlias: boolean;
}

export interface BaseParamDtoModel {
    baseValue: string;
    index: number;
}
// todo: refactor the code