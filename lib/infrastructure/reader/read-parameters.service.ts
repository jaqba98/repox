import { injectable } from "tsyringe";

@injectable()
export class ReadParametersService {
    read(): Array<string> {
        return process.argv;
    }
}
