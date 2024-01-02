import {singleton} from "tsyringe";
import {type EmptyRepoxProgramModel, type PublishNpmRepoxCommandModel} from "@lib/repox-domain";
import {REPOX_LOGO} from "@lib/repox-const";
import {GoToWorkspaceRootAppService, SystemProgramEnum, SystemProgramExistAppService} from "@lib/program-step";
import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {LoadWsDtoAppService} from "../app-service/load-ws-dto-app.service";
import {VerificationWsDtoAppService} from "../app-service/verification-ws-dto-app.service";
import {LoadWsDomainAppService} from "../app-service/load-ws-domain-app.service";
import {ProjectExistAppService} from "../app-service/project-exist-app.service";
import {WsDomainStoreService} from "@lib/repox-workspace";

@singleton()
/**
 * The list of steps for the program publish npm.
 */
export class PublishNpmStepService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService,
        private readonly systemProgramExist: SystemProgramExistAppService,
        private readonly goToProjectRoot: GoToWorkspaceRootAppService,
        private readonly loadWsDto: LoadWsDtoAppService,
        private readonly verificationWsDto: VerificationWsDtoAppService,
        private readonly loadWsDomain: LoadWsDomainAppService,
        private readonly projectExist: ProjectExistAppService,
        private readonly wsDomainStore: WsDomainStoreService,
        // private readonly folderExist: FolderExistAppService,
        // private readonly changePath: ChangePathAppService,
        // private readonly npmPublish: NpmPublishAppService
    ) {
    }

    runSteps(
        _programModel: EmptyRepoxProgramModel,
        commandModel: PublishNpmRepoxCommandModel
    ): void {
        this.simpleMessage.writeInfo(`Publish npm`, REPOX_LOGO);
        this.newline.writeNewline();
        if (!this.systemProgramExist.run(SystemProgramEnum.node)) return;
        if (!this.systemProgramExist.run(SystemProgramEnum.npm)) return;
        if (!this.systemProgramExist.run(SystemProgramEnum.git)) return;
        if (!this.goToProjectRoot.run()) return;
        if (!this.loadWsDto.run()) return;
        if (!this.verificationWsDto.run()) return;
        if (!this.loadWsDomain.run()) return;
        const { projectName } = commandModel;
        if (!this.projectExist.run(projectName)) return;
        const project = this.wsDomainStore.getProject(projectName);
        console.log(project);
        // const output = project?..build.output ?? EMPTY_STRING;
        // const output = EMPTY_STRING;
        // if (!this.folderExist.run(output)) return;
        // if (!this.changePath.run(output)) return;
        // if (!this.npmPublish.run()) return;
        this.newline.writeNewline();
        this.simpleMessage.writeSuccess(`Command executed correctly`);
    }
}
