import { container, singleton } from "tsyringe";

@singleton()
export class RepoxMainService {
  run() {
    console.log("Hello world");
  }
}

container.resolve(RepoxMainService).run();

// import "core-js/features/reflect";
// import { container, singleton } from "tsyringe";
// import { BuildParamDtoAppService } from "@lib/param-dto";
// import { BuildParamDomainAppService } from "@lib/param-domain";
// import { RepoxLauncherAppService } from "@lib/repox-program";
// /**
//  * The main service runs the repox program.
//  */
// export class RepoxMainService {
//     constructor (
//     private readonly buildParamDto: BuildParamDtoAppService,
//     private readonly buildParamDomain: BuildParamDomainAppService,
//     private readonly repoxLauncher: RepoxLauncherAppService
//     ) {
//     }
//     run (): void {
//         if (!this.buildParamDto.build()) return;
//         if (!this.buildParamDomain.build()) return;
//         this.repoxLauncher.launch();
//     }
// }
