import {ParamDtoValidService} from "../../service/param-dto-valid.service";
import {ProgramValidBuilderService} from "./program-valid-builder.service";

/**
 * The abstract builder contains methods which can be implemented in the param dto validation builder service.
 */
export abstract class ParamDtoValidBuilderAbstractService {
    abstract readonly paramDtoValid: ParamDtoValidService;

    abstract buildSupportedSignsValid(): ProgramValidBuilderService;

    abstract buildCorrectPatternValid(): ProgramValidBuilderService;

    abstract buildCanExistValid(): ProgramValidBuilderService;

    abstract buildCorrectOrderValid(): ProgramValidBuilderService;

    abstract build(): ParamDtoValidService;
}
