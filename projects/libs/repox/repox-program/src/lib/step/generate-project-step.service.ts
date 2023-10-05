import {singleton} from "tsyringe";
import {type EmptyRepoxProgramModel, type GenerateProjectRepoxCommandModel} from "@lib/repox-domain";
import {REPOX_LOGO} from "@lib/repox-const";
import {NewlineAppService, SimpleMessageAppService} from "@lib/logger";
import {SystemProgramEnum, SystemProgramExistAppService} from "@lib/program-step";

@singleton()
/**
 * The list of steps for the program generate project.
 */
export class GenerateProjectStepService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly newline: NewlineAppService,
        private readonly systemProgramExist: SystemProgramExistAppService,
        // private readonly allProgramInstalled: AllProgramInstalledService,
        // private readonly goToProjectRoot: GoToProjectRootAppService,
        // private readonly loadWsDto: LoadWsDtoAppService,
        // private readonly loadWsDomain: LoadWsDomainAppService,
        // private readonly projectNotExist: ProjectNotExistAppService,
        // private readonly addProjectToDomain: AddProjectToDomainAppService,
        // private readonly saveWsDomain: SaveWsDomainAppService,
        // private readonly saveWsDto: SaveWsDtoAppService,
        // private readonly createProjectFiles: CreateProjectFilesAppService
    ) {
    }

    runSteps(
        _programModel: EmptyRepoxProgramModel,
        commandModel: GenerateProjectRepoxCommandModel
    ): void {
        this.simpleMessage.writeInfo(`Generate project`, REPOX_LOGO);
        this.newline.writeNewline();
        if (!this.systemProgramExist.run(SystemProgramEnum.node)) return;
        if (!this.systemProgramExist.run(SystemProgramEnum.npm)) return;
        if (!this.systemProgramExist.run(SystemProgramEnum.git)) return;
        const {projectName, projectType, projectPath, projectScheme} = commandModel;
        console.log(projectName, projectType, projectPath, projectScheme);
        // todo: I am here
        // if (!this.goToProjectRoot.run()) return;
        // if (!this.loadWsDto.run()) return;
        // if (!this.loadWsDomain.run()) return;
        // if (!this.projectNotExist.run(projectName)) return;
        // this.addProjectToDomain.run(
        //     projectName, projectType, projectPath, projectScheme
        // );
        // if (!this.saveWsDomain.run()) return;
        // if (!this.saveWsDto.run()) return;
        // if (!this.createProjectFiles.run(projectName)) return;
        // this.newline.writeNewline();
        // this.simpleMessage.writeSuccess(`Project generated correctly`);
    }
}
