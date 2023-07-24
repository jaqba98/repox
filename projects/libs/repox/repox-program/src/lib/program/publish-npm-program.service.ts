import { singleton } from "tsyringe";
import { RunProgramModel } from "@lib/model";
import {
  EmptyRepoxProgramModel,
  PublishNpmRepoxCommandModel
} from "@lib/repox-domain";
import {
  PublishNpmStepService
} from "../step/publish-npm-step.service";

@singleton()
/**
 * The start point of the program publish npm.
 */
export class PublishNpmProgramService implements RunProgramModel {
  constructor(
    private readonly step: PublishNpmStepService
  ) {
  }

  runProgram(programDomain: unknown, commandDomain: unknown): void {
    const programModel = <EmptyRepoxProgramModel>programDomain;
    const commandModel = <PublishNpmRepoxCommandModel>
      commandDomain;
    this.step.runSteps(programModel, commandModel);
  }
}
