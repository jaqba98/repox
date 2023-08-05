import { singleton } from "tsyringe";
import { type ParamDomainDepModel } from "@lib/param-domain";
import {
  HtmlProArgumentEnum,
  HtmlProCommandEnum,
  HtmlProProgramEnum
} from "@lib/htmlpro-domain";

@singleton()
/**
 * The service is responsible for getting dependency
 * for given program.
 */
export class HtmlProGetParamDepService {
  getProgramDefault (): ParamDomainDepModel {
    return {
      program: HtmlProProgramEnum.default,
      commands: {
        [HtmlProCommandEnum.default]: {
          command: HtmlProCommandEnum.default,
          args: {}
        }
      },
      args: {
        [HtmlProArgumentEnum.version]: {
          name: HtmlProArgumentEnum.version,
          values: [],
          valueMode: `empty`,
          required: false
        }
      }
    };
  }

  getProgramInit (): ParamDomainDepModel {
    return {
      program: HtmlProProgramEnum.init,
      commands: {
        [HtmlProCommandEnum.default]: {
          command: HtmlProCommandEnum.default,
          args: {}
        }
      },
      args: {
        [HtmlProArgumentEnum.force]: {
          name: HtmlProArgumentEnum.force,
          values: [],
          valueMode: `empty`,
          required: false
        }
      }
    };
  }

  getProgramBuild (): ParamDomainDepModel {
    return {
      program: HtmlProProgramEnum.build,
      commands: {
        [HtmlProCommandEnum.default]: {
          command: HtmlProCommandEnum.default,
          args: {}
        }
      },
      args: {
        [HtmlProArgumentEnum.input]: {
          name: HtmlProArgumentEnum.input,
          values: [],
          valueMode: `single`,
          required: true
        },
        [HtmlProArgumentEnum.output]: {
          name: HtmlProArgumentEnum.output,
          values: [],
          valueMode: `single`,
          required: true
        }
      }
    };
  }
}
