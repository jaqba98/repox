import { singleton } from "tsyringe";
import {
  DefaultProgramArgsModel, EmptyProgramArgsModel,
  ProgramArgModel
} from "../../model/argument/program-arg.model";
import {
  CommandArgModel,
  EmptyCommandArgsModel,
  ProjectCommandArgsModel,
  WorkspaceCommandArgsModel
} from "../../model/argument/command-arg.model";
import { ParamDtoEntityModel } from "@lib/param-dto";
import { ProgramEnum } from "../../enum/program.enum";
import { CommandEnum } from "../../enum/command.enum";

@singleton()
/**
 *
 */
export class BuildParamModelService {
  buildProgramModel(
    programName: ProgramEnum,
    model: Array<ParamDtoEntityModel>
  ): ProgramArgModel {
    switch (programName) {
      case ProgramEnum.default:
        return <EmptyProgramArgsModel>{}
      case ProgramEnum.generate:
        return <DefaultProgramArgsModel>{
          version: false
        }
      default:
        throw new Error("Not supported program name!");
    }
  }

  buildCommandModel(
    commandName: CommandEnum,
    model: Array<ParamDtoEntityModel>
  ): CommandArgModel {
    switch (commandName) {
      case CommandEnum.default:
        return <EmptyCommandArgsModel>{}
      case CommandEnum.workspace:
        return <WorkspaceCommandArgsModel>{
          name: ""
        }
      case CommandEnum.project:
        return <ProjectCommandArgsModel>{
          name: "",
          type: ""
        }
      default:
        throw new Error("Not supported program name!");
    }
  }
}
