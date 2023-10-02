import {singleton} from "tsyringe";
import {type ValidatorDomainModel} from "../../model/validator/validator-domain.model";
import {BuildParamDomainResultService} from "../builder/build-param-domain-result.service";
import {ParamDomainStoreService} from "../store/param-domain-store.service";
import {type BaseGetParamDepModel} from "@lib/model";
import {type ParamDomainValidationModel} from "../../model/param-domain/param-domain-validation.model";
import {type ParamDomainDepModel} from "@lib/param-domain";

@singleton()
/**
 * The validator is responsible for checking that the given program
 * contains all required arguments.
 */
export class ValidatorProgramContainsArgumentsService
    implements ValidatorDomainModel {
    constructor(
        private readonly buildParamDomain: BuildParamDomainResultService,
        private readonly paramDomainStore: ParamDomainStoreService
    ) {
    }

    runValidator(getParamDepService: BaseGetParamDepModel): ParamDomainValidationModel {
        const paramDomain = this.paramDomainStore.getParamDomain();
        const programName = paramDomain.program.name;
        const programDep: ParamDomainDepModel = getParamDepService
            .getDependency(programName);
        const programArgs = programDep.args;
        const wrongArgs = Object.values(programArgs)
            .filter(programArg => programArg.required)
            .filter(programArg => paramDomain.program.args
                .find(arg => arg.name === programArg.name) == null
            );
        if (wrongArgs.length === 0) {
            return this.buildParamDomain.buildSuccess();
        }
        const missingArgs = wrongArgs.map(arg => arg.name).join(`,`);
        return this.buildParamDomain.buildError(
            [],
            [`You have not specified all required arguments for program!`],
            [
                `You have to specify required arguments.`,
                `Missing arguments for program are: ${missingArgs}`
            ]
        );
    }
}
