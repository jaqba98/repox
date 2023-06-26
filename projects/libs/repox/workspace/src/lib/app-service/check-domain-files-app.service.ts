import { singleton } from "tsyringe";
import { PathUtilsService } from "@lib/utils";
import { DomainFileEnum } from "../enum/domain/domain-file.enum";

@singleton()
/**
 * The app service is responsible for checking
 * whether the domain files exist.
 */
export class CheckDomainFilesAppService {
  constructor(private readonly pathUtils: PathUtilsService) {
  }

  checkFilesExist(): boolean {
    if (this.pathUtils.notExistPath(DomainFileEnum.domainJson)) {
      return false;
    }
    if (this.pathUtils.notExistPath(DomainFileEnum.tsconfigJson)) {
      return false;
    }
    return true;
  }
}
