import {ParamDtoValidService} from "../../service/param-dto-valid.service";
import {ProgramValidBuilderService} from "./program-valid-builder.service";
import {ParamDtoService} from "../../service/param-dto.service";

/**
 * The abstract builder contains methods which can be implemented in the param dto validation builder service.
 */
export abstract class ParamDtoValidBuilderAbstractService {
    abstract readonly paramDtoValid: ParamDtoValidService;

    abstract buildSupportedSignsValid(paramDto: ParamDtoService): ParamDtoValidBuilderAbstractService;

    abstract buildCorrectPatternValid(paramDto: ParamDtoService): ParamDtoValidBuilderAbstractService;

    abstract buildCanExistValid(paramDto: ParamDtoService): ParamDtoValidBuilderAbstractService;

    abstract buildCorrectOrderValid(paramDto: ParamDtoService): ParamDtoValidBuilderAbstractService;

    abstract build(): ParamDtoValidService;
}
