import {singleton} from "tsyringe";

import {BaseParamDtoModel} from "../../model/param-dto.model";

@singleton()
export class ParamDtoService {
    baseArguments: string[] = [];

    execPath: BaseParamDtoModel = {baseValue: "", index: -1};

    appPath: BaseParamDtoModel = {baseValue: "", index: -1};

    program: BaseParamDtoModel = {baseValue: "", index: -1};

    command: BaseParamDtoModel = {baseValue: "", index: -1};
}

// todo: refactor the code