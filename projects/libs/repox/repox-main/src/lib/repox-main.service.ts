import "core-js/features/reflect";
import {container, singleton} from "tsyringe";
import {BuildParamDtoAppService, GetParamDtoDataAppService} from "@lib/param-dto";
import {ParamErrorMessageAppService} from "@lib/logger";
import {BuildParamDomainAppService, ParamDomainAppService} from "@lib/param-domain";
import {
    RepoxAliasEnum,
    RepoxArgumentEnum,
    RepoxBuildParamModelAppService,
    RepoxCommandAliasEnum,
    RepoxCommandEnum,
    RepoxGetParamDepAppService,
    RepoxLaunchProgramAppService,
    RepoxProgramAliasEnum,
    RepoxProgramEnum
} from "@lib/repox-domain";
import {LauncherAppService} from "@lib/launcher";
import {REPOX_LOGO} from "@lib/repox-const";

@singleton()
/**
 * The main service is responsible for run the repox program.
 */
export class RepoxMainService {
    constructor(
        private readonly buildParamDto: BuildParamDtoAppService,
        private readonly getParamDtoData: GetParamDtoDataAppService,
        private readonly paramErrorMessage: ParamErrorMessageAppService,
        private readonly buildParamDomain: BuildParamDomainAppService,
        private readonly paramDomain: ParamDomainAppService,
        private readonly launchProgram: RepoxLaunchProgramAppService,
        private readonly buildParamModel: RepoxBuildParamModelAppService,
        private readonly launcher: LauncherAppService
    ) {
    }

    run(): void {
        this.buildParamDto.build();
        const paramDtoValidation = this.getParamDtoData.getParamDtoValidation();
        if (!paramDtoValidation.success) {
            this.paramErrorMessage.writeParamError(
                paramDtoValidation.wrongIndexes,
                paramDtoValidation.baseValues,
                paramDtoValidation.errors,
                paramDtoValidation.tips,
                REPOX_LOGO
            );
            return;
        }
        this.buildParamDomain.build(
            RepoxProgramEnum,
            RepoxProgramAliasEnum,
            RepoxCommandEnum,
            RepoxCommandAliasEnum,
            RepoxArgumentEnum,
            RepoxAliasEnum,
            container.resolve(RepoxGetParamDepAppService)
        );
        const paramDomainValidation = this.paramDomain.getParamDomainValidation();
        if (!paramDomainValidation.success) {
            this.paramErrorMessage.writeParamError(
                paramDomainValidation.wrongIndexes,
                paramDtoValidation.baseValues,
                paramDomainValidation.errors,
                paramDomainValidation.tips,
                REPOX_LOGO
            );
            return;
        }
        const programs = this.launchProgram.getPrograms();
        const programDomain = this.buildParamModel.buildProgramParamModel();
        const commandDomain = this.buildParamModel.buildCommandParamModel();
        this.launcher.launchProgram(programs).runProgram(programDomain, commandDomain);
    }
}

container.resolve(RepoxMainService).run();
