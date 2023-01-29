import { injectable } from "tsyringe";

@injectable()
export class ValidationParametersService {
    preValidation(argv: Array<string>): void {
    }
}
