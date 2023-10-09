import {singleton} from "tsyringe";
import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {GoToProjectRootAppService} from "@lib/program-step";
import {LoadWsDtoAppService} from "../app-service/load-ws-dto-app.service";
import {LoadWsDomainAppService} from "../app-service/load-ws-domain-app.service";
import {type BuildProjectRepoxCommandModel, type BuildProjectRepoxProgramModel} from "@lib/repox-domain";
import {REPOX_LOGO} from "@lib/repox-const";
import {BuildProjectAppService} from "../app-service/build-project-app.service";
import {ProjectExistAppService} from "../app-service/project-exist-app.service";
import {VerificationWsDtoAppService} from "../app-service/verification-ws-dto-app.service";

@singleton()
/**
 * The list of steps for the program build project.
 */
export class BuildProjectStepService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService,
        // private readonly allProgramInstalled: AllProgramInstalledService,
        private readonly goToProjectRoot: GoToProjectRootAppService,
        private readonly verificationWsDto: VerificationWsDtoAppService,
        private readonly loadWsDto: LoadWsDtoAppService,
        private readonly loadWsDomain: LoadWsDomainAppService,
        private readonly projectExist: ProjectExistAppService,
        private readonly buildProject: BuildProjectAppService
    ) {
    }

    runSteps(
        _programModel: BuildProjectRepoxProgramModel,
        commandModel: BuildProjectRepoxCommandModel
    ): void {
        this.simpleMessage.writeInfo(`Build project`, REPOX_LOGO);
        this.newline.writeNewline();
        // if (!this.allProgramInstalled.run()) return;
        if (!this.goToProjectRoot.run()) return;
        if (!this.loadWsDto.run()) return;
        if (!this.verificationWsDto.run()) return;
        if (!this.loadWsDomain.run()) return;
        const {projectName, buildWatch} = commandModel;
        if (!this.projectExist.run(projectName)) return;
        this.buildProject.run(projectName, buildWatch);
    }
}

// todo: refactor the file
