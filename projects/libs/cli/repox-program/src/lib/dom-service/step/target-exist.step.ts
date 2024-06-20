// done
import { singleton } from "tsyringe";

import { ComplexMessageAppService, StepMessageAppService } from "@lib/logger";
import { WorkspaceDomainStore } from "@lib/repox-workspace";

import { targetExistStepMsg } from "../../const/message/step-message.const";
import { targetNotExistErrorMsg } from "../../const/message/error-message.const";

@singleton()
/**
 * The step dom-service is responsible for checking
 * if the given project contain target.
 */
export class TargetExistStep {
    constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly workspaceDomainStore: WorkspaceDomainStore,
    private readonly complexMessage: ComplexMessageAppService
    ) {}

    run (name: string, target: string): boolean {
        this.stepMessage.write(targetExistStepMsg(target));
        const { repoxJsonDomain } = this.workspaceDomainStore.getWorkspaceDomain();
        const { projects } = repoxJsonDomain;
        const project = Object.values(projects).find(project => project.name === name);
        if (project === undefined) {
            this.complexMessage.writeError([
                targetNotExistErrorMsg(name, target)
            ]);
            return false;
        }
        if (project.targets.build === undefined) {
            this.complexMessage.writeError([
                targetNotExistErrorMsg(name, target)
            ]);
            return false;
        }
        return true;
    }
}
