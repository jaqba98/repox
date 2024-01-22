import {ParamDtoValidService} from "../../service/param-dto-valid.service";
import {ProgramValidBuilderService} from "./program-valid-builder.service";
import {ParamDtoService} from "../../service/param-dto.service";

/**
 * The abstract builder contains methods which can be implemented in the param dto validation builder service.
 */
export abstract class ParamDtoValidBuilderAbstractService {
    abstract readonly paramDtoValid: ParamDtoValidService;

    abstract buildSupportedSignsValid(paramDto: ParamDtoService): ProgramValidBuilderService;

    abstract buildCorrectPatternValid(paramDto: ParamDtoService): ProgramValidBuilderService;

    abstract buildCanExistValid(paramDto: ParamDtoService): ProgramValidBuilderService;

    abstract buildCorrectOrderValid(paramDto: ParamDtoService): ProgramValidBuilderService;

    abstract build(): ParamDtoValidService;
}
