import { singleton } from "tsyringe";
import { ParameterTypeEnum } from "../../enum/parameter-type.enum";
import { LoggerModel } from "../../model/logger.model";
import { ParameterDtoModel } from "../../model/parameter-dto.model";
import { ValidationErrorBuilderService } from "../builder/validation-error-builder.service";

@singleton()
export class ProgramCanNotHaveValueDtoValidationService {
  constructor(private readonly validationErrorBuilder: ValidationErrorBuilderService) {}
  
  run(parameterDto: ParameterDtoModel): LoggerModel | true {
    const programs = parameterDto.parameters
      .filter(parameter => parameter.type === ParameterTypeEnum.program)
      .filter(parameter => parameter.hasValue);
    if (programs.length === 0) return true;
    return this.validationErrorBuilder.build(parameterDto, "A parameter validation error occurred!");
  }
}
