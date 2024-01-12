import {container} from "tsyringe";
import {BuildParamDtoAppService} from "./build-param-dto-app.service";
import {ParamDtoStoreService} from "../dom-service/store/param-dto-store.service";
import {ParamDtoValidationModel} from "../model/param-dto-validation.model";
import {ParamDtoModel} from "../model/param-dto.model";

const runTest = (argv: string[]): {
  paramDto: ParamDtoModel;
  paramDtoValidation: ParamDtoValidationModel;
} => {
  const store = container.resolve(ParamDtoStoreService);
  const service = container.resolve(BuildParamDtoAppService);
  process.argv = [`executor`, `application`, ...argv];
  service.build();
  return {
    paramDto: store.getParamDto(),
    paramDtoValidation: store.getParamDtoValidation()
  };
};

afterAll((): void => {
  container.clearInstances();
  container.reset();
});

describe(`BuildParamDtoAppService - parameter order`, (): void => {
  test(`Should be correct for the program: name`, (): void => {
    expect(runTest([]).paramDtoValidation.success).toBeTruthy();
  });

  test(`Should be correct for the program: name -v`, (): void => {
    expect(runTest([`-v`]).paramDtoValidation.success).toBeTruthy();
  });

  test(`Should be correct for the program: name g`, (): void => {
    expect(runTest([`g`]).paramDtoValidation.success).toBeTruthy();
  });

  test(`Should be correct for the program: name g -c`, (): void => {
    expect(runTest([`g`, `-c`]).paramDtoValidation.success).toBeTruthy();
  });

  test(`Should be correct for the program: name -v -c`, (): void => {
    expect(runTest([`-v`, `-c`]).paramDtoValidation.success).toBeTruthy();
  });

  test(`Should be incorrect for the program: name -v g`, (): void => {
    expect(runTest([`-v`, `g`]).paramDtoValidation.success).toBeFalsy();
  });

  test(`Should be incorrect for the program: name -v g -c`, (): void => {
    expect(runTest([`-v`, `g`, `-c`]).paramDtoValidation.success).toBeFalsy();
  });

  test(`Should be correct for the program: name g w`, (): void => {
    expect(runTest([`g`, `w`]).paramDtoValidation.success).toBeTruthy();
  });

  test(`Should be correct for the program: name g w -t=test`, (): void => {
    expect(runTest([`g`, `w`, `-t=test`]).paramDtoValidation.success).toBeTruthy();
  });

  test(`Should be correct for the program: name g -c -t`, (): void => {
    expect(runTest([`g`, `-c`, `-t`]).paramDtoValidation.success).toBeTruthy();
  });

  test(`Should be correct for the program: name g -c w`, (): void => {
    expect(runTest([`g`, `-c`, `w`]).paramDtoValidation.success).toBeTruthy();
  });

  test(`Should be correct for the program: name g -c w -n`, (): void => {
    expect(runTest([`g`, `-c`, `w`, `-n`]).paramDtoValidation.success).toBeTruthy();
  });
});

describe(`BuildParamDtoAppService - parameter structure`, (): void => {
  test(`Should be correct for the program: name`, (): void => {
    const result = runTest([]);
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
  });

  test(`Should be correct for the program: name g`, (): void => {
    const result = runTest([`generate`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[2];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`generate`);
    expect(paramIndex).toEqual(2);
    expect(paramType).toEqual(`program`);
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`generate`);
    expect(paramValues).toEqual([]);
  });

  test(`should be incorrect for the program: name gener%%a_&te`, (): void => {
    const result = runTest([`gener%%a_&te`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[2];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([2]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for gener%%a_&te are: [a-Z] [0-9] [-]`]);
    expect(paramBaseValue).toEqual(`gener%%a_&te`);
    expect(paramIndex).toEqual(2);
    expect(paramType).toEqual(`program`);
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`gener%%a_&te`);
    expect(paramValues).toEqual([]);
  });

  test(`should be correct for the program: name generate-workspace`, (): void => {
    const result = runTest([`generate-workspace`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[2];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`generate-workspace`);
    expect(paramIndex).toEqual(2);
    expect(paramType).toEqual(`program`);
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`generate-workspace`);
    expect(paramValues).toEqual([]);
  });

  test(`should be incorrect for the program: name generate=true`, (): void => {
    const result = runTest([`generate=true`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[2];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([2]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for generate=true are: [a-Z] [0-9] [-]`]);
    expect(paramBaseValue).toEqual(`generate=true`);
    expect(paramIndex).toEqual(2);
    expect(paramType).toEqual(`program`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`generate`);
    expect(paramValues).toEqual([`true`]);
  });

  test(`should be correct for the program: name generate workspace`, (): void => {
    const result = runTest([`generate`, `workspace`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`workspace`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`command`);
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`workspace`);
    expect(paramValues).toEqual([]);
  });

  test(`should be incorrect for the program: name generate work$$sp&&*ace`, (): void => {
    const result = runTest([`generate`, `work$$sp&&*ace`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for work$$sp&&*ace are: [a-Z] [0-9] [-]`]);
    expect(paramBaseValue).toEqual(`work$$sp&&*ace`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`command`);
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`work$$sp&&*ace`);
    expect(paramValues).toEqual([]);
  });

  test(`should be correct for the program: name generate workspace-node`, (): void => {
    const result = runTest([`generate`, `workspace-node`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`workspace-node`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`command`);
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`workspace-node`);
    expect(paramValues).toEqual([]);
  });

  test(`should be correct for the program: name generate workspace=true`, (): void => {
    const result = runTest([`generate`, `workspace=true`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for workspace=true are: [a-Z] [0-9] [-]`]);
    expect(paramBaseValue).toEqual(`workspace=true`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`command`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`workspace`);
    expect(paramValues).toEqual([`true`]);
  });
});

describe(`BuildParamDtoAppService - parameter structure for arguments`, (): void => {
  test(`should be correct for the program: name generate --name`, (): void => {
    const result = runTest([`generate`, `--name`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`--name`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`argument`);
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`name`);
    expect(paramValues).toEqual([]);
  });

  test(`should be incorrect for the program: name generate --n$$a%^me`, (): void => {
    const result = runTest([`generate`, `--n$$a%^me`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for --n$$a%^me are: [a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`]);
    expect(paramBaseValue).toEqual(`--n$$a%^me`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`argument`);
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`n$$a%^me`);
    expect(paramValues).toEqual([]);
  });

  test(`should be correct for the program: name generate --name=test`, (): void => {
    const result = runTest([`generate`, `--name=test`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`--name=test`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`argument`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`name`);
    expect(paramValues).toEqual([`test`]);
  });

  test(`should be correct for the program: name generate --name="test"`, (): void => {
    const result = runTest([`generate`, `--name="test"`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`--name="test"`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`argument`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`name`);
    expect(paramValues).toEqual([`test`]);
  });

  test(`should be correct for the program: name generate --name='test'`, (): void => {
    const result = runTest([`generate`, `--name='test'`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`--name='test'`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`argument`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`name`);
    expect(paramValues).toEqual([`test`]);
  });

  test(`should be correct for the program: name generate --name=\`test\``, (): void => {
    const result = runTest([`generate`, `--name=\`test\``]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`--name=\`test\``);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`argument`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`name`);
    expect(paramValues).toEqual([`test`]);
  });

  test(`should be incorrect for the program: name generate --name=te$$s&&t`, (): void => {
    const result = runTest([`generate`, `--name=te$$s&&t`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for --name=te$$s&&t are: [a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`]);
    expect(paramBaseValue).toEqual(`--name=te$$s&&t`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`argument`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`name`);
    expect(paramValues).toEqual([`te$$s&&t`]);
  });

  test(`should be incorrect for the program: name generate --name="te$$s&&t"`, (): void => {
    const result = runTest([`generate`, `--name="te$$s&&t"`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for --name="te$$s&&t" are: [a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`]);
    expect(paramBaseValue).toEqual(`--name="te$$s&&t"`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`argument`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`name`);
    expect(paramValues).toEqual([`te$$s&&t`]);
  });

  test(`should be incorrect for the program: name generate --name='te$$s&&t'`, (): void => {
    const result = runTest([`generate`, `--name='te$$s&&t'`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for --name='te$$s&&t' are: [a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`]);
    expect(paramBaseValue).toEqual(`--name='te$$s&&t'`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`argument`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`name`);
    expect(paramValues).toEqual([`te$$s&&t`]);
  });

  test(`should be incorrect for the program: name generate --name=\`te$$s&&t\``, (): void => {
    const result = runTest([`generate`, `--name=\`te$$s&&t\``]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for --name=\`te$$s&&t\` are: [a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`]);
    expect(paramBaseValue).toEqual(`--name=\`te$$s&&t\``);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`argument`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`name`);
    expect(paramValues).toEqual([`te$$s&&t`]);
  });

  test(`should be correct for the program: name generate --name=test1,test2,test3`, (): void => {
    const result = runTest([`generate`, `--name=test1,test2,test3`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`--name=test1,test2,test3`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`argument`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeTruthy();
    expect(paramName).toEqual(`name`);
    expect(paramValues).toEqual([`test1`, `test2`, `test3`]);
  });

  test(`should be correct for the program: name generate --name="test1,test2,test3"`, (): void => {
    const result = runTest([`generate`, `--name="test1,test2,test3"`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`--name="test1,test2,test3"`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`argument`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeTruthy();
    expect(paramName).toEqual(`name`);
    expect(paramValues).toEqual([`test1`, `test2`, `test3`]);
  });

  test(`should be correct for the program: name generate --name='test1,test2,test3'`, (): void => {
    const result = runTest([`generate`, `--name='test1,test2,test3'`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`--name='test1,test2,test3'`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`argument`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeTruthy();
    expect(paramName).toEqual(`name`);
    expect(paramValues).toEqual([`test1`, `test2`, `test3`]);
  });

  test(`should be correct for the program: name generate --name=\`test1,test2,test3\``, (): void => {
    const result = runTest([`generate`, `--name=\`test1,test2,test3\``]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`--name=\`test1,test2,test3\``);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`argument`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeTruthy();
    expect(paramName).toEqual(`name`);
    expect(paramValues).toEqual([`test1`, `test2`, `test3`]);
  });
});

describe(`BuildParamDtoAppService - parameter structure for aliases`, (): void => {
  test(`should be correct for the program: name generate -i`, (): void => {
    const result = runTest([`generate`, `-i`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`-i`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`alias`);
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`i`);
    expect(paramValues).toEqual([]);
  });

  test(`should be incorrect for the program: name generate -%`, (): void => {
    const result = runTest([`generate`, `-%`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for -% are: [a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`]);
    expect(paramBaseValue).toEqual(`-%`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`alias`);
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`%`);
    expect(paramValues).toEqual([]);
  });

  test(`should be incorrect for the program: name generate -name`, (): void => {
    const result = runTest([`generate`, `-name`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used incorrect parameter pattern!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Correct pattern for -name is: -<sign> or -<sign>=<value>`]);
    expect(paramBaseValue).toEqual(`-name`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`alias`);
    expect(paramHasValue).toBeFalsy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`name`);
    expect(paramValues).toEqual([]);
  });

  test(`should be correct for the program: name generate -n=test`, (): void => {
    const result = runTest([`generate`, `-n=test`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`-n=test`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`alias`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`n`);
    expect(paramValues).toEqual([`test`]);
  });

  test(`should be correct for the program: name generate -n="test"`, (): void => {
    const result = runTest([`generate`, `-n="test"`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`-n="test"`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`alias`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`n`);
    expect(paramValues).toEqual([`test`]);
  });

  test(`should be correct for the program: name generate -n='test'`, (): void => {
    const result = runTest([`generate`, `-n='test'`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`-n='test'`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`alias`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`n`);
    expect(paramValues).toEqual([`test`]);
  });

  test(`should be correct for the program: name generate -n=\`test\``, (): void => {
    const result = runTest([`generate`, `-n=\`test\``]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`-n=\`test\``);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`alias`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`n`);
    expect(paramValues).toEqual([`test`]);
  });

  test(`should be incorrect for the program: name generate -n=te%%s$$t`, (): void => {
    const result = runTest([`generate`, `-n=te%%s$$t`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for -n=te%%s$$t are: [a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`]);
    expect(paramBaseValue).toEqual(`-n=te%%s$$t`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`alias`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`n`);
    expect(paramValues).toEqual([`te%%s$$t`]);
  });

  test(`should be incorrect for the program: name generate -n="te%%s$$t"`, (): void => {
    const result = runTest([`generate`, `-n="te%%s$$t"`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for -n="te%%s$$t" are: [a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`]);
    expect(paramBaseValue).toEqual(`-n="te%%s$$t"`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`alias`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`n`);
    expect(paramValues).toEqual([`te%%s$$t`]);
  });

  test(`should be incorrect for the program: name generate -n='te%%s$$t'`, (): void => {
    const result = runTest([`generate`, `-n='te%%s$$t'`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for -n='te%%s$$t' are: [a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`]);
    expect(paramBaseValue).toEqual(`-n='te%%s$$t'`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`alias`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`n`);
    expect(paramValues).toEqual([`te%%s$$t`]);
  });

  test(`should be incorrect for the program: name generate -n=\`te%%s$$t\``, (): void => {
    const result = runTest([`generate`, `-n=\`te%%s$$t\``]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for -n=\`te%%s$$t\` are: [a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`]);
    expect(paramBaseValue).toEqual(`-n=\`te%%s$$t\``);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`alias`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeFalsy();
    expect(paramName).toEqual(`n`);
    expect(paramValues).toEqual([`te%%s$$t`]);
  });

  test(`should be correct for the program: name generate -n=test1,test2,test3`, (): void => {
    const result = runTest([`generate`, `-n=test1,test2,test3`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`-n=test1,test2,test3`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`alias`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeTruthy();
    expect(paramName).toEqual(`n`);
    expect(paramValues).toEqual([`test1`, `test2`, `test3`]);
  });

  test(`should be correct for the program: name generate -n="test1,test2,test3"`, (): void => {
    const result = runTest([`generate`, `-n="test1,test2,test3"`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`-n="test1,test2,test3"`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`alias`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeTruthy();
    expect(paramName).toEqual(`n`);
    expect(paramValues).toEqual([`test1`, `test2`, `test3`]);
  });

  test(`should be correct for the program: name generate -n='test1,test2,test3'`, (): void => {
    const result = runTest([`generate`, `-n='test1,test2,test3'`]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`-n='test1,test2,test3'`);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`alias`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeTruthy();
    expect(paramName).toEqual(`n`);
    expect(paramValues).toEqual([`test1`, `test2`, `test3`]);
  });

  test(`should be correct for the program: name generate -n=\`test1,test2,test3\``, (): void => {
    const result = runTest([`generate`, `-n=\`test1,test2,test3\``]);
    const {
      paramBaseValue, paramIndex, paramType, paramHasValue,
      paramHasManyValues, paramName, paramValues
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(paramBaseValue).toEqual(`-n=\`test1,test2,test3\``);
    expect(paramIndex).toEqual(3);
    expect(paramType).toEqual(`alias`);
    expect(paramHasValue).toBeTruthy();
    expect(paramHasManyValues).toBeTruthy();
    expect(paramName).toEqual(`n`);
    expect(paramValues).toEqual([`test1`, `test2`, `test3`]);
  });
});

// todo: refactor the code
