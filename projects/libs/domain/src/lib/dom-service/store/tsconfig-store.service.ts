// import { singleton } from "tsyringe";
// import { ReadFileService, WriteFileService } from "@lib/utils";
// import { ProjectTypeEnum } from "@lib/project";
// import {
//   TsconfigDomainModel
// } from "../../model/tsconfig-domain.model";
//
// @singleton()
// /**
//  * The base-base-store of tsconfig configuration, which is used to read,
//  * write and modify the tsconfig configuration.
//  */
// export class TsconfigStoreService {
//   private store: TsconfigDomainModel | undefined;
//
//   constructor(
//     private readonly readFile: ReadFileService,
//     private readonly writeFile: WriteFileService
//   ) {
//     this.store = {
//       compilerOptions: {
//         paths: {}
//       }
//     };
//   }
//
//   loadConfig(): void {
//     this.store = this.readFile.readJson<TsconfigDomainModel>(
//       "tsconfig.json"
//     );
//   }
//
//   saveConfig(): void {
//     this.writeFile.writeJson("tsconfig.json", this.store);
//   }
//
//   addPath(
//     name: string, type: ProjectTypeEnum, path: string
//   ): void {
//     const alias = `@${type}/${name}`;
//     this.store.compilerOptions.paths[alias] = [path];
//   }
// }
// // todo: refactor