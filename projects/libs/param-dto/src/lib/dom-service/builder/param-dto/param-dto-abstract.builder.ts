import {ParamDto} from "../../domain/param-dto";
import {ParamDtoBuilder} from "./param-dto.builder";

/**
 * The abstract builder contains methods which can be implemented in the param dto builder service.
 */
export abstract class ParamDtoAbstractBuilder {
    abstract readonly paramDto: ParamDto;

    abstract buildBaseArguments(argv: string[]): ParamDtoBuilder;

    abstract buildProgram(): ParamDtoBuilder;

    abstract buildCommand(): ParamDtoBuilder;

    abstract buildProgramArguments(): ParamDtoBuilder;

    abstract buildCommandArguments(): ParamDtoBuilder;

    abstract build(): ParamDto;
}
// todo: refactor the code