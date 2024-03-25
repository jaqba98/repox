import { type ProgramModel } from '@lib/model'
import { singleton } from 'tsyringe'
import { PublishNpmStepService } from './publish-npm-step.service'
import { type EmptyRepoxProgramModel, type PublishNpmRepoxCommandModel } from '@lib/repox-domain'

@singleton()
/**
 * The start point of the program publish npm.
 */
export class PublishNpmProgramService implements ProgramModel {
  constructor (private readonly step: PublishNpmStepService) {
  }

  runProgram (programDomain: unknown, commandDomain: unknown): void {
    this.step.runSteps(
      programDomain as EmptyRepoxProgramModel,
      commandDomain as PublishNpmRepoxCommandModel
    )
  }
}

// todo: refactor the code
