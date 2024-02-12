import "core-js/features/reflect";
import {container, singleton} from "tsyringe";

import {BuildParamDtoAppService} from "@lib/param-dto";
import {SimpleMessageAppService} from "@lib/logger";
import {BuildParamDomainAppService} from "@lib/param-domain";
import {RepoxProgramLauncher} from "@lib/repox-program";

@singleton()
/**
 * The main service runs the repox program.
 */
export class RepoxMainService {
    constructor(
        private readonly buildParamDto: BuildParamDtoAppService,
        private readonly buildParamDomain: BuildParamDomainAppService,
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly repoxLauncher: RepoxProgramLauncher
    ) {
    }

    run(): void {
        if (!this.buildParamDto.build()) return;
        if (!this.buildParamDomain.build()) return;
        if (!this.repoxLauncher.launchProgram()) return;
        this.simpleMessage.writeSuccess("Command completed correctly!");
    }
}

container.resolve(RepoxMainService).run();

// import "core-js/features/reflect";
// import {container, singleton} from "tsyringe";
// import {BuildParamDtoAppService, GetParamDtoDataAppService} from "@lib/param-dto";
// import {ParamErrorMessageAppService} from "@lib/logger";
// import {BuildParamDomainAppService, ParamDomainAppService} from "@lib/param-domain";
// import {
//     RepoxAliasEnum,
//     RepoxArgumentEnum,
//     RepoxBuildParamModelAppService,
//     RepoxCommandAliasEnum,
//     RepoxCommandEnum,
//     RepoxGetParamDepAppService,
//     RepoxLaunchProgramAppService,
//     RepoxProgramAliasEnum,
//     RepoxProgramEnum
// } from "@lib/repox-domain";
// import {RepoxProgramLauncher} from "@lib/launcher";
// import {REPOX_LOGO} from "@lib/repox-const";
//
// @singleton()
// /**
//  * The main service is responsible for run the repox program.
//  */
// export class RepoxMainService {
//     constructor(
//         private readonly buildParamDto: BuildParamDtoAppService,
//         private readonly getParamDtoData: GetParamDtoDataAppService,
//         private readonly paramErrorMessage: ParamErrorMessageAppService,
//         private readonly buildParamDomain: BuildParamDomainAppService,
//         private readonly paramDomain: ParamDomainAppService,
//         private readonly launchProgram: RepoxLaunchProgramAppService,
//         private readonly buildParamModel: RepoxBuildParamModelAppService,
//         private readonly launcher: RepoxProgramLauncher
//     ) {
//     }
//
//     run(): void {
//         this.buildParamDomain.build(
//             RepoxProgramEnum,
//             RepoxProgramAliasEnum,
//             RepoxCommandEnum,
//             RepoxCommandAliasEnum,
//             RepoxArgumentEnum,
//             RepoxAliasEnum,
//             container.resolve(RepoxGetParamDepAppService)
//         );
//         const paramDomainValidation = this.paramDomain.getParamDomainValidation();
//         if (!paramDomainValidation.success) {
//             this.paramErrorMessage.writeParamError(
//                 paramDomainValidation.wrongIndexes,
//                 paramDtoValidation.baseValues,
//                 paramDomainValidation.errors,
//                 paramDomainValidation.tips,
//                 REPOX_LOGO
//             );
//             return;
//         }
//         const programs = this.launchProgram.getPrograms();
//         const programDomain = this.buildParamModel.buildProgramParamModel();
//         const commandDomain = this.buildParamModel.buildCommandParamModel();
//         this.launcher.launchProgram(programs).runProgram(programDomain, commandDomain);
//     }
// }
//
// container.resolve(RepoxMainService).run();
//
// // todo: refactor the code
