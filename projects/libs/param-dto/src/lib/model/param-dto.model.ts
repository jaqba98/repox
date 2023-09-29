import {ParamTypeEnum} from "@lib/param-dto";

/**
 * The DTO model of parameters (data transport model)
 * for all parameters directly from the command line.
 */

export interface ParamDtoEntityModel {
    paramBaseValue: string;
    paramIndex: number;
    paramType: ParamTypeEnum;
    paramHasValue: boolean;
    paramName: string;
    paramValues: string[];
    paramHasManyValues: boolean;
}

export interface ParamDtoModel {
    params: ParamDtoEntityModel[];
}
