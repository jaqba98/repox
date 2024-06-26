// done
import { singleton } from "tsyringe";

import { StepMessageAppService } from "@lib/logger";
import { type RepoxJsonDomainModel, WorkspaceDomainStore, WorkspaceDtoStore } from "@lib/repox-workspace";
import { deepCopy } from "@lib/utils";
import { EMPTY_OBJECT } from "@lib/core";

import { buildWorkspaceDomainStepMsg } from "../../const/message/step-message.const";
import { SystemProgramEnum } from "../../enum/system-program/system-program.enum";

@singleton()
/**
 * The step dom-service is responsible for
 * building workspace domain model.
 */
export class BuildWorkspaceDomainStep {
    constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly workspaceDtoStore: WorkspaceDtoStore,
    private readonly workspaceDomainStore: WorkspaceDomainStore
    ) {
    }

    run (): boolean {
        this.stepMessage.write(buildWorkspaceDomainStepMsg());
        this.workspaceDomainStore.workspaceDomain = {
            repoxJsonDomain: this.buildRepoxJsonDomain()
        };
        return true;
    }

    private buildRepoxJsonDomain (): RepoxJsonDomainModel {
        const repoxJsonDto = this.workspaceDtoStore.getRepoxJsonDto();
        return {
            defaultOptions: {
                packageManager: repoxJsonDto.defaultOptions?.packageManager ?? SystemProgramEnum.npm
            },
            projects: deepCopy(repoxJsonDto.projects) ?? deepCopy(EMPTY_OBJECT)
        };
    }
}
