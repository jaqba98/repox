import { injectable } from "tsyringe";

@injectable()
/*
  Service responsible for validate the parameters
  from command line.
*/
export class ValidationParametersService {
  constructor() {}

  preValidation(argv: Array<string>): void {}
}
