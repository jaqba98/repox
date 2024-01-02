import {singleton} from "tsyringe";
import {
    type BuildProjectRepoxCommandModel,
    type DefaultDefaultRepoxProgramModel,
    type EmptyRepoxCommandModel,
    type EmptyRepoxProgramModel,
    type GenerateProjectCommandModel,
    type GenerateWorkspaceCommandModel,
    type LintProjectRepoxCommandModel,
    type PublishNpmRepoxCommandModel,
    type RegenerateWorkspaceRepoxCommandModel,
    RepoxArgumentEnum
} from "@lib/repox-domain";
import {ParamDomainAppService} from "@lib/param-domain";
import {ProjectTypeEnum} from "@lib/repox-workspace";

@singleton()
/**
 * The service is responsible for building correct and complete
 * model for all kinds of programs and commends.
 */
export class RepoxBuildParamModelService {
    constructor(private readonly paramDomain: ParamDomainAppService) {
    }

    emptyProgram(): EmptyRepoxProgramModel {
        return {};
    }

    emptyCommand(): EmptyRepoxCommandModel {
        return {};
    }

    defaultProgram(): DefaultDefaultRepoxProgramModel {
        return {
            showVersion: this.paramDomain.getProgramBooleanValue(RepoxArgumentEnum.version)
        };
    }

    generateWorkspaceCommand(): GenerateWorkspaceCommandModel {
        return {
            workspaceName: this.paramDomain.getCommandStringValue(RepoxArgumentEnum.name)
        };
    }

    regenerateWorkspaceCommand():
        RegenerateWorkspaceRepoxCommandModel {
        return {
            isForceMode: this.paramDomain.getCommandBooleanValue(RepoxArgumentEnum.force)
        };
    }

    generateProjectCommand(): GenerateProjectCommandModel {
        return {
            projectName: this.paramDomain.getCommandStringValue(RepoxArgumentEnum.name),
            projectType: this.paramDomain.getCommandEnumValue(RepoxArgumentEnum.type, ProjectTypeEnum.appTs),
            projectPath: this.paramDomain.getCommandStringValue(RepoxArgumentEnum.path)
        };
    }

    buildProjectCommand(): BuildProjectRepoxCommandModel {
        return {
            projectName: this.paramDomain.getCommandStringValue(RepoxArgumentEnum.name)
        };
    }

    publishNpmCommand(): PublishNpmRepoxCommandModel {
        return {
            projectName: this.paramDomain.getCommandStringValue(RepoxArgumentEnum.name)
        };
    }

    lintProjectCommand(): LintProjectRepoxCommandModel {
        return {
            isFixMode: this.paramDomain.getCommandBooleanValue(RepoxArgumentEnum.fix)
        };
    }
}
