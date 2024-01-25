import {injectable} from "tsyringe";

import {ArgumentParamDtoModel, BaseParamDtoModel} from "../../model/param-dto.model";

@injectable()
/**
 * The service is a recipe how to build param dto.
 */
export class ParamDto {
    baseArguments: string[] = [];

    program: BaseParamDtoModel = {baseValue: "", index: -1};

    command: BaseParamDtoModel = {baseValue: "", index: -1};

    programArguments: ArgumentParamDtoModel[] = [];

    commandArguments: ArgumentParamDtoModel[] = [];
}
