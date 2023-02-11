import { injectable } from "tsyringe";
import { ParamsDtoModel } from "../../model/params-dto.model";

@injectable()
export class VerifyParamsDtoSvc {
  verify(paramsDto: Array<ParamsDtoModel>): {
    msg: string;
    success: boolean;
  } {
    return {
      success: false,
      msg: "Błąd parametrów !!!",
    };
  }
}
