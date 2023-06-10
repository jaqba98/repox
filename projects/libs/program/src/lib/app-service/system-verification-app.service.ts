import { singleton } from "tsyringe";
import {
  ProgramInstalledService
} from "../infra/program-installed.service";

@singleton()
/**
 * The app service is responsible for system verification.
 */
export class SystemVerificationAppService {
  constructor(
    private readonly programInstalled: ProgramInstalledService
  ) {
  }

  checkSystem(): boolean {
    if (!this.programInstalled.check("git")) return false;
    if (!this.programInstalled.check("node")) return false;
    return this.programInstalled.check("npm");
  }
}
