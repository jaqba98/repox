import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { RunCommandUtilsService } from "@lib/utils";

@singleton()
/**
 * The app service is responsible for init workspace project
 * with all required dependencies.
 */
export class InitWsProjectAppService {
  constructor (
    private readonly simpleMessage: SimpleMessageAppService,
    private readonly runCommand: RunCommandUtilsService
  ) {
  }

  run (): boolean {
    this.simpleMessage.writePlain("Init workspace project");
    // Init npm project
    this.simpleMessage.writePlain("Init npm project");
    this.runCommand.runCommand("npm init -y");
    // Install dependencies
    this.simpleMessage.writePlain("Install dependencies");
    this.runCommand.runCommand("npm i @types/jest -D");
    this.runCommand.runCommand("npm i @types/node -D");
    this.runCommand.runCommand("npm i @typescript-eslint/eslint-plugin -D");
    this.runCommand.runCommand("npm i eslint -D");
    this.runCommand.runCommand("npm i eslint-config-standard-with-typescript -D");
    this.runCommand.runCommand("npm i eslint-plugin-import -D");
    this.runCommand.runCommand("npm i eslint-plugin-n -D");
    this.runCommand.runCommand("npm i eslint-plugin-promise -D");
    this.runCommand.runCommand("npm i htmlpro -D");
    this.runCommand.runCommand("npm i jest -D");
    this.runCommand.runCommand("npm i repox -D");
    this.runCommand.runCommand("npm i ts-jest -D");
    this.runCommand.runCommand("npm i tsc-alias -D");
    this.runCommand.runCommand("npm i typescript -D");
    // Init Eslint
    this.runCommand.runNpxCommand("eslint --init --ext .ts");
    // Init git repository
    this.simpleMessage.writePlain("Init git repository");
    this.runCommand.runCommand("git init");
    this.runCommand.runCommand("git add .");
    this.runCommand.runCommand("git commit -q -m \"init commit\"");
    return true;
  }
}
