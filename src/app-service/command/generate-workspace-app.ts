import { singleton } from "tsyringe";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain-model";

/**
 * The command service is responsible for run command
 * generate workspace.
 */
@singleton()
export class GenerateWorkspaceApp {
  run(paramDomain: ParamDomainModel): void {
  }
}
