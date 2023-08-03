import { singleton } from "tsyringe";
import { type RunProgramModel } from "@lib/model";
import {
  type EmptyRepoxProgramModel,
  type PublishNpmRepoxCommandModel
} from "@lib/repox-domain";
import {
  PublishNpmStepService
} from "../step/publish-npm-step.service";

@singleton()
/**
 * The start point of the program publish npm.
 */
export class PublishNpmProgramService implements RunProgramModel {
  constructor (
    private readonly step: PublishNpmStepService
  ) {
  }

  runProgram (programDomain: unknown, commandDomain: unknown): void {
    const programModel = programDomain as EmptyRepoxProgramModel;
    const commandModel = commandDomain as PublishNpmRepoxCommandModel;
    this.step.runSteps(programModel, commandModel);
  }
}
