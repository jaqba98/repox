import { singleton } from "tsyringe";
import {
  BuildLinkProjectCommandArgDomainModel,
  GetParamDomainDataAppService
} from "@lib/param-domain";
import {
  LinkProjectStepService
} from "../step/link-project-step.service";

@singleton()
/**
 * The start point of the link project program.
 */
export class LinkProjectProgramService {
  constructor(
    private readonly step: LinkProjectStepService,
    private readonly getParamDomainData: GetParamDomainDataAppService
  ) {
  }

  run(): void {
    const commandModel = <BuildLinkProjectCommandArgDomainModel>
      this.getParamDomainData.getParamDomain().command.model;
    this.step.runSteps(commandModel);
  }
}
