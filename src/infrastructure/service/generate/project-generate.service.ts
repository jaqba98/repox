import { singleton } from "tsyringe";
import {
  msgCommandExecutedMessageInfo
} from "../builder/message/info-msg-builder.service";
import { ExecCommandService } from "../exec/exec-command.service";
import { WriteLogService } from "../writer/write-log.service";
import { WriteFileService } from "../writer/write-file.service";
import { DomainModel } from "../../../model/domain/domain.model";
import { ReadFileService } from "../reader/read-file.service";

@singleton()
/**
 * The service is responsible for run the shell command
 * in order to generate the project.
 */
export class ProjectGenerateService {
  constructor(
    private readonly execCommand: ExecCommandService,
    private readonly log: WriteLogService,
    private readonly writeFile: WriteFileService,
    private readonly readFile: ReadFileService
  ) {
  }

  generate(name: string, type: 'app' | 'lib' | 'tool'): void {
    const folder = this.getFolderByType(type);
    this.execCommand.cd(folder);
    this.execCommand.createFolder(name);
    this.execCommand.cd(name);
    this.execCommand.exec("npm init -y");
    this.execCommand.cd("../../");
    const repoxJson = this.readFile.readJsonFile<DomainModel>("repox.json");
    this.writeFile.writeJsonFile<DomainModel>("repox.json", {
      version: repoxJson.version,
      projects: {
        ...repoxJson.projects,
        [name]: {
          name: name,
          type: type,
          path: `${folder}/${name}`
        }
      }
    });
    this.log.message(
      msgCommandExecutedMessageInfo(`Created the ${name} ${type} project`)
    );
  }

  private getFolderByType(type: "app" | "lib" | "tool"): string {
    if (type === "app") return "apps";
    if (type === "lib") return "libs";
    if (type === "tool") return "tools";
    throw new Error("Error");
  }
}
// todo: fix it
