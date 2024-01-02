import {singleton} from "tsyringe";

import {GenerateProjectCommandModel} from "@lib/repox-domain";
import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {REPOX_LOGO} from "@lib/repox-const";
import {GoToWorkspaceRootAppService} from "@lib/program-step";

@singleton()
/**
 * The program steps service is responsible for executing the step list to generate the project in the workspace.
 */
export class GenerateProjectStepService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService,
        private readonly goToWorkspaceRoot: GoToWorkspaceRootAppService
    ) {
    }

    runProgramSteps(_programDomain: Record<string, never>, _commandDomain: GenerateProjectCommandModel): void {
        this.simpleMessage.writeInfo("Generate Project", REPOX_LOGO);
        this.newline.writeNewline();
        if (!this.goToWorkspaceRoot.run()) return;
        // I am here
    }
}

// export class GenerateProjectStepService {
//     constructor(
//         // private readonly loadWsDto: LoadWsDtoAppService,
//         // private readonly verificationWsDto: VerificationWsDtoAppService,
//         // private readonly loadWsDomain: LoadWsDomainAppService,
//         // private readonly projectNotExist: ProjectNotExistAppService,
//         // private readonly addProjectToDomain: AddProjectToDomainAppService,
//         // private readonly saveWsDomain: SaveWsDomainAppService,
//         // private readonly saveWsDto: SaveWsDtoAppService,
//         // private readonly createProjectFiles: CreateProjectFilesAppService
//     ) {
//     }
//
//     runSteps(
//         _programModel: Record<string, never>,
//         _commandModel: GenerateProjectCommandModel
//     ): void {
//         // if (!this.goToProjectRoot.run()) return;
//         // if (!this.loadWsDto.run()) return;
//         // if (!this.verificationWsDto.run()) return;
//         // if (!this.loadWsDomain.run()) return;
//         // const {projectName, projectType, projectPath} = commandModel;
//         // if (!this.projectNotExist.run(projectName)) return;
//         // this.addProjectToDomain.run(projectName, projectType, projectPath);
//         // if (!this.saveWsDomain.run()) return;
//         // if (!this.saveWsDto.run()) return;
//         // if (!this.createProjectFiles.run(projectName)) return;
//         // this.newline.writeNewline();
//         // this.simpleMessage.writeSuccess(`Command executed correctly`);
//     }
// }
