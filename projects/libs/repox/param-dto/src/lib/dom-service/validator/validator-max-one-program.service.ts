import { singleton } from "tsyringe";
import { ValidatorDtoModel } from "../../model/validator-dto.model";
import {
  BuildParamDtoResultService
} from "../builder/build-param-dto-result.service";
import {
  ParamDtoValidationModel
} from "../../model/param-dto-validation.model";
import {
  FindParamDtoEntityService
} from "../finder/find-param-dto-entity.service";
import {
  ParamDtoStoreService
} from "../store/param-dto-store.service";

@singleton()
/**
 * Check the given DTO parameters have max one program.
 */
export class ValidatorMaxOneProgramService
  implements ValidatorDtoModel {
  constructor(
    private readonly paramDtoStore: ParamDtoStoreService,
    private readonly buildParamDtoResult: BuildParamDtoResultService,
    private readonly findParamDtoEntity: FindParamDtoEntityService
  ) {
  }

  runValidator(): ParamDtoValidationModel {
    const programs = this.findParamDtoEntity.findPrograms();
    if (programs.length > 1) {
      return this.buildParamDtoResult.buildError(
        programs,
        ["You have specified too many programs!"],
        [
          "You have to specify max one program.",
          "Pattern: repox <program> <arguments> <program> <arguments>"
        ]
      );
    }
    return this.buildParamDtoResult.buildSuccess();
  }
}
// todo: refactor