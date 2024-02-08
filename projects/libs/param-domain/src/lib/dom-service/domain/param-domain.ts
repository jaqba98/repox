import {injectable} from "tsyringe";

import {
    CommandArgsDomainModel,
    CommandDomainModel,
    ProgramArgsDomainModel,
    ProgramDomainModel
} from "@lib/param-domain";
import {BaseParamTypeEnum} from "../../enum/base-param-type.enum";

@injectable()
/**
 * The domain class is a recipe how to build param domain object.
 */
export class ParamDomain {
    program: ProgramDomainModel = {
        baseName: BaseParamTypeEnum.unknown,
        name: BaseParamTypeEnum.unknown,
        index: -1
    };

    command: CommandDomainModel = {
        baseName: BaseParamTypeEnum.unknown,
        name: BaseParamTypeEnum.unknown,
        index: -1
    };

    programArgs: ProgramArgsDomainModel = {
        args: {}
    };

    commandArgs: CommandArgsDomainModel = {
        args: {}
    };
}
