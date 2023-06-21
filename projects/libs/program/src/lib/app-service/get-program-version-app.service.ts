import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import {
  GetNpmPackageFileService,
  ReadFileService
} from "@lib/utils";
import { PackageJsonModel } from "@lib/domain";

@singleton()
/**
 * The app service is responsible for display current version.
 */
export class GetProgramVersionAppService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly getNpmPackageFile: GetNpmPackageFileService,
    private readonly readFile: ReadFileService
  ) {
  }

  getProgramVersion(): void {
    const packageJson = this.getNpmPackageFile.getPackageJsonPath();
    const packageJsonFile = this.readFile.readJson<PackageJsonModel>(
      packageJson
    );
    this.simpleMessage.writeInfo(
      packageJsonFile.version, 0, false, true, "VERSION"
    );
  }
}
// todo: refactor
