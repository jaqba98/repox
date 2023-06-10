import { singleton } from "tsyringe";
import { ProjectTypeEnum } from "@lib/project";
// import {
//   TsconfigStoreService
// } from "../dom-service/store/tsconfig-store.service";

@singleton()
/**
 * The app service is responsible for load, save, update
 * the tsconfig configuration.
 */
export class TsconfigDomainAppService {
  // constructor(
  //   private readonly tsconfigStore: TsconfigStoreService
  // ) {
  // }

  loadTsconfigConfig(): void {
    // this.tsconfigStore.loadConfig();
  }

  saveTsconfigConfig(): void {
    // this.tsconfigStore.saveConfig();
  }

  addPath(
    name: string, type: ProjectTypeEnum, path: string
  ): void {
    // this.tsconfigStore.addPath(name, type, path);
  }
}
// todo: refactor