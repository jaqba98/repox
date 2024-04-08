// done
import { singleton } from 'tsyringe';

import { StepMessageAppService, ComplexMessageAppService } from '@lib/logger';
import { WorkspaceDomainStore } from '@lib/repox-workspace';

import { SystemProgramUrlEnum } from '../../enum/system-program/system-program-url.enum';
import { systemProgramDoesNotExistErrorMsg } from '../../const/message/error-message.const';
import { systemProgramExistStepMsg } from '../../const/message/step-message.const';
import { installSystemProgramAndRunAgainWarningMsg, visitSystemProgramPageWarningMsg } from '../../const/message/warning-message.const';
import { SystemProgramExistService } from '../../infrastructure/system-program-exist.service';

@singleton()
/**
 * The step dom-service is responsible for checking
 * whether the package manager exist.
 */
export class PackageManagerExistStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly systemProgramExist: SystemProgramExistService,
    private readonly complexMessage: ComplexMessageAppService,
    private readonly workspaceDomainStore: WorkspaceDomainStore
  ) {}

  run (): boolean {
    const workspaceDomain = this.workspaceDomainStore.getWorkspaceDomain();
    const { packageManager } = workspaceDomain.repoxJsonDomain.defaultOptions;
    this.stepMessage.write(systemProgramExistStepMsg(packageManager));
    if (this.systemProgramExist.checkExist(packageManager)) return true;
    const url = SystemProgramUrlEnum[packageManager].toString();
    this.complexMessage.writeError([
      systemProgramDoesNotExistErrorMsg(packageManager)
    ]);
    this.complexMessage.writeWarning([
      installSystemProgramAndRunAgainWarningMsg(packageManager),
      visitSystemProgramPageWarningMsg(packageManager, url)
    ]);
    return false;
  }
}
