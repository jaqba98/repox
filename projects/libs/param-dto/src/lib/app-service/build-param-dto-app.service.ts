import {singleton} from "tsyringe";

import {ReadArgumentsService} from "../infrastructure/read-arguments.service";
import {BuildParamDtoService} from "../dom-service/builder/build-param-dto.service";

@singleton()
/**
 * The app service is responsible for build and validate
 * parameter DTO model from command line.
 */
export class BuildParamDtoAppService {
    constructor(
        private readonly readArguments: ReadArgumentsService,
        private readonly buildParamDto: BuildParamDtoService
    ) {
    }

    build(): void {
        const args = this.readArguments.read();
        const dto = this.buildParamDto.build(args);
        console.log(dto);
    }
}

// import {singleton} from "tsyringe";
// import {ReadArgumentsService} from "../infrastructure/read-arguments.service";
// import {BuildParamDtoService} from "../dom-service/builder/build-param-dto.service";
// import {ValidationParamDtoService} from "../dom-service/validation/validation-param-dto.service";
//
// @singleton()
// /**
//  * The app service is responsible for build and validate
//  * parameter DTO model from command line.
//  */
// export class BuildParamDtoAppService {
//     constructor(
//         private readonly readArgv: ReadArgumentsService,
//         private readonly buildParamDto: BuildParamDtoService,
//         private readonly validationParamDto: ValidationParamDtoService
//     ) {
//     }
//
//     build(): void {
//         const argv = this.readArgv.getArgv();
//         this.buildParamDto.buildParamDto(argv);
//         this.validationParamDto.runValidation();
//     }
// }
//
// // todo: refactor the code
