import {container, singleton} from "tsyringe";
import {BuildParamDtoResultService} from "../builder/build-param-dto-result.service";
import {type ParamDtoValidatorModel} from "../../model/param-dto-validator.model";
import {ValidatorOnlySupportedSignService} from "../validator/validator-only-supported-sign.service";
import {ValidatorCorrectPatternService} from "../validator/validator-correct-pattern.service";
import {ValidatorMaxOneProgramService} from "../validator/validator-max-one-program.service";
import {ParamDtoStoreService} from "../store/param-dto-store.service";
import {ValidatorMaxOneCommandService} from "../validator/validator-max-one-command.service";
import {ValidatorCorrectOrderService} from "../validator/validator-correct-order.service";

@singleton()
/**
 * Run all validators to verify the parameter DTO model.
 *
 * Pattern:
 * > repox <program> <arguments> <program> <arguments>
 *
 * Validators:
 * 1.Verify that each part of the command contains only
 *   supported characters.
 * 2.Verify that each part of the command has correct pattern.
 * 3.Verify that the command contains max 1 program (0 or 1).
 * 4.Verify that the command contains max 1 command
 *   (0 or 1 if the program exist and 0 if the program not exist).
 * 5.Verify that each part of the command are in correct order.
 */
export class ValidationParamDtoService {
    constructor(
        private readonly paramDtoStore: ParamDtoStoreService,
        private readonly buildParamDtoResult: BuildParamDtoResultService
    ) {
    }

    runValidation(): void {
        for (const service of this.getValidators()) {
            const result = service.run();
            if (!result.success) {
                this.paramDtoStore.setParamDtoValidation(result);
                return;
            }
        }
        const success = this.buildParamDtoResult.buildSuccess();
        this.paramDtoStore.setParamDtoValidation(success);
    }

    private getValidators(): ParamDtoValidatorModel[] {
        return [
            ValidatorOnlySupportedSignService,
            ValidatorCorrectPatternService,
            ValidatorMaxOneProgramService,
            ValidatorMaxOneCommandService,
            ValidatorCorrectOrderService
        ].map(service => container.resolve<ParamDtoValidatorModel>(service));
    }
}

// todo: refactor the code
