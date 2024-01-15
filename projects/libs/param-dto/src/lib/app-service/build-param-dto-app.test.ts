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
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[2];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`generate`);
    expect(index).toEqual(2);
    expect(type).toEqual(`program`);
    expect(hasValue).toBeFalsy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`generate`);
    expect(values).toEqual([]);
  });

  test(`should be incorrect for the program: name gener%%a_&te`, (): void => {
    const result = runTest([`gener%%a_&te`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[2];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([2]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for gener%%a_&te are: [a-Z] [0-9] [-]`]);
    expect(baseValue).toEqual(`gener%%a_&te`);
    expect(index).toEqual(2);
    expect(type).toEqual(`program`);
    expect(hasValue).toBeFalsy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`gener%%a_&te`);
    expect(values).toEqual([]);
  });

  test(`should be correct for the program: name generate-workspace`, (): void => {
    const result = runTest([`generate-workspace`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[2];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`generate-workspace`);
    expect(index).toEqual(2);
    expect(type).toEqual(`program`);
    expect(hasValue).toBeFalsy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`generate-workspace`);
    expect(values).toEqual([]);
  });

  test(`should be incorrect for the program: name generate=true`, (): void => {
    const result = runTest([`generate=true`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[2];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([2]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for generate=true are: [a-Z] [0-9] [-]`]);
    expect(baseValue).toEqual(`generate=true`);
    expect(index).toEqual(2);
    expect(type).toEqual(`program`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`generate`);
    expect(values).toEqual([`true`]);
  });

  test(`should be correct for the program: name generate workspace`, (): void => {
    const result = runTest([`generate`, `workspace`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`workspace`);
    expect(index).toEqual(3);
    expect(type).toEqual(`command`);
    expect(hasValue).toBeFalsy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`workspace`);
    expect(values).toEqual([]);
  });

  test(`should be incorrect for the program: name generate work$$sp&&*ace`, (): void => {
    const result = runTest([`generate`, `work$$sp&&*ace`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for work$$sp&&*ace are: [a-Z] [0-9] [-]`]);
    expect(baseValue).toEqual(`work$$sp&&*ace`);
    expect(index).toEqual(3);
    expect(type).toEqual(`command`);
    expect(hasValue).toBeFalsy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`work$$sp&&*ace`);
    expect(values).toEqual([]);
  });

  test(`should be correct for the program: name generate workspace-node`, (): void => {
    const result = runTest([`generate`, `workspace-node`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`workspace-node`);
    expect(index).toEqual(3);
    expect(type).toEqual(`command`);
    expect(hasValue).toBeFalsy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`workspace-node`);
    expect(values).toEqual([]);
  });

  test(`should be correct for the program: name generate workspace=true`, (): void => {
    const result = runTest([`generate`, `workspace=true`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for workspace=true are: [a-Z] [0-9] [-]`]);
    expect(baseValue).toEqual(`workspace=true`);
    expect(index).toEqual(3);
    expect(type).toEqual(`command`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`workspace`);
    expect(values).toEqual([`true`]);
  });
});

describe(`BuildParamDtoAppService - parameter structure for arguments`, (): void => {
  test(`should be correct for the program: name generate --name`, (): void => {
    const result = runTest([`generate`, `--name`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`--name`);
    expect(index).toEqual(3);
    expect(type).toEqual(`argument`);
    expect(hasValue).toBeFalsy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`name`);
    expect(values).toEqual([]);
  });

  test(`should be incorrect for the program: name generate --n$$a%^me`, (): void => {
    const result = runTest([`generate`, `--n$$a%^me`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for --n$$a%^me are: [a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`]);
    expect(baseValue).toEqual(`--n$$a%^me`);
    expect(index).toEqual(3);
    expect(type).toEqual(`argument`);
    expect(hasValue).toBeFalsy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`n$$a%^me`);
    expect(values).toEqual([]);
  });

  test(`should be correct for the program: name generate --name=test`, (): void => {
    const result = runTest([`generate`, `--name=test`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`--name=test`);
    expect(index).toEqual(3);
    expect(type).toEqual(`argument`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`name`);
    expect(values).toEqual([`test`]);
  });

  test(`should be correct for the program: name generate --name="test"`, (): void => {
    const result = runTest([`generate`, `--name="test"`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`--name="test"`);
    expect(index).toEqual(3);
    expect(type).toEqual(`argument`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`name`);
    expect(values).toEqual([`test`]);
  });

  test(`should be correct for the program: name generate --name='test'`, (): void => {
    const result = runTest([`generate`, `--name='test'`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`--name='test'`);
    expect(index).toEqual(3);
    expect(type).toEqual(`argument`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`name`);
    expect(values).toEqual([`test`]);
  });

  test(`should be correct for the program: name generate --name=\`test\``, (): void => {
    const result = runTest([`generate`, `--name=\`test\``]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`--name=\`test\``);
    expect(index).toEqual(3);
    expect(type).toEqual(`argument`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`name`);
    expect(values).toEqual([`test`]);
  });

  test(`should be incorrect for the program: name generate --name=te$$s&&t`, (): void => {
    const result = runTest([`generate`, `--name=te$$s&&t`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for --name=te$$s&&t are: [a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`]);
    expect(baseValue).toEqual(`--name=te$$s&&t`);
    expect(index).toEqual(3);
    expect(type).toEqual(`argument`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`name`);
    expect(values).toEqual([`te$$s&&t`]);
  });

  test(`should be incorrect for the program: name generate --name="te$$s&&t"`, (): void => {
    const result = runTest([`generate`, `--name="te$$s&&t"`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for --name="te$$s&&t" are: [a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`]);
    expect(baseValue).toEqual(`--name="te$$s&&t"`);
    expect(index).toEqual(3);
    expect(type).toEqual(`argument`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`name`);
    expect(values).toEqual([`te$$s&&t`]);
  });

  test(`should be incorrect for the program: name generate --name='te$$s&&t'`, (): void => {
    const result = runTest([`generate`, `--name='te$$s&&t'`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for --name='te$$s&&t' are: [a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`]);
    expect(baseValue).toEqual(`--name='te$$s&&t'`);
    expect(index).toEqual(3);
    expect(type).toEqual(`argument`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`name`);
    expect(values).toEqual([`te$$s&&t`]);
  });

  test(`should be incorrect for the program: name generate --name=\`te$$s&&t\``, (): void => {
    const result = runTest([`generate`, `--name=\`te$$s&&t\``]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for --name=\`te$$s&&t\` are: [a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`]);
    expect(baseValue).toEqual(`--name=\`te$$s&&t\``);
    expect(index).toEqual(3);
    expect(type).toEqual(`argument`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`name`);
    expect(values).toEqual([`te$$s&&t`]);
  });

  test(`should be correct for the program: name generate --name=test1,test2,test3`, (): void => {
    const result = runTest([`generate`, `--name=test1,test2,test3`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`--name=test1,test2,test3`);
    expect(index).toEqual(3);
    expect(type).toEqual(`argument`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeTruthy();
    expect(name).toEqual(`name`);
    expect(values).toEqual([`test1`, `test2`, `test3`]);
  });

  test(`should be correct for the program: name generate --name="test1,test2,test3"`, (): void => {
    const result = runTest([`generate`, `--name="test1,test2,test3"`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`--name="test1,test2,test3"`);
    expect(index).toEqual(3);
    expect(type).toEqual(`argument`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeTruthy();
    expect(name).toEqual(`name`);
    expect(values).toEqual([`test1`, `test2`, `test3`]);
  });

  test(`should be correct for the program: name generate --name='test1,test2,test3'`, (): void => {
    const result = runTest([`generate`, `--name='test1,test2,test3'`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`--name='test1,test2,test3'`);
    expect(index).toEqual(3);
    expect(type).toEqual(`argument`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeTruthy();
    expect(name).toEqual(`name`);
    expect(values).toEqual([`test1`, `test2`, `test3`]);
  });

  test(`should be correct for the program: name generate --name=\`test1,test2,test3\``, (): void => {
    const result = runTest([`generate`, `--name=\`test1,test2,test3\``]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`--name=\`test1,test2,test3\``);
    expect(index).toEqual(3);
    expect(type).toEqual(`argument`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeTruthy();
    expect(name).toEqual(`name`);
    expect(values).toEqual([`test1`, `test2`, `test3`]);
  });
});

describe(`BuildParamDtoAppService - parameter structure for aliases`, (): void => {
  test(`should be correct for the program: name generate -i`, (): void => {
    const result = runTest([`generate`, `-i`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`-i`);
    expect(index).toEqual(3);
    expect(type).toEqual(`alias`);
    expect(hasValue).toBeFalsy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`i`);
    expect(values).toEqual([]);
  });

  test(`should be incorrect for the program: name generate -%`, (): void => {
    const result = runTest([`generate`, `-%`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for -% are: [a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`]);
    expect(baseValue).toEqual(`-%`);
    expect(index).toEqual(3);
    expect(type).toEqual(`alias`);
    expect(hasValue).toBeFalsy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`%`);
    expect(values).toEqual([]);
  });

  test(`should be incorrect for the program: name generate -name`, (): void => {
    const result = runTest([`generate`, `-name`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used incorrect parameter pattern!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Correct pattern for -name is: -<sign> or -<sign>=<value>`]);
    expect(baseValue).toEqual(`-name`);
    expect(index).toEqual(3);
    expect(type).toEqual(`alias`);
    expect(hasValue).toBeFalsy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`name`);
    expect(values).toEqual([]);
  });

  test(`should be correct for the program: name generate -n=test`, (): void => {
    const result = runTest([`generate`, `-n=test`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`-n=test`);
    expect(index).toEqual(3);
    expect(type).toEqual(`alias`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`n`);
    expect(values).toEqual([`test`]);
  });

  test(`should be correct for the program: name generate -n="test"`, (): void => {
    const result = runTest([`generate`, `-n="test"`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`-n="test"`);
    expect(index).toEqual(3);
    expect(type).toEqual(`alias`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`n`);
    expect(values).toEqual([`test`]);
  });

  test(`should be correct for the program: name generate -n='test'`, (): void => {
    const result = runTest([`generate`, `-n='test'`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`-n='test'`);
    expect(index).toEqual(3);
    expect(type).toEqual(`alias`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`n`);
    expect(values).toEqual([`test`]);
  });

  test(`should be correct for the program: name generate -n=\`test\``, (): void => {
    const result = runTest([`generate`, `-n=\`test\``]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`-n=\`test\``);
    expect(index).toEqual(3);
    expect(type).toEqual(`alias`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`n`);
    expect(values).toEqual([`test`]);
  });

  test(`should be incorrect for the program: name generate -n=te%%s$$t`, (): void => {
    const result = runTest([`generate`, `-n=te%%s$$t`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for -n=te%%s$$t are: [a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`]);
    expect(baseValue).toEqual(`-n=te%%s$$t`);
    expect(index).toEqual(3);
    expect(type).toEqual(`alias`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`n`);
    expect(values).toEqual([`te%%s$$t`]);
  });

  test(`should be incorrect for the program: name generate -n="te%%s$$t"`, (): void => {
    const result = runTest([`generate`, `-n="te%%s$$t"`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for -n="te%%s$$t" are: [a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`]);
    expect(baseValue).toEqual(`-n="te%%s$$t"`);
    expect(index).toEqual(3);
    expect(type).toEqual(`alias`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`n`);
    expect(values).toEqual([`te%%s$$t`]);
  });

  test(`should be incorrect for the program: name generate -n='te%%s$$t'`, (): void => {
    const result = runTest([`generate`, `-n='te%%s$$t'`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for -n='te%%s$$t' are: [a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`]);
    expect(baseValue).toEqual(`-n='te%%s$$t'`);
    expect(index).toEqual(3);
    expect(type).toEqual(`alias`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`n`);
    expect(values).toEqual([`te%%s$$t`]);
  });

  test(`should be incorrect for the program: name generate -n=\`te%%s$$t\``, (): void => {
    const result = runTest([`generate`, `-n=\`te%%s$$t\``]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeFalsy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([3]);
    expect(result.paramDtoValidation.errors).toEqual([`You have used not supported signs!`]);
    expect(result.paramDtoValidation.tips).toEqual([`Supported signs for -n=\`te%%s$$t\` are: [a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`]);
    expect(baseValue).toEqual(`-n=\`te%%s$$t\``);
    expect(index).toEqual(3);
    expect(type).toEqual(`alias`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeFalsy();
    expect(name).toEqual(`n`);
    expect(values).toEqual([`te%%s$$t`]);
  });

  test(`should be correct for the program: name generate -n=test1,test2,test3`, (): void => {
    const result = runTest([`generate`, `-n=test1,test2,test3`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`-n=test1,test2,test3`);
    expect(index).toEqual(3);
    expect(type).toEqual(`alias`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeTruthy();
    expect(name).toEqual(`n`);
    expect(values).toEqual([`test1`, `test2`, `test3`]);
  });

  test(`should be correct for the program: name generate -n="test1,test2,test3"`, (): void => {
    const result = runTest([`generate`, `-n="test1,test2,test3"`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`-n="test1,test2,test3"`);
    expect(index).toEqual(3);
    expect(type).toEqual(`alias`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeTruthy();
    expect(name).toEqual(`n`);
    expect(values).toEqual([`test1`, `test2`, `test3`]);
  });

  test(`should be correct for the program: name generate -n='test1,test2,test3'`, (): void => {
    const result = runTest([`generate`, `-n='test1,test2,test3'`]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`-n='test1,test2,test3'`);
    expect(index).toEqual(3);
    expect(type).toEqual(`alias`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeTruthy();
    expect(name).toEqual(`n`);
    expect(values).toEqual([`test1`, `test2`, `test3`]);
  });

  test(`should be correct for the program: name generate -n=\`test1,test2,test3\``, (): void => {
    const result = runTest([`generate`, `-n=\`test1,test2,test3\``]);
    const {
      baseValue, index, type, hasValue,
      hasManyValues, name, values
    } = result.paramDto.params[3];
    expect(result.paramDtoValidation.success).toBeTruthy();
    expect(result.paramDtoValidation.wrongIndexes).toEqual([]);
    expect(result.paramDtoValidation.errors).toEqual([]);
    expect(result.paramDtoValidation.tips).toEqual([]);
    expect(baseValue).toEqual(`-n=\`test1,test2,test3\``);
    expect(index).toEqual(3);
    expect(type).toEqual(`alias`);
    expect(hasValue).toBeTruthy();
    expect(hasManyValues).toBeTruthy();
    expect(name).toEqual(`n`);
    expect(values).toEqual([`test1`, `test2`, `test3`]);
  });
});
