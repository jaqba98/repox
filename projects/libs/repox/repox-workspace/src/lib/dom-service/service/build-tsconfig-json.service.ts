import {
    type TsconfigJsonDtoModel
} from "../../model/dto/tsconfig-json-dto.model";
import {singleton} from "tsyringe";
import {ArrayUtilsService, FileUtilsService, PathUtilsService} from "@lib/utils";
import {
    type PackageJsonDtoModel
} from "../../model/dto/package-json-dto.model";
import {BuildProjectAliasService} from "@lib/repox-workspace";

@singleton()
/**
 * The service is responsible for create tsconfig.json
 * content.
 */
export class BuildTsconfigJsonService {
    constructor(
        private readonly fileUtils: FileUtilsService,
        private readonly pathUtils: PathUtilsService,
        private readonly buildProjectAlias: BuildProjectAliasService,
        private readonly arrayUtils: ArrayUtilsService
    ) {
    }

    rebuild(wsTsconfigDto: TsconfigJsonDtoModel): TsconfigJsonDtoModel {
        return {
            ...(wsTsconfigDto ?? {}),
            ...this.build(),
            compilerOptions: {
                ...(wsTsconfigDto.compilerOptions ?? {}),
                ...this.build().compilerOptions,
            },
            // exclude: this.arrayUtils.removeDuplicates([
            //     ...(wsTsconfigDto.exclude ?? []),
            //     ...this.build().exclude
            // ])
        };
    }

    build(): TsconfigJsonDtoModel {
        return <TsconfigJsonDtoModel>{}
        // return {
        //     compilerOptions: {
        //         skipLibCheck: true,
        //         baseUrl: `.`,
        //         sourceMap: true,
        //         paths: this.getTsconfigPath()
        //     },
        //     exclude: [
        //         `node_modules`,
        //         `**/*.spec.ts`,
        //         `**/*.test.ts`,
        //         `**/jest.config.ts`
        //     ]
        // };
    }

    private getTsconfigPath(): { [key: string]: string[] } {
        return this.fileUtils
            .getAllFiles(`./projects`, `**/package.json`)
            .map(packageJsonPath => this.pathUtils.createPath(`projects`, packageJsonPath))
            .map(packageJson => ({packageJson, projectType: this.getProjectTypeByProjectPath(packageJson)}))
            .filter(project => project.projectType !== `app`)
            .map(project => ({
                ...project,
                projectName: this.fileUtils.readJsonFile<PackageJsonDtoModel>(project.packageJson).name
            }))
            .map(project => ({
                ...project,
                // projectAlias: this.buildProjectAlias.buildAlias(project.projectName, project.projectType, `@`)
                projectAlias: ""
            }))
            .map(project => ({
                ...project,
                indexPath: this.pathUtils.createPath(project.packageJson, `../src/index.ts`)
            }))
            .filter(project => this.pathUtils.existPath(project.indexPath))
            .reduce((acc, curr) => {
                acc = {...acc, [curr.projectAlias]: [curr.indexPath]};
                return acc;
            }, {});
    }

    private getProjectTypeByProjectPath(
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