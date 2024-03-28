import { singleton } from 'tsyringe'
import { sync } from 'command-exists'

import { type SystemProgramEnum } from '../enum/system-program/system-program.enum'

@singleton()
/**
 * The service is responsible for checking whether
 * the system program exist.
 */
export class SystemProgramExistService {
  checkExist (programName: SystemProgramEnum): boolean {
    return sync(programName)
  }
}
