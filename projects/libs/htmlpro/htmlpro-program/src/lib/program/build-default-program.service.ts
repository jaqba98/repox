import { singleton } from "tsyringe";
import { RunProgramModel } from "@lib/model";
import {
  BuildHtmlStepService
} from "../step/build-html-step.service";
import {
  BuildDefaultHtmlProProgramModel,
  EmptyHtmlProCommandModel
} from "@lib/htmlpro-domain";

@singleton()
/**
 * The start point of the program build html.
 */
export class BuildDefaultProgramService implements RunProgramModel {
  constructor(private readonly step: BuildHtmlStepService) {
  }

  runProgram(programDomain: unknown, commandDomain: unknown): void {
    const programModel = <BuildDefaultHtmlProProgramModel>programDomain;
    const commandModel = <EmptyHtmlProCommandModel>
      commandDomain;
    this.step.runSteps(programModel, commandModel);
  }
}
