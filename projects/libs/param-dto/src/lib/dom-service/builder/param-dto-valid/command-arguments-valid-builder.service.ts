import {container, singleton} from "tsyringe";

import {ParamDtoValidService} from "../../service/param-dto-valid.service";
import {ParamDtoValidBuilderAbstractService} from "./param-dto-valid-builder-abstract.service";
import {ParamDtoService} from "../../service/param-dto.service";
import {CheckBaseValueService} from "../../service/check-base-value.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the command arguments.
 */
export class CommandArgumentsValidBuilderService implements ParamDtoValidBuilderAbstractService {
    readonly paramDtoValid: ParamDtoValidService;

    constructor(private readonly checkBaseValue: CheckBaseValueService) {
        this.paramDtoValid = container.resolve(ParamDtoValidService);
    }

    buildSupportedSignsValid(paramDto: ParamDtoService): CommandArgumentsValidBuilderService {
        const indexes = paramDto.commandArguments
            .filter(argument => argument.baseValue !== "" && argument.index !== -1)
            .filter(argument => !this.checkBaseValue.checkArgumentsBaseValueSupportedSigns(argument.baseValue))
            .map(argument => argument.index);
        if (indexes.length === 0) return this;
        this.paramDtoValid.supportedSigns = false;
        this.paramDtoValid.supportedSignsWrongIndexes = [...indexes];
        return this;
    }

    buildCorrectPatternValid(paramDto: ParamDtoService): CommandArgumentsValidBuilderService {
        const indexes = paramDto.commandArguments
            .filter(argument => argument.baseValue !== "" && argument.index !== -1)
            .filter(argument => !this.checkBaseValue.checkArgumentsBaseValueCorrectPattern(
                argument.baseValue, argument.hasValue, argument.isAlias
            ))
            .map(argument => argument.index);
        if (indexes.length === 0) return this;
        this.paramDtoValid.correctPattern = false;
        this.paramDtoValid.correctPatternWrongIndexes = [...indexes];
        return this;
    }

    buildCanExistValid(_paramDto: ParamDtoService): CommandArgumentsValidBuilderService {
        return this;
    }

    buildCorrectOrderValid(_paramDto: ParamDtoService): CommandArgumentsValidBuilderService {
        return this;
    }

    build(): ParamDtoValidService {
        return this.paramDtoValid;
    }
}

// todo: refactor the code
