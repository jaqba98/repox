import {
  type WsTsconfigDtoModel
} from "../../model/ws-dto/ws-tsconfig-dto.model";
import { singleton } from "tsyringe";
import { FileUtilsService, PathUtilsService } from "@lib/utils";
import {
  type WsPackageJsonDtoModel
} from "../../model/ws-dto/ws-package-json-dto.model";

@singleton()
/**
 * The service is responsible for create tsconfig.json
 * content.
 */
export class BuildTsconfigJsonService {
  constructor (
    private readonly fileUtils: FileUtilsService,
    private readonly pathUtils: PathUtilsService
  ) {
  }

  build (): WsTsconfigDtoModel {
    return {
      compilerOptions: {
        target: `ES2022`,
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        module: `commonjs`,
        rootDir: `./projects`,
        outDir: `./dist`,
        esModuleInterop: true,
        forceConsistentCasingInFileNames: true,
        strict: true,
        skipLibCheck: true,
        baseUrl: `.`,
        sourceMap: true,
        paths: this.getTsconfigPath()
      },
      exclude: [
        `node_modules`,
        `**/*.spec.ts`,
        `**/*.test.ts`,
        `**/jest.config.ts`
      ]
    };
  }

  private getTsconfigPath (): { [key: string]: string[] } {
    return this.fileUtils
      .getAllFiles(`./projects`, `**/package.json`)
      .map(packageJsonPath =>
        this.pathUtils.createPath(`projects`, packageJsonPath)
      )
      .map(packageJson => ({
        packageJson,
        projectType: this.getProjectType(packageJson)
      }))
      .filter(project => project.projectType !== `app`)
      .map(project => ({
        ...project,
        projectName: this.fileUtils
          .readJsonFile<WsPackageJsonDtoModel>(project.packageJson)
          .name
      }))
      .map(project => ({
        ...project,
        projectAlias: `@${project.projectType}/${project.projectName}`
      }))
      .map(project => ({
        ...project,
        indexPath: this.pathUtils.createPath(
          project.packageJson, `../src/index.ts`
        )
      }))
      .reduce((acc, curr) => {
        acc = { ...acc, [curr.projectAlias]: [curr.indexPath] };
        return acc;
      }, {});
  }

  private getProjectType (
    packageJsonPath: string
  ): `app` | `lib` | `tool` {
    if (packageJsonPath.startsWith(`projects/apps`)) {
      return `app`;
    }
    if (packageJsonPath.startsWith(`projects/libs`)) {
      return `lib`;
    }
    if (packageJsonPath.startsWith(`projects/tools`)) {
      return `tool`;
    }
    throw new Error(`Not supported project type!`);
  }
}
