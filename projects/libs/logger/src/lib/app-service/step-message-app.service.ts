import { singleton } from 'tsyringe';

import {
  BuildSimpleMessageService
} from '../dom-service/builder/build-simple-message.service';
import { WriteMessageService } from '../infrastructure/write-message.service';

@singleton()
/**
 * The app service is responsible for displaying simple message
 * on the console screen.
 */
export class StepMessageAppService {
  constructor (
    private readonly buildMessage: BuildSimpleMessageService,
    private readonly writeMessage: WriteMessageService
  ) {
  }

  write (message: string): void {
    const outputMessage = this.buildMessage.buildPlain(`Step >>> ${message} <<<`);
    this.writeMessage.write(outputMessage);
  }
}
