import { singleton } from "tsyringe";
import { type ProgramModel } from "@lib/model";
import {
  BuildHtmlStepService
} from "../step/build-html-step.service";
import {
  type BuildDefaultHtmlProProgramModel,
  type EmptyHtmlProCommandModel
} from "@lib/htmlpro-domain";

@singleton()
/**
 * The start point of the program build html.
 */
export class BuildDefaultProgramService implements ProgramModel {
  constructor (private readonly step: BuildHtmlStepService) {
  }

  run (programDomain: unknown, commandDomain: unknown): void {
    const programModel = programDomain as BuildDefaultHtmlProProgramModel;
    const commandModel = commandDomain as EmptyHtmlProCommandModel;
    this.step.runSteps(programModel, commandModel);
  }
}
// todo: refactor the file
