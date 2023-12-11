import {singleton} from "tsyringe";
import type {EmptyRepoxProgramModel, LintProjectRepoxCommandModel} from "@lib/repox-domain";

@singleton()
/**
 * The list of steps for the program lint project.
 */
export class LintProjectStepService {
    // todo: I am here
    constructor(
        // private readonly simpleMessage: SimpleMessageAppService,
        // private readonly newline: NewlineAppService,
        // // private readonly allProgramInstalled: AllProgramInstalledService,
        // private readonly goToProjectRoot: GoToProjectRootAppService,
        // private readonly loadWsDto: LoadWsDtoAppService,
        // private readonly loadWsDomain: LoadWsDomainAppService,
        // private readonly lintProjectsApp: LintProjectsAppService
    ) {
    }

    runSteps(
        _programModel: EmptyRepoxProgramModel,
        _commandModel: LintProjectRepoxCommandModel
    ): void {
        // this.simpleMessage.writeInfo(`Lint project`, REPOX_LOGO);
        // this.newline.writeNewline();
        // // if (!this.allProgramInstalled.run()) return;
        // if (!this.goToProjectRoot.run()) return;
        // if (!this.loadWsDto.run()) return;
        // if (!this.loadWsDomain.run()) return;
        // const { isFixMode } = commandModel;
        // if (!this.lintProjectsApp.run(isFixMode)) return;
        // this.newline.writeNewline();
        // this.simpleMessage.writeSuccess(
        //   `Project linted successfully!`
        // );
    }
}
