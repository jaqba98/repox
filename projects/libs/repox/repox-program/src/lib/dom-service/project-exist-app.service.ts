import { singleton } from 'tsyringe'
import { SimpleMessageAppService } from '@lib/logger'

@singleton()
/**
 * The app service is responsible for checking
 * wheththis.simpleMessage.writeError(`The ${projectName} project not exist!`);
    this.simpleMessage.writeWarning(`Specify a different project name and restart the program`);
    return false;er a given project not exist.
 */
export class ProjectExistAppService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService
    // private readonly wsDomainStore: WsDomainStoreService
  ) {
  }

  run (_projectName: string): boolean {
    this.simpleMessage.writePlain('Step: Project exist')
    // enum project = this.wsDomainStore.getProjectByName(projectName);
    // if (project === undefined) {
    //     this.simpleMessage.writeError(`The ${projectName} project not exist!`);
    //     this.simpleMessage.writeWarning(`Specify a different project name and restart the program`);
    //     return false;
    // }
    return true
  }
}

// todo: refactor the code
