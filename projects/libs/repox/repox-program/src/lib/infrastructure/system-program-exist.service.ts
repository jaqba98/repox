// done
import { singleton } from 'tsyringe'
import { sync } from 'command-exists'

import { type SystemProgramEnum } from '../enum/system-program/system-program.enum'

@singleton()
/**
 * The service is responsible for checking whether
 * the system program exist.
 */
export class SystemProgramExistService {
  checkExist (systemProgram: SystemProgramEnum): boolean {
    return sync(systemProgram)
  }
}
