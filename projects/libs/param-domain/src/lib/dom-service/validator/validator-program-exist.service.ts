import {singleton} from "tsyringe";
import {type ValidatorDomainModel} from "../../model/validator/validator-domain.model";
import {BuildParamDomainResultService} from "../builder/build-param-domain-result.service";
import {ParamDomainStoreService} from "../store/param-domain-store.service";
import {type BaseGetParamDepModel} from "@lib/model";
import {type ParamDomainValidationModel} from "../../model/param-domain/param-domain-validation.model";
import {BaseParamTypeEnum} from "../../enum/base-param-type.enum";

@singleton()
/**
 * The validator is responsible for checking
 * that given program exist.
 */
export class ValidatorProgramExistService
    implements ValidatorDomainModel {
    constructor(
        private readonly buildParamDomain: BuildParamDomainResultService,
        private readonly paramDomainStore: ParamDomainStoreService
    ) {
    }

    runValidator(_getParamDepService: BaseGetParamDepModel): ParamDomainValidationModel {
        const paramDomain = this.paramDomainStore.getParamDomain();
        if (paramDomain.program.name === BaseParamTypeEnum.unknown) {
            return this.buildParamDomain.buildError(
                [paramDomain.program.index],
                [`You have specified not existed program!`],
                [
                    `You have to specify correct program name.`,
                    `Check the documentation to get full list of programs.`
                ]
            );
        }
        return this.buildParamDomain.buildSuccess();
    }
}
