import { singleton } from 'tsyringe'
import { NewlineAppService, SimpleMessageAppService } from '@lib/logger'
import { PathUtilsService } from '@lib/utils'

@singleton()
/**
 * The app service is responsible for checking whether the
 * file exist.
 */
export class FileExistAppService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly pathUtils: PathUtilsService,
    private readonly newline: NewlineAppService
  ) {
  }

  run (filePath: string): boolean {
    this.simpleMessage.writePlain(`Step: File Exist >>> ${filePath}`)
    if (this.pathUtils.existPath(filePath)) {
      return true
    }
    this.newline.writeNewline()
    this.simpleMessage.writeError(`The file ${filePath} does not exist`)
    return false
  }
}

// todo: refactor the code
