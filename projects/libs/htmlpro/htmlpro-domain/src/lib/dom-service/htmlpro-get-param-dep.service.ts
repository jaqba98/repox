import { singleton } from "tsyringe";
import { ParamDomainDepModel } from "@lib/param-domain";
import {
  HtmlproArgumentEnum,
  HtmlproCommandEnum,
  HtmlProProgramEnum
} from "@lib/htmlpro-domain";

@singleton()
/**
 * The service is responsible for getting dependency
 * for given program.
 */
export class HtmlproGetParamDepService {
  getProgramDefault(): ParamDomainDepModel {
    return {
      program: HtmlProProgramEnum.default,
      commands: {
        [HtmlproCommandEnum.default]: {
          command: HtmlproCommandEnum.default,
          args: {}
        }
      },
      args: {
        [HtmlproArgumentEnum.version]: {
          name: HtmlproArgumentEnum.version,
          values: [],
          valueMode: "empty",
          required: false
        }
      }
    };
  }

  getProgramBuild(): ParamDomainDepModel {
    return {
      program: HtmlProProgramEnum.build,
      commands: {
        [HtmlproCommandEnum.default]: {
          command: HtmlproCommandEnum.default,
          args: {}
        },
        [HtmlproCommandEnum.html]: {
          command: HtmlproCommandEnum.html,
          args: {
            [HtmlproArgumentEnum.input]: {
              name: HtmlproArgumentEnum.input,
              values: [],
              valueMode: "single",
              required: true
            },
            [HtmlproArgumentEnum.output]: {
              name: HtmlproArgumentEnum.output,
              values: [],
              valueMode: "single",
              required: true
            }
          }
        }
      },
      args: {}
    };
  }
}
