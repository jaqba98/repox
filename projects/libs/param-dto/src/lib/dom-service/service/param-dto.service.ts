import {singleton} from "tsyringe";

import {BaseParamDtoModel} from "../../model/param-dto.model";

@singleton()
export class ParamDtoService {
    baseArguments: string[] = [];

    execPath: BaseParamDtoModel | undefined;

    appPath: BaseParamDtoModel | undefined;

    program: BaseParamDtoModel | undefined;

    command: BaseParamDtoModel | undefined;
}

// todo: refactor the code