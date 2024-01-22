import {ParamDtoService} from "../../service/param-dto.service";
import {ParamDtoBuilderService} from "./param-dto-builder.service";

/**
 * The abstract builder contains methods which can be implemented in the param dto builder service.
 */
export abstract class ParamDtoBuilderAbstractService {
    abstract readonly paramDto: ParamDtoService;

    abstract buildBaseArguments(argv: string[]): ParamDtoBuilderService;

    abstract buildProgram(): ParamDtoBuilderService;

    abstract buildCommand(): ParamDtoBuilderService;

    abstract buildProgramArguments(): ParamDtoBuilderService;

    abstract buildCommandArguments(): ParamDtoBuilderService;

    abstract build(): ParamDtoService;
}
