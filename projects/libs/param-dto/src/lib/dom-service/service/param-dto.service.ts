import {singleton} from "tsyringe";

import {ArgumentParamDtoModel, BaseParamDtoModel} from "../../model/param-dto.model";

@singleton()
/**
 * The service is a recipe how to build param dto.
 */
export class ParamDtoService {
    baseArguments: string[] = [];

    program: BaseParamDtoModel = {baseValue: "", index: -1};

    command: BaseParamDtoModel = {baseValue: "", index: -1};

    programArguments: ArgumentParamDtoModel[] = [];

    commandArguments: ArgumentParamDtoModel[] = [];
}
