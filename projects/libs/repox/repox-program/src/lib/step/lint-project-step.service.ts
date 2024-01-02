import {singleton} from "tsyringe";
import type {EmptyRepoxProgramModel, LintProjectRepoxCommandModel} from "@lib/repox-domain";
import {REPOX_LOGO} from "@lib/repox-const";
import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {GoToWorkspaceRootAppService, SystemProgramEnum, SystemProgramExistAppService} from "@lib/program-step";
import {LoadWsDtoAppService} from "../app-service/load-ws-dto-app.service";
import {VerificationWsDtoAppService} from "../app-service/verification-ws-dto-app.service";
import {LoadWsDomainAppService} from "../app-service/load-ws-domain-app.service";
import {LintProjectsAppService} from "../app-service/lint-projects-app.service";

@singleton()
/**
 * The list of steps for the program lint project.
 */
export class LintProjectStepService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService,
        private readonly systemProgramExist: SystemProgramExistAppService,
        private readonly goToProjectRoot: GoToWorkspaceRootAppService,
        private readonly loadWsDto: LoadWsDtoAppService,
        private readonly verificationWsDto: VerificationWsDtoAppService,
        private readonly loadWsDomain: LoadWsDomainAppService,
        private readonly lintProjects: LintProjectsAppService
    ) {
    }

    runSteps(
        _programModel: EmptyRepoxProgramModel,
        commandModel: LintProjectRepoxCommandModel
    ): void {
        this.simpleMessage.writeInfo(`Lint project`, REPOX_LOGO);
        this.newline.writeNewline();
        if (!this.systemProgramExist.run(SystemProgramEnum.node)) return;
        if (!this.systemProgramExist.run(SystemProgramEnum.npm)) return;
        if (!this.systemProgramExist.run(SystemProgramEnum.git)) return;
        const {isFixMode} = commandModel;
        if (!this.goToProjectRoot.run()) return;
        if (!this.loadWsDto.run()) return;
        if (!this.verificationWsDto.run()) return;
        if (!this.loadWsDomain.run()) return;
        if (!this.lintProjects.run(isFixMode)) return;
        this.newline.writeNewline();
        this.simpleMessage.writeSuccess(`Command executed correctly`);
    }
}
