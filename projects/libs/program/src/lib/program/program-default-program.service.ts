import { singleton } from "tsyringe";
import {
  DefaultProgramArgModel,
  ParamDomainModel
} from "@lib/param-domain";
import {
  ProgramDefaultStepService
} from "../step/program-default-step.service";

@singleton()
/**
 * The start point of the program default.
 */
export class ProgramDefaultProgramService {
  constructor(
    private readonly programDefaultStep: ProgramDefaultStepService
  ) {
  }

  run(): void {
    const programModel = <DefaultProgramArgModel>
      paramDomain.program.model;
    this.programDefaultStep.runSteps(programModel);
  }
}
// todo: refactor