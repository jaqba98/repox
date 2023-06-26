import { singleton } from "tsyringe";
import {
  GenerateProjectProgramModel
} from "../model/program/generate-project-program.model";
import { PreRunAppService } from "../app-service/pre-run-app.service";
import { SimpleMessageAppService } from "@lib/logger";
import { REPOX_LOGO } from "@lib/const";

@singleton()
/**
 * The list of steps for the generate project program.
 */
export class GenerateProjectStepService {
  constructor(
    private readonly simple: SimpleMessageAppService,
    private readonly preRun: PreRunAppService
    // private readonly checkWorkspace: CheckWorkspaceAppService
    // private readonly goToProjectRoot: GoToProjectRootAppService,
    // private readonly projectApp: ProjectAppService,
    // private readonly systemVerification: SystemVerificationAppService,
    // private readonly workspaceCheck: WorkspaceCheckAppService,
    // private readonly generateProjectApp: GenerateProjectAppService,
    // private readonly loadConfigFileApp: LoadConfigFileAppService,
    // private readonly projectNotExist: ProjectNotExistAppService
  ) {
  }

  runSteps(programModel: GenerateProjectProgramModel): void {
    this.simple.writeInfo("Project generation", REPOX_LOGO);
    if (!this.preRun.run()) return;
    console.log(programModel);
    // if (!this.checkWorkspace.run()) return;
    // // Loading configuration
    // if (!this.loadConfigFileApp.loadConfig()) return;
    // // Check that the project does not exist
    // if (!this.projectNotExist.check(
    //   model.projectName, model.projectType, model.projectPath
    // )) return;
    // // Generate a project
    // if (!this.generateProjectApp.generate(
    //   model.projectName, model.projectType, model.projectPath,
    //   model.projectAlias, model.projectScheme
    // )) {
    //   return;
    // }
    // // Display a success message
    // this.simple.writeNewline();
    // this.simple.writeSuccess("Project created", 1, false, true);
  }
}

// todo: refactor
