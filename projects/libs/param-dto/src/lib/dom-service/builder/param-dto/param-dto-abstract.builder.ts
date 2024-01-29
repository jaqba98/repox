import {ParamDtoDomain} from "../../domain/param-dto.domain";

/**
 * The abstract builder contains methods which can be implemented
 * in the param dto builder service.
 */
export abstract class ParamDtoAbstractBuilder {
    abstract readonly paramDto: ParamDtoDomain;

    abstract buildBaseArgs(args: string[]): ParamDtoAbstractBuilder;

    abstract buildProgram(): ParamDtoAbstractBuilder;

    abstract buildCommand(): ParamDtoAbstractBuilder;

    abstract buildProgramArgs(): ParamDtoAbstractBuilder;

    abstract buildCommandArgs(): ParamDtoAbstractBuilder;

    abstract build(): ParamDtoDomain;
}
