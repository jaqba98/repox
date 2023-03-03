import { container, singleton } from "tsyringe";
import {
  ParamDtoModel,
  ParamsDtoValidatorModel
} from "../../model/param-dto.model";
import { SupportedSignsService } from "./supported-signs.service";
import { RunValidatorModel } from "../../model/run-validator.model";
import { CorrectPatternService } from "./correct-pattern.service";
import { SingleProgramService } from "./single-program.service";
import { SingleCommandService } from "./single-command.service";
import { CorrectOrderService } from "./correct-order.service";

@singleton()
/**
 * The service is responsible for run all validators to verify
 * the parameter DTO model.
 *
 * repox generate --cache -i workspace --target=node -l=prettier
 *
 * Validators:
 * 1.Verify that each part of the command contains only supported
 *   characters.
 * 2.Verify that each part of the command has correct pattern.
 * 3.Verify that command contains only: 1 program.
 * 4.Verify that command contains only: 1 command.
 * 5.Verify that each part of the command are in correct order.
 */
export class ParamsDtoValidatorService {
  verify(paramsDto: ParamDtoModel): Array<ParamsDtoValidatorModel> {
    const error =  this.getAllValidators()
      .map(validator => validator.run(paramsDto))
      .find(validator => validator.isError);
    return error === undefined ? [] : [error];
  }

  private getAllValidators(): Array<RunValidatorModel> {
    return [
      SupportedSignsService,
      CorrectPatternService,
      SingleProgramService,
      SingleCommandService,
      CorrectOrderService
    ]
      .map(validator => container.resolve(validator));
  }
}
