import {injectable} from "tsyringe";

import {ArgumentParamDtoModel, BaseParamDtoModel} from "../../model/param-dto.model";

@injectable()
/**
 * The domain class is a recipe how to build param dto object.
 */
export class ParamDtoDomain {
    baseArgs: string[] | undefined;

    program: BaseParamDtoModel | undefined;

    command: BaseParamDtoModel | undefined;

    programArgs: ArgumentParamDtoModel[] | undefined;

    commandArgs: ArgumentParamDtoModel[] | undefined;
}
