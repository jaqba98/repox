import {ParamDtoValidation} from "../../domain/param-dto-validation";
import {ProgramValidationBuilder} from "./program-validation.builder";
import {ParamDto} from "../../domain/param-dto";

/**
 * The abstract builder contains methods which can be implemented in the param dto validation builder service.
 */
export abstract class ParamDtoValidationAbstractBuilder {
    abstract readonly paramDtoValid: ParamDtoValidation;

    abstract buildSupportedSignsValid(paramDto: ParamDto): ParamDtoValidationAbstractBuilder;

    abstract buildCorrectPatternValid(paramDto: ParamDto): ParamDtoValidationAbstractBuilder;

    abstract buildCanExistValid(paramDto: ParamDto): ParamDtoValidationAbstractBuilder;

    abstract buildCorrectOrderValid(paramDto: ParamDto): ParamDtoValidationAbstractBuilder;

    abstract build(): ParamDtoValidation;
}
