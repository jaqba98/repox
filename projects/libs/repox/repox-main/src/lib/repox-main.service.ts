import "reflect-metadata";
import { container, singleton } from "tsyringe";

import { LauncherAppService } from "@lib/launcher";

@singleton()
export class RepoxMainService {
  constructor(private readonly launcher: LauncherAppService) {}

  main() {
    this.launcher.run([]);
  }
}

container.resolve(RepoxMainService).main();
