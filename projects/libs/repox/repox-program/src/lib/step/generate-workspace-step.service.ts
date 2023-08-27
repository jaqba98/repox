import { singleton } from "tsyringe";
import {
  type EmptyRepoxProgramModel,
  type GenerateWorkspaceRepoxCommandModel
} from "@lib/repox-domain";
import {
  NewlineAppService,
  SimpleMessageAppService
} from "@lib/logger";
import { REPOX_LOGO } from "@lib/repox-const";
import {
  SystemProgramEnum,
  SystemProgramExistAppService
} from "@lib/program-step";
import { PathUtilsService } from "@lib/utils";

@singleton()
/**
 * The list of steps for the program generate workspace.
 */
export class GenerateWorkspaceStepService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly newline: NewlineAppService,
    private readonly systemProgramExist: SystemProgramExistAppService,
    private readonly pathUtils: PathUtilsService
    //   private readonly folderNotExist: FolderNotExistAppService,
    //   private readonly createWsStructure: CreateWsStructureAppService,
    //   private readonly initWsProject: InitWsProjectAppService
  ) {
  }

  runSteps (
    _programModel: EmptyRepoxProgramModel,
    commandModel: GenerateWorkspaceRepoxCommandModel
  ): void {
    this.simpleMessage.writeInfo(`Generate workspace`, REPOX_LOGO);
    this.newline.writeNewline();
    if (!this.systemProgramExist.run(SystemProgramEnum.node)) return;
    if (!this.systemProgramExist.run(SystemProgramEnum.npm)) return;
    if (!this.systemProgramExist.run(SystemProgramEnum.git)) return;
    const { workspaceName } = commandModel;
    const workspacePath = this.pathUtils.createPath(workspaceName);
    console.log(workspacePath);
    this.newline.writeNewline();
    this.simpleMessage.writeSuccess(`Command executed correctly`);
    // todo: I am here
    // if (!this.folderNotExist.run(workspaceName)) return;
    // if (!this.createWsStructure.run(workspaceName)) return;
    // if (!this.initWsProject.run()) return;
  }
}

// todo: refactor the file
