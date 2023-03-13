// // todo: refactor
// import { singleton } from "tsyringe";
// import { ProgramEnum } from "../../enum/program.enum";
// import { AliasEnum, ArgumentEnum } from "../../enum/argument.enum";
// import { CommandEnum } from "../../enum/command.enum";
//
// @singleton()
// export class GetRequiredArgsForCommandService {
//   getRequiredArgs(command: CommandEnum): Array<{
//     argument: ArgumentEnum,
//     alias: AliasEnum
//   }> {
//     switch (command) {
//       case CommandEnum.workspace:
//         return [
//           {
//             argument: ArgumentEnum.target,
//             alias: AliasEnum.target
//           }
//         ];
//       default:
//         return [];
//     }
//   }
// }
