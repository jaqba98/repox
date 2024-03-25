import { singleton } from 'tsyringe'
import { SimpleMessageAppService } from '@lib/logger'
import { RunCommandUtilsService } from '@lib/utils'

@singleton()
/**
 * The app service is responsible for init workspace project
 * with all required dependencies.
 */
export class InitWsProjectAppService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly runCommand: RunCommandUtilsService
  ) {
  }

  run (): boolean {
    this.simpleMessage.writePlain('Init workspace project')
    // Init npm project
    this.simpleMessage.writePlain('Init npm project')
    this.runCommand.runCommand('npm init -y')
    // Install dependencies
    this.simpleMessage.writePlain('Install dependencies')
    this.runCommand.runCommand('npm i @types/jest@29.5.3 -D')
    this.runCommand.runCommand('npm i @types/node@20.4.6 -D')
    this.runCommand.runCommand('npm i @typescript-eslint/eslint-plugin@5.62.0 -D')
    this.runCommand.runCommand('npm i eslint@8.46.0 -D')
    this.runCommand.runCommand('npm i eslint-config-standard-with-typescript@37.0.0 -D')
    this.runCommand.runCommand('npm i eslint-plugin-import@2.28.0 -D')
    this.runCommand.runCommand('npm i eslint-plugin-n@16.0.1 -D')
    this.runCommand.runCommand('npm i eslint-plugin-promise@6.1.1 -D')
    this.runCommand.runCommand('npm i htmlpro@1.1.11 -D')
    this.runCommand.runCommand('npm i jest@29.6.2 -D')
    this.runCommand.runCommand('npm i repox@1.4.53 -D')
    this.runCommand.runCommand('npm i ts-jest@29.1.1 -D')
    this.runCommand.runCommand('npm i ts-node@10.9.1 -D')
    this.runCommand.runCommand('npm i tsc-alias@1.8.7 -D')
    this.runCommand.runCommand('npm i typescript@5.1.6 -D')
    // Init Eslint
    this.runCommand.runNpxCommand('npm init @eslint/config')
    // Init git repository
    this.simpleMessage.writePlain('Init git repository')
    this.runCommand.runCommand('git config --global core.autocrlf false')
    this.runCommand.runCommand('git init')
    this.runCommand.runCommand('git add .')
    this.runCommand.runCommand('git commit -q -m "init commit"')
    return true
  }
}

// todo: refactor the code
