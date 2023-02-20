import { singleton } from "tsyringe";
import { ParameterDtoModel } from "../../model/parameter-dto.model";
import {
  ParameterDtoValidationModel
} from "../../model/parameter-dto-validation.model";
import { EOL } from "os";
import { FG_RED, RESET, UNDERSCORE } from "../../const/color.const";
import { BaseMessageBuilderService } from "./base-message-builder.service";

@singleton()
/**
 * The builder responsible for building the error message for validation of
 * parameter dto.
 */
export class ParameterDtoErrorBuilderService {
  constructor(private readonly baseMessageBuilder: BaseMessageBuilderService) {
  }

  build(
    parameterDto: ParameterDtoModel,
    validationDto: ParameterDtoValidationModel
  ): string {
    const header = this.baseMessageBuilder.buildErrorHeader("Wrong command!");
    const errors = validationDto.errors
      .map(error => this.baseMessageBuilder.buildError(error))
      .join(EOL);
    const tips = validationDto.tips
      .map(tip => this.baseMessageBuilder.buildTip(tip))
      .join(EOL);
    return `
${header}

${this.buildErrorCommand(parameterDto, validationDto)}

${errors}

${tips}
`;
  }

  private buildErrorCommand(
    parameterDto: ParameterDtoModel,
    validationDto: ParameterDtoValidationModel
  ): string {
    const command = parameterDto.parameters
      .map(parameter => validationDto.wrongIndexes.includes(parameter.index) ?
        `${UNDERSCORE}${parameter.baseParameter}` : parameter.baseParameter
      )
      .map(baseParameter => `${FG_RED}${baseParameter}${RESET}`)
      .join(" ");
    return `${FG_RED}> repox${RESET} ${command}${RESET}`;
  }
}
