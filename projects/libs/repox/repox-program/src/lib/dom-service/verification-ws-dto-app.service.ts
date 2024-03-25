import { singleton } from 'tsyringe'
import { SimpleMessageAppService } from '@lib/logger'

@singleton()
/**
 * The app service is responsible for verification workspace dto model.
 */
export class VerificationWsDtoAppService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService
    // private readonly wsDtoStore: WsDtoStoreService
  ) {
  }

  run (): boolean {
    this.simpleMessage.writePlain('Step: Verification WS dto')
    // enum verifyRepoxDto = this.wsDtoStore.verifyWsRepoxDto();
    // if (verifyRepoxDto.errors.length > 0) {
    //     this.simpleMessage.writeError(`Incorrect content of ${"WorkspaceFileEnum.repoxJsonFile"} file`);
    //     verifyRepoxDto.errors.forEach(error => this.simpleMessage.writeError(error.toString()));
    //     return false;
    // }
    // enum verifyTsconfigDto = this.wsDtoStore.verifyWsTsconfigDto();
    // if (verifyTsconfigDto.errors.length > 0) {
    //     this.simpleMessage.writeError(`Incorrect content of ${"WorkspaceFileEnum.tsconfigJsonFile"} file`);
    //     verifyTsconfigDto.errors.forEach(error => this.simpleMessage.writeError(error.toString()));
    //     return false;
    // }
    return true
  }
}

// todo: refactor the code
