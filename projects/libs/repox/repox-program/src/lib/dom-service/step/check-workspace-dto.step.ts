// done
import { container, singleton } from 'tsyringe';
import { Validator, type Schema } from 'jsonschema';

import { ComplexMessageAppService, StepMessageAppService } from '@lib/logger';
import { WorkspaceDtoStore, WorkspaceFileEnum } from '@lib/repox-workspace';

import { checkWorkspaceDtoStepMsg } from '../../const/message/step-message.const';
import { configurationFileInvalidDetailErrorMsg, configurationFileInvalidErrorMsg } from '../../const/message/error-message.const';
import { repoxJsonDtoSchema } from '../../const/schema/repox-json-dto.schema';
import { tsconfigJsonDtoSchema } from '../../const/schema/tsconfig-json-dto.schema';
import { workspacePackageJsonDtoSchema } from '../../const/schema/workspace-package-json-dto.schema';

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
    this.stepMessage.write(checkWorkspaceDtoStepMsg());
    const validator = container.resolve(Validator);
    const { repoxJsonDto, tsconfigJsonDto, workspacePackageJsonDto } = this.workspaceDtoStore;
    if (!this.checkDtoConfiguration(
      WorkspaceFileEnum.repoxJson,
      validator,
      repoxJsonDto,
      repoxJsonDtoSchema
    )) return false;
    if (!this.checkDtoConfiguration(
      WorkspaceFileEnum.tsconfigJson,
      validator,
      tsconfigJsonDto,
      tsconfigJsonDtoSchema
    )) return false;
    if (!this.checkDtoConfiguration(
      WorkspaceFileEnum.packageJson,
      validator,
      workspacePackageJsonDto,
      workspacePackageJsonDtoSchema
    )) return false;
    return true;
  }

  private checkDtoConfiguration (file: WorkspaceFileEnum, validator: Validator, instance: unknown, schema: Schema): boolean {
    const validation = validator.validate(instance, schema);
    if (validation.valid) return true;
    this.complexMessage.writeError([
      configurationFileInvalidErrorMsg(file),
      ...validation.errors.map(errror => configurationFileInvalidDetailErrorMsg(errror.property, errror.message))
    ]);
    return false;
  }
}
