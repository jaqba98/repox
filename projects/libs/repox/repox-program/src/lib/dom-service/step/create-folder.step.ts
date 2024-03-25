import { singleton } from 'tsyringe'

import { ComplexMessageAppService, StepMessageAppService } from '@lib/logger'
import { createFolder, pathNotExist } from '@lib/utils'

import { createFolderStepMsg } from '../../const/message/step-message.const'
import { failedToCreateFolderErrorMsg } from '../../const/message/error-message.const'
import {
  specifiedFolderThatExistOnDiskWarningMsg,
  specifyDifferentFolderNameWarningMsg
} from '../../const/message/warning-message.const'

@singleton()
/**
 * The step service is responsible for creating a folder.
 */
export class CreateFolderStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly complexMessage: ComplexMessageAppService
  ) {
  }

  run (folderPath: string): boolean {
    this.stepMessage.write(createFolderStepMsg(folderPath))
    if (pathNotExist(folderPath)) {
      createFolder(folderPath)
      return true
    }
    this.complexMessage.writeError([
      failedToCreateFolderErrorMsg(folderPath)
    ])
    this.complexMessage.writeWarning([
      specifiedFolderThatExistOnDiskWarningMsg(),
      specifyDifferentFolderNameWarningMsg()
    ])
    return false
  }
}
