import {singleton} from "tsyringe";
import {BuildProjectRepoxCommandModel, EmptyRepoxProgramModel} from "@lib/repox-domain";
import {REPOX_LOGO} from "@lib/repox-const";
import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {GoToWorkspaceRootAppService} from "@lib/program-step";
import {LoadWsDomainAppService} from "../../dom-service/load-ws-domain-app.service";
import {VerificationWsDtoAppService} from "../../dom-service/verification-ws-dto-app.service";
import {BuildWorkspaceDtoStep} from "../../dom-service/step/build-workspace-dto.step";
import {ProjectExistAppService} from "../../dom-service/project-exist-app.service";
import {BuildProjectAppService} from "../../dom-service/build-project-app.service";

@singleton()
/**
 * The list of steps for the program build project.
 */
export class BuildProjectStepService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService,
        // private readonly systemProgramExist: SystemProgramExistAppService,
        private readonly loadWsDto: BuildWorkspaceDtoStep,
        private readonly goToProjectRoot: GoToWorkspaceRootAppService,
        private readonly loadWsDomain: LoadWsDomainAppService,
        private readonly verificationWsDto: VerificationWsDtoAppService,
        private readonly projectExist: ProjectExistAppService,
        private readonly buildProject: BuildProjectAppService
    ) {
    }

    runSteps(_programModel: EmptyRepoxProgramModel, commandModel: BuildProjectRepoxCommandModel): void {
        this.simpleMessage.writeInfo(`Build project`, REPOX_LOGO);
        this.newline.writeNewline();
        // if (!this.systemProgramExist.run(SystemProgramEnum.node)) return;
        // if (!this.systemProgramExist.run(SystemProgramEnum.npm)) return;
        // if (!this.systemProgramExist.run(SystemProgramEnum.git)) return;
        if (!this.goToProjectRoot.run()) return;
        if (!this.loadWsDto.run()) return;
        if (!this.verificationWsDto.run()) return;
        if (!this.loadWsDomain.run()) return;
        const {projectName} = commandModel;
        if (!this.projectExist.run(projectName)) return;
        this.buildProject.run(projectName);
        this.newline.writeNewline();
        this.simpleMessage.writeSuccess(`Command executed correctly`);
    }
}

// todo: refactor the code
