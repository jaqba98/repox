import { injectable } from "tsyringe";
import { ValidationParametersService } from "../validation/validation-parameters.service";

@injectable()
/*
    Service responsible for get parameters from command line
    and process and verification their.
*/
export class ReadParametersService {
    constructor(private readonly validationParameters: ValidationParametersService) {}

    read(): Array<string> {
        const { argv } = process;
        return argv;
    }
}
