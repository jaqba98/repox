// done
import { singleton } from 'tsyringe'

import { StepMessageAppService } from '@lib/logger'
// import { runCommand } from '@lib/utils'
import { type RepoxJsonDomainProjectModel, WorkspaceDomainStore } from '@lib/repox-workspace'

import { lintProjectStepMsg } from '../../const/message/step-message.const'
import { type SystemProgramEnum } from '../../enum/system-program/system-program.enum'
import { createPath } from '@lib/utils'

@singleton()
/**
 * The step dom-service is responsible for linting projects.
 */
export class LintProjectStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly workspaceDomainStore: WorkspaceDomainStore
  ) {}

  run (packageManager: SystemProgramEnum, fix: boolean, projects: string[]): boolean {
    this.stepMessage.write(lintProjectStepMsg())
    const projectsToLint = this.getProjectsToLint(projects)
    const programArg = 'eslint'
    const fixArg = fix ? '--fix' : ''
    for (const projectToLint of projectsToLint) {
      const pathArg = createPath(projectToLint.src, '**/*.ts')
      const commandToRun = `${programArg} ${pathArg} ${fixArg}`
      console.log(commandToRun)
    }
    // switch (packageManager) {
    //   case SystemProgramEnum.npm:
    //     runCommand(`npx ${command}`, true)
    //     break
    //   case SystemProgramEnum.pnpm:
    //     runCommand(`pnpm run ${command}`, true)
    //     break
    //   case SystemProgramEnum.yarn:
    //     runCommand(`yarn run ${command}`, true)
    //     break
    // }
    return true
  }

  private getProjectsToLint (projects: string[]): RepoxJsonDomainProjectModel[] {
    const { repoxJsonDomain } = this.workspaceDomainStore.getWorkspaceDomain()
    if (projects.length === 0) {
      return Object.values(repoxJsonDomain.projects)
    }
    return Object.values(repoxJsonDomain.projects)
      .filter(project => projects.includes(project.name))
  }
}
