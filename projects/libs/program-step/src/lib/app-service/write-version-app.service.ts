import { singleton } from 'tsyringe'

import { SimpleMessageAppService } from '@lib/logger'

@singleton()
/**
 * The app service is responsible for writing version on the console screen.
 */
export class WriteVersionAppService {
  constructor (private readonly simpleMessage: SimpleMessageAppService) {
  }

  write (version: string): void {
    this.simpleMessage.writePlain(version)
  }
}
