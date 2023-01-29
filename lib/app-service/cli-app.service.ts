import { injectable } from "tsyringe";
import { ReadParametersService } from "../infrastructure/read-parameters.service";

@injectable()
/*
    The main application service that is responsible for
    managing the main flow of the application.
*/
export class CliAppService {
    constructor(private readonly readParameters: ReadParametersService) {}

    run(): void {
        const params = this.readParameters.read();
        console.log(params);
    }
}
