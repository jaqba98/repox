import {singleton} from "tsyringe";
import {type SystemProgramEnum} from "@lib/program-step";
import {SystemProgramUrlEnum} from "../enum/system-program-url.enum";

@singleton()
/**
 * The service is responsible for getting system program url by name.
 */
export class GetSystemProgramUrlService {
  getUrl (_programName: SystemProgramEnum): SystemProgramUrlEnum {
    // const url = SystemProgramUrlEnum[programName];
    // if (url === undefined) {
    //   throw new Error(
    //     `Given ${programName} system program does not contains url`
    //   );
    // }
    // return url;
    return SystemProgramUrlEnum.git;
  }
}
