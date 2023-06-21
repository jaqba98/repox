// Refactored file
import { singleton } from "tsyringe";
import {
  ChangePathService
} from "../infrastructure/change-path.service";
import { path } from "app-root-path";

@singleton()
/**
 * The app service is responsible for going to the project root.
 */
export class GoToProjectRootAppService {
  constructor(private readonly changePath: ChangePathService) {
  }

  goToRoot(): boolean {
    this.changePath.change(path);
    return true;
  }
}
// todo: refactor
