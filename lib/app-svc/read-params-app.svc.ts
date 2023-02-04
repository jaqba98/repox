import { injectable } from "tsyringe";
import { ReadParamsSvc } from "../infra/svc/reader/read-params.svc";

@injectable()
export class ReadParamsAppSvc {
  constructor(private readonly readParams: ReadParamsSvc) {}

  run(): any {
    const params = this.readParams.read();
    // TODO: Verify DTO model
    // TODO: Build the domain model from DTO model
    // TODO: Verify the domain model
    // TODO: Return the domain model
    return params;
  }
}
