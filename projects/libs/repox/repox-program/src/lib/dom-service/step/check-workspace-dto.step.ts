import { container, singleton } from 'tsyringe'
import { Validator, type Schema } from 'jsonschema'

import { ComplexMessageAppService, StepMessageAppService } from '@lib/logger'
import { WorkspaceDtoStore, WorkspaceFileEnum } from '@lib/repox-workspace'

import { checkWorkspaceDtoStepMsg } from '../../const/message/step-message.const'
import { configurationFileInvalidErrorMsg } from '../../const/message/error-message.const'

const repoxJsonDtoSchema: Schema = {
  id: '/RepoxJsonDto',
  type: 'object',
  properties: {
    defaultOptions: {
      type: 'object'
    },
    projects: {
      type: 'object'
    }
  },
  required: [
    'defaultOptions',
    'projects'
  ]
}

@singleton()
/**
 * The step dom-service is responsible for
 * checking workspace dto model.
 */
export class CheckWorkspaceDtoStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly workspaceDtoStore: WorkspaceDtoStore,
    private readonly complexMessage: ComplexMessageAppService
  ) {}

  run (): boolean {
    this.stepMessage.write(checkWorkspaceDtoStepMsg())
    const validator = container.resolve(Validator)
    const { repoxJsonDto } = this.workspaceDtoStore
    if (!this.checkDtoConfiguration(WorkspaceFileEnum.repoxJson, validator, repoxJsonDto, repoxJsonDtoSchema)) return false
    return true
  }

  private checkDtoConfiguration (file: WorkspaceFileEnum, validator: Validator, instance: unknown, schema: Schema): boolean {
    const validation = validator.validate(instance, schema)
    if (validation.valid) return true
    this.complexMessage.writeError([
      configurationFileInvalidErrorMsg(file),
      ...validation.errors.map(errror => errror.message)
    ])
    return false
  }
}
