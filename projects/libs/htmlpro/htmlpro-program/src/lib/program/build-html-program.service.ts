import { singleton } from "tsyringe";
import { RunProgramModel } from "@lib/model";
import {
  BuildHtmlStepService
} from "../step/build-html-step.service";
import {
  BuildHtmlHtmlProCommandModel,
  EmptyHtmlProProgramModel
} from "@lib/htmlpro-domain";

@singleton()
/**
 * The start point of the program build html.
 */
export class BuildHtmlProgramService implements RunProgramModel {
  constructor(private readonly step: BuildHtmlStepService) {
  }

  runProgram(programDomain: unknown, commandDomain: unknown): void {
    const programModel = <EmptyHtmlProProgramModel>programDomain;
    const commandModel = <BuildHtmlHtmlProCommandModel>
      commandDomain;
    this.step.runSteps(programModel, commandModel);
  }
}
