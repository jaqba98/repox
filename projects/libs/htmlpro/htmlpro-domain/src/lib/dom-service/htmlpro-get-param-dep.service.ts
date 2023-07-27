import { singleton } from "tsyringe";
import { ParamDomainDepModel } from "@lib/param-domain";
import {
  HtmlproArgumentEnum,
  HtmlproCommandEnum,
  HtmlproProgramEnum
} from "@lib/htmlpro-domain";

@singleton()
/**
 * The service is responsible for getting dependency
 * for given program.
 */
export class HtmlproGetParamDepService {
  getProgramDefault(): ParamDomainDepModel {
    return {
      program: HtmlproProgramEnum.default,
      commands: {
        [HtmlproCommandEnum.default]: {
          command: HtmlproCommandEnum.default,
          args: {}
        }
      },
      args: {}
    };
  }

  getProgramBuild(): ParamDomainDepModel {
    return {
      program: HtmlproProgramEnum.build,
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
