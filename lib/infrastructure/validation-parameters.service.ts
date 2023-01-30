import { injectable } from "tsyringe";
import { ValidationPrimitiveService } from "../utils/validation/validation-primitive.service";
import { ValidationValueService } from "../utils/validation/validation-value.service";

@injectable()
/*
  Service responsible for validate the parameters
  from command line.
*/
export class ValidationParametersService {
  constructor(
    private readonly valPrimitive: ValidationPrimitiveService,
    private readonly valValue: ValidationValueService
  ) {}

  preValidation(argv: Array<string>): void {
    this.valPrimitive.isArray(argv, "List of arguments have to be array!");
    this.valValue.isArrayOfString(
      argv,
      "List of arguments can contain only strings!"
    );
  }
}
