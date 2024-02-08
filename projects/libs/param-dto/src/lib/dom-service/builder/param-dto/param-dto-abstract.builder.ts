import {ParamDto} from "../../domain/param-dto";

/**
 * The abstract builder contains methods which can be implemented
 * in the param dto builder service.
 */
export abstract class ParamDtoAbstractBuilder {
    abstract readonly paramDto: ParamDto;

    abstract buildBaseArgs(args: string[]): ParamDtoAbstractBuilder;

    abstract buildProgram(): ParamDtoAbstractBuilder;

    abstract buildCommand(): ParamDtoAbstractBuilder;

    abstract buildProgramArgs(): ParamDtoAbstractBuilder;

    abstract buildCommandArgs(): ParamDtoAbstractBuilder;

    abstract build(): ParamDto;
}
