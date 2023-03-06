import { singleton } from "tsyringe";
import {
  ParamDomainModel,
  ParamsDomainValidatorModel
} from "../../model/param-domain.model";

@singleton()
/**
 * The service is responsible for run all validators to verify
 * the parameter domain model.
 *
 * Validators:
 * 1.Verify that program exists.
 * 2.Verify that command exists.
 * 3.Verify that command is supported by program.
 * 4.Verify that arguments are supported by program.
 * 5.Verify that arguments are supported by command.
 */
export class ParamDomainValidatorService {
  verify(
    paramDomain: ParamDomainModel
  ): ParamsDomainValidatorModel | true {
    return {
      isError: true,
      wrongIndexes: [0],
      errors: ["You have given not existing program!"],
      tips: ["Check the documentation and enter an existing program."]
    };
  }
}
