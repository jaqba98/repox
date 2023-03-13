// // todo: refactor
// import { AliasEnum, ArgumentEnum } from "../../enum/argument.enum";
// import { singleton } from "tsyringe";
// import { CommandEnum } from "../../enum/command.enum";
//
// @singleton()
// export class GetArgsForCommandService {
//   getArgs(command: CommandEnum): Array<ArgumentEnum | AliasEnum> {
//     switch (command) {
//       case CommandEnum.workspace:
//         return [ArgumentEnum.target, AliasEnum.target];
//       default:
//         return [];
//     }
//   }
// }
