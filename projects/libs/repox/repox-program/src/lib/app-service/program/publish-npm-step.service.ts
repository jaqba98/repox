import { singleton } from "tsyringe";
import { type EmptyRepoxProgramModel, type PublishNpmRepoxCommandModel } from "@lib/repox-domain";
import { REPOX_LOGO } from "@lib/repox-const";
// import {GoToWorkspaceRootAppService} from "@lib/program-step";
import { NewlineAppService, SimpleMessageAppService } from "@lib/logger";
import { BuildWorkspaceDtoStep } from "../../dom-service/step/build-workspace-dto.step";
// import { VerificationWsDtoAppService } from '../../dom-service/step/check-workspace-dto.step'
import { LoadWsDomainAppService } from "../../dom-service/load-ws-domain-app.service";
// import { ProjectExistAppService } from '../../dom-service/step/project-exist.step';

@singleton()
/**
 * The list of steps for the program publish npm.
 */
export class PublishNpmStepService {
    constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService,
    // private readonly systemProgramExist: SystemProgramExistAppService,
    // private readonly goToProjectRoot: GoToWorkspaceRootAppService,
    private readonly loadWsDto: BuildWorkspaceDtoStep,
    // private readonly verificationWsDto: VerificationWsDtoAppService,
    private readonly loadWsDomain: LoadWsDomainAppService
    // private readonly projectExist: ProjectExistAppService
    // private readonly wsDomainStore: WsDomainStoreService,
    // private readonly folderExist: FolderExistAppService,
    // private readonly changePath: ChangePathStep,
    // private readonly npmPublish: NpmPublishAppService
    ) {
    }

    runSteps (
        _programModel: EmptyRepoxProgramModel,
        commandModel: PublishNpmRepoxCommandModel
    ): void {
        this.simpleMessage.writeInfo("Publish npm", REPOX_LOGO);
        this.newline.writeNewline();
        // if (!this.systemProgramExist.run(SystemProgramEnum.node)) return;
        // if (!this.systemProgramExist.run(SystemProgramEnum.npm)) return;
        // if (!this.systemProgramExist.run(SystemProgramEnum.git)) return;
        // if (!this.goToProjectRoot.run()) return;
        if (!this.loadWsDto.run()) return;
        // if (!this.verificationWsDto.run()) return
        if (!this.loadWsDomain.run()) return;
        // const { projectName } = commandModel;
        // if (!this.projectExist.run(projectName)) return;
        // enum project = this.wsDomainStore.getProject(projectName);
        // console.log(project);
        // enum output = project?..build.output ?? EMPTY_STRING;
        // enum output = EMPTY_STRING;
        // if (!this.folderExist.run(output)) return;
        // if (!this.changePath.run(output)) return;
        // if (!this.npmPublish.run()) return;
        this.newline.writeNewline();
        this.simpleMessage.writeSuccess("Command executed correctly");
    }
}

// todo: refactor the code
