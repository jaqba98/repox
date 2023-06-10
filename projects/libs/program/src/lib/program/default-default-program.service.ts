import { singleton } from "tsyringe";
import {
  DefaultDefaultStepService
} from "../step/default-default-step.service";
import {
  DefaultDefaultProgramArgDomainModel,
  GetParamDomainDataAppService
} from "projects/libs/param-domain/src";

@singleton()
/**
 * The start point of the program default.
 */
export class DefaultDefaultProgramService {
  constructor(
    private readonly defaultDefaultStep: DefaultDefaultStepService,
    private readonly getParamDomainData: GetParamDomainDataAppService
  ) {
  }

  run(): void {
    const programModel = <DefaultDefaultProgramArgDomainModel>
      this.getParamDomainData.getParamDomain().program.model;
    this.defaultDefaultStep.runSteps(programModel);
  }
}
