import { singleton } from "tsyringe";
import {
  type BuildProjectRepoxCommandModel,
  type BuildProjectRepoxProgramModel,
  type DefaultDefaultRepoxProgramModel,
  type EmptyRepoxCommandModel,
  type EmptyRepoxProgramModel,
  type GenerateProjectRepoxCommandModel,
  type GenerateWorkspaceRepoxCommandModel,
  type LintProjectRepoxCommandModel,
  type PublishNpmRepoxCommandModel,
  RepoxArgumentEnum
} from "@lib/repox-domain";
import { ParamDomainAppService } from "@lib/param-domain";
import {
  ProjectSchemeEnum,
  ProjectTypeEnum
} from "@lib/repox-workspace";

@singleton()
/**
 * The service is responsible for building correct and complete
 * model for all kinds of programs and commends.
 */
export class RepoxBuildParamModelService {
  constructor (private readonly paramDomain: ParamDomainAppService) {
  }

  emptyProgram (): EmptyRepoxProgramModel {
    return {};
  }

  emptyCommand (): EmptyRepoxCommandModel {
    return {};
  }

  defaultProgram (): DefaultDefaultRepoxProgramModel {
    return {
      showVersion: this.paramDomain.getProgramBooleanValue(
        RepoxArgumentEnum.version
      )
    };
  }

  generateWorkspaceCommand (): GenerateWorkspaceRepoxCommandModel {
    return {
      workspaceName: this.paramDomain.getCommandStringValue(
        RepoxArgumentEnum.name
      ),
      workspaceRegenerate: this.paramDomain.getCommandBooleanValue(
        RepoxArgumentEnum.regenerate
      )
    };
  }

  generateProjectCommand (): GenerateProjectRepoxCommandModel {
    return {
      projectName: this.paramDomain.getCommandStringValue(
        RepoxArgumentEnum.name
      ),
      projectType: this.paramDomain
        .getCommandStringValue(
          RepoxArgumentEnum.type, ProjectTypeEnum.app
        ) as ProjectTypeEnum,
      projectScheme: this.paramDomain
        .getCommandStringValue(
          RepoxArgumentEnum.scheme, ProjectSchemeEnum.appTypeScript
        ) as ProjectSchemeEnum,
      projectPath: this.paramDomain.getCommandStringValue(
        RepoxArgumentEnum.path
      )
    };
  }

  buildProjectProgram (): BuildProjectRepoxProgramModel {
    return {
      productionMode: this.paramDomain.getProgramBooleanValue(
        RepoxArgumentEnum.production
      )
    };
  }

  buildProjectCommand (): BuildProjectRepoxCommandModel {
    return {
      projectName: this.paramDomain.getCommandStringValue(
        RepoxArgumentEnum.name
      ),
      buildWatch: this.paramDomain.getCommandBooleanValue(
        RepoxArgumentEnum.watch
      )
    };
  }

  publishNpmCommand (): PublishNpmRepoxCommandModel {
    return {
      projectName: this.paramDomain.getCommandStringValue(
        RepoxArgumentEnum.name
      )
    };
  }

  lintProjectCommand (): LintProjectRepoxCommandModel {
    return {
      fix: this.paramDomain.getCommandBooleanValue(
        RepoxArgumentEnum.fix
      )
    };
  }
}
// todo: refactor the file
