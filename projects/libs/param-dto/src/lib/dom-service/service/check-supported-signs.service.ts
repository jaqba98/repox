import { singleton } from 'tsyringe'

@singleton()
/**
 * The service is responsible for checking whether value has only supported signs.
 */
export class CheckSupportedSignsService {
  /**
     * Supported signs for name: a-z A-Z 0-9 -
     */
  checkName (name: string): boolean {
    return /^[a-zA-Z0-9-]*$/.test(name)
  }
}
