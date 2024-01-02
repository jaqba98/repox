import {singleton} from "tsyringe";

import {GenerateProjectCommandModel} from "@lib/repox-domain";
import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {REPOX_LOGO} from "@lib/repox-const";

@singleton()
/**
 * The program steps service is responsible for executing the step list to generate the project in the workspace.
 */
export class GenerateProjectStepService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService
    ) {
    }

    runProgramSteps(programDomain: Record<string, never>, commandDomain: GenerateProjectCommandModel): void {
        this.simpleMessage.writeInfo("Generate Project", REPOX_LOGO);
        this.newline.writeNewline();
        // todo: I am here
        console.log(programDomain, commandDomain);
    }
}

// export class GenerateProjectStepService {
//     constructor(
//         // private readonly systemProgramExist: SystemProgramExistAppService,
//         // private readonly goToProjectRoot: GoToProjectRootAppService,
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
//         // if (!this.systemProgramExist.run(SystemProgramEnum.node)) return;
//         // if (!this.systemProgramExist.run(SystemProgramEnum.npm)) return;
//         // if (!this.systemProgramExist.run(SystemProgramEnum.git)) return;
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
