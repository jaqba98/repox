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
            [HtmlproArgumentEnum.path]: {
              name: HtmlproArgumentEnum.path,
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
