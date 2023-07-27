import { singleton } from "tsyringe";
import { RunProgramModel } from "@lib/model";
import {
  BuildHtmlStepService
} from "../step/build-html-step.service";
import {
  BuildHtmlHtmlproCommandModel,
  EmptyHtmlproProgramModel
} from "@lib/htmlpro-domain";

@singleton()
/**
 * The start point of the program build html.
 */
export class BuildHtmlProgramService implements RunProgramModel {
  constructor(private readonly step: BuildHtmlStepService) {
  }

  runProgram(programDomain: unknown, commandDomain: unknown): void {
    const programModel = <EmptyHtmlproProgramModel>programDomain;
    const commandModel = <BuildHtmlHtmlproCommandModel>
      commandDomain;
    this.step.runSteps(programModel, commandModel);
  }
}
