import {singleton} from "tsyringe";
import {BuildProjectRepoxCommandModel, EmptyRepoxProgramModel} from "@lib/repox-domain";

@singleton()
/**
 * The list of steps for the program build project.
 */
export class BuildProjectStepService {
    // constructor(
    //     private readonly simpleMessage: SimpleMessageAppService,
    //     private readonly newline: NewlineAppService,
    //     // private readonly allProgramInstalled: AllProgramInstalledService,
    //     private readonly goToProjectRoot: GoToProjectRootAppService,
    //     private readonly verificationWsDto: VerificationWsDtoAppService,
    //     private readonly loadWsDto: LoadWsDtoAppService,
    //     private readonly loadWsDomain: LoadWsDomainAppService,
    //     private readonly projectExist: ProjectExistAppService,
    //     private readonly buildProject: BuildProjectAppService
    // ) {
    // }

    runSteps(_programModel: EmptyRepoxProgramModel, _commandModel: BuildProjectRepoxCommandModel): void {
        // this.simpleMessage.writeInfo(`Build project`, REPOX_LOGO);
        // this.newline.writeNewline();
        // // if (!this.allProgramInstalled.run()) return;
        // if (!this.goToProjectRoot.run()) return;
        // if (!this.loadWsDto.run()) return;
        // if (!this.verificationWsDto.run()) return;
        // if (!this.loadWsDomain.run()) return;
        // const {projectName} = commandModel;
        // if (!this.projectExist.run(projectName)) return;
        // this.buildProject.run(projectName);
    }
}
