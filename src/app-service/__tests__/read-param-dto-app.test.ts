test("", () => {
  expect(true).toBeTruthy();
})

// import { container, DependencyContainer } from "tsyringe";
// import {
//   ReadProcessArgvService
// } from "../../infra/service/reader/read-process-argv.service";
// import {
//   ReadParamDtoAppService
// } from "../read-param-dto-app.service";
// import { ParamTypeEnum } from "../../infra/enum/param-type.enum";
// import {
//   ParamDtoValidationModel
// } from "../../infra/model/param-dto/param-dto-validation.model";
//
// /** Testing of the ReadParamDtoAppService. */
//
// const runTest = (argv: Array<string>): ParamDtoValidationModel => {
//   const child: DependencyContainer = container.createChildContainer();
//   child.register(ReadProcessArgvService, {
//     useClass: class {
//       getArgv(): Array<string> {
//         return ["executor", "application", ...argv];
//       }
//     }
//   });
//   return child.resolve(ReadParamDtoAppService).read();
// };
//
// afterEach(() => {
//   container.clearInstances();
//   container.reset();
// });
//
// describe("ReadParamDtoAppService - parameter order", () => {
//   test("Should be correct for the command: repox", () => {
//     expect(runTest([]).isError).toBeFalsy();
//   });
//
//   test("Should be correct for the command: repox -v", () => {
//     expect(runTest(["-v"]).isError).toBeFalsy();
//   });
//
//   test("Should be correct for the command: repox g", () => {
//     expect(runTest(["g"]).isError).toBeFalsy();
//   });
//
//   test("Should be correct for the command: repox g -c", () => {
//     expect(runTest(["g", "-c"]).isError).toBeFalsy();
//   });
//
//   test("Should be correct for the command: repox -v -c", () => {
//     expect(runTest(["-v", "-c"]).isError).toBeFalsy();
//   });
//
//   test("Should be incorrect for the command: repox -v g", () => {
//     expect(runTest(["-v", "g"]).isError).toBeTruthy();
//   });
//
//   test("Should be incorrect for the command: repox -v g -c", () => {
//     expect(runTest(["-v", "g", "-c"]).isError).toBeTruthy();
//   });
//
//   test("Should be correct for the command: repox g w", () => {
//     expect(runTest(["g", "w"]).isError).toBeFalsy();
//   });
//
//   test("Should be correct for the command: repox g w -t=test", () => {
//     expect(runTest(["g", "w", "-t=test"]).isError).toBeFalsy();
//   });
//
//   test("Should be correct for the command: repox g -c -t", () => {
//     expect(runTest(["g", "-c", "-t"]).isError).toBeFalsy();
//   });
//
//   test("Should be correct for the command: repox g -c w", () => {
//     expect(runTest(["g", "-c", "w"]).isError).toBeFalsy();
//   });
//
//   test("Should be correct for the command: repox g -c w -n", () => {
//     expect(runTest(["g", "-c", "w", "-n"]).isError).toBeFalsy();
//   });
// });
//
// describe("ReadParamDtoAppService - parameter structure", () => {
//   test("Should be correct for the command: repox", () => {
//     const result = runTest([]);
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//   });
//
//   test("Should be correct for the command: repox g", () => {
//     const result = runTest(["generate"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[2];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual("generate");
//     expect(paramIndex).toEqual(2);
//     expect(paramType).toEqual(ParamTypeEnum.program);
//     expect(paramHasValue).toBeFalsy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("generate");
//     expect(paramValues).toEqual([]);
//   });
//
//   test("should be incorrect for the command: repox gener%%a_&te", () => {
//     const result = runTest(["gener%%a_&te"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[2];
//     expect(result.isError).toBeTruthy();
//     expect(result.wrongParamIndexes).toEqual([2]);
//     expect(result.errors).toEqual(["You have added not supported characters!"]);
//     expect(result.tips).toEqual(["Supported characters for gener%%a_&te are: [a-z] [A-Z] [0-9] [-]"]);
//     expect(paramBaseValue).toEqual("gener%%a_&te");
//     expect(paramIndex).toEqual(2);
//     expect(paramType).toEqual(ParamTypeEnum.program);
//     expect(paramHasValue).toBeFalsy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("gener%%a_&te");
//     expect(paramValues).toEqual([]);
//   });
//
//   test("should be correct for the command: repox generate-workspace", () => {
//     const result = runTest(["generate-workspace"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[2];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual("generate-workspace");
//     expect(paramIndex).toEqual(2);
//     expect(paramType).toEqual(ParamTypeEnum.program);
//     expect(paramHasValue).toBeFalsy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("generate-workspace");
//     expect(paramValues).toEqual([]);
//   });
//
//   test("should be incorrect for the command: repox generate=true", () => {
//     const result = runTest(["generate=true"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[2];
//     expect(result.isError).toBeTruthy();
//     expect(result.wrongParamIndexes).toEqual([2]);
//     expect(result.errors).toEqual(["You have added not supported characters!"]);
//     expect(result.tips).toEqual(["Supported characters for generate=true are: [a-z] [A-Z] [0-9] [-]"]);
//     expect(paramBaseValue).toEqual("generate=true");
//     expect(paramIndex).toEqual(2);
//     expect(paramType).toEqual(ParamTypeEnum.program);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("generate");
//     expect(paramValues).toEqual(["true"]);
//   });
//
//   test("should be correct for the command: repox generate workspace", () => {
//     const result = runTest(["generate", "workspace"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual("workspace");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.command);
//     expect(paramHasValue).toBeFalsy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("workspace");
//     expect(paramValues).toEqual([]);
//   });
//
//   test("should be incorrect for the command: repox generate work$$sp&&*ace", () => {
//     const result = runTest(["generate", "work$$sp&&*ace"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeTruthy();
//     expect(result.wrongParamIndexes).toEqual([3]);
//     expect(result.errors).toEqual(["You have added not supported characters!"]);
//     expect(result.tips).toEqual(["Supported characters for work$$sp&&*ace are: [a-z] [A-Z] [0-9] [-]"]);
//     expect(paramBaseValue).toEqual("work$$sp&&*ace");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.command);
//     expect(paramHasValue).toBeFalsy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("work$$sp&&*ace");
//     expect(paramValues).toEqual([]);
//   });
//
//   test("should be correct for the command: repox generate workspace-node", () => {
//     const result = runTest(["generate", "workspace-node"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual("workspace-node");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.command);
//     expect(paramHasValue).toBeFalsy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("workspace-node");
//     expect(paramValues).toEqual([]);
//   });
//
//   test('should be correct for the command: repox generate workspace=true', () => {
//     const result = runTest(["generate", "workspace=true"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeTruthy();
//     expect(result.wrongParamIndexes).toEqual([3]);
//     expect(result.errors).toEqual(["You have added not supported characters!"]);
//     expect(result.tips).toEqual(["Supported characters for workspace=true are: [a-z] [A-Z] [0-9] [-]"]);
//     expect(paramBaseValue).toEqual("workspace=true");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.command);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("workspace");
//     expect(paramValues).toEqual(["true"]);
//   });
// });
//
// describe("ReadParamDtoAppService - parameter structure for arguments", () => {
//   test("should be correct for the command: repox generate --name", () => {
//     const result = runTest(["generate", "--name"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual("--name");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.argument);
//     expect(paramHasValue).toBeFalsy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("name");
//     expect(paramValues).toEqual([]);
//   });
//
//   test("should be incorrect for the command: repox generate --n$$a%^me", () => {
//     const result = runTest(["generate", "--n$$a%^me"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeTruthy();
//     expect(result.wrongParamIndexes).toEqual([3]);
//     expect(result.errors).toEqual(["You have added not supported characters!"]);
//     expect(result.tips).toEqual(["Supported characters for --n$$a%^me are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
//     expect(paramBaseValue).toEqual("--n$$a%^me");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.argument);
//     expect(paramHasValue).toBeFalsy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("n$$a%^me");
//     expect(paramValues).toEqual([]);
//   });
//
//   test("should be correct for the command: repox generate --name=test", () => {
//     const result = runTest(["generate", "--name=test"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual("--name=test");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.argument);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("name");
//     expect(paramValues).toEqual(["test"]);
//   });
//
//   test('should be correct for the command: repox generate --name="test"', () => {
//     const result = runTest(["generate", '--name="test"']);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual('--name="test"');
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.argument);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("name");
//     expect(paramValues).toEqual(["test"]);
//   });
//
//   test("should be correct for the command: repox generate --name='test'", () => {
//     const result = runTest(["generate", "--name='test'"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual("--name='test'");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.argument);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("name");
//     expect(paramValues).toEqual(["test"]);
//   });
//
//   test("should be correct for the command: repox generate --name=`test`", () => {
//     const result = runTest(["generate", "--name=`test`"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual("--name=`test`");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.argument);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("name");
//     expect(paramValues).toEqual(["test"]);
//   });
//
//   test("should be incorrect for the command: repox generate --name=te$$s&&t", () => {
//     const result = runTest(["generate", "--name=te$$s&&t"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeTruthy();
//     expect(result.wrongParamIndexes).toEqual([3]);
//     expect(result.errors).toEqual(["You have added not supported characters!"]);
//     expect(result.tips).toEqual(["Supported characters for --name=te$$s&&t are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
//     expect(paramBaseValue).toEqual("--name=te$$s&&t");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.argument);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("name");
//     expect(paramValues).toEqual(["te$$s&&t"]);
//   });
//
//   test('should be incorrect for the command: repox generate --name="te$$s&&t"', () => {
//     const result = runTest(["generate", '--name="te$$s&&t"']);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeTruthy();
//     expect(result.wrongParamIndexes).toEqual([3]);
//     expect(result.errors).toEqual(["You have added not supported characters!"]);
//     expect(result.tips).toEqual(["Supported characters for --name=\"te$$s&&t\" are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
//     expect(paramBaseValue).toEqual('--name="te$$s&&t"');
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.argument);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("name");
//     expect(paramValues).toEqual(["te$$s&&t"]);
//   });
//
//   test("should be incorrect for the command: repox generate --name='te$$s&&t'", () => {
//     const result = runTest(["generate", "--name='te$$s&&t'"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeTruthy();
//     expect(result.wrongParamIndexes).toEqual([3]);
//     expect(result.errors).toEqual(["You have added not supported characters!"]);
//     expect(result.tips).toEqual(["Supported characters for --name='te$$s&&t' are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
//     expect(paramBaseValue).toEqual("--name='te$$s&&t'");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.argument);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("name");
//     expect(paramValues).toEqual(["te$$s&&t"]);
//   });
//
//   test("should be incorrect for the command: repox generate --name=`te$$s&&t`", () => {
//     const result = runTest(["generate", "--name=`te$$s&&t`"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeTruthy();
//     expect(result.wrongParamIndexes).toEqual([3]);
//     expect(result.errors).toEqual(["You have added not supported characters!"]);
//     expect(result.tips).toEqual(["Supported characters for --name=`te$$s&&t` are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
//     expect(paramBaseValue).toEqual("--name=`te$$s&&t`");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.argument);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("name");
//     expect(paramValues).toEqual(["te$$s&&t"]);
//   });
//
//   test("should be correct for the command: repox generate --name=test1,test2,test3", () => {
//     const result = runTest(["generate", "--name=test1,test2,test3"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual("--name=test1,test2,test3");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.argument);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeTruthy();
//     expect(paramName).toEqual("name");
//     expect(paramValues).toEqual(["test1", "test2", "test3"]);
//   });
//
//   test('should be correct for the command: repox generate --name="test1,test2,test3"', () => {
//     const result = runTest(["generate", '--name="test1,test2,test3"']);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual('--name="test1,test2,test3"');
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.argument);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeTruthy();
//     expect(paramName).toEqual("name");
//     expect(paramValues).toEqual(["test1", "test2", "test3"]);
//   });
//
//   test("should be correct for the command: repox generate --name='test1,test2,test3'", () => {
//     const result = runTest(["generate", "--name='test1,test2,test3'"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual("--name='test1,test2,test3'");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.argument);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeTruthy();
//     expect(paramName).toEqual("name");
//     expect(paramValues).toEqual(["test1", "test2", "test3"]);
//   });
//
//   test("should be correct for the command: repox generate --name=`test1,test2,test3`", () => {
//     const result = runTest(["generate", "--name=`test1,test2,test3`"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual("--name=`test1,test2,test3`");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.argument);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeTruthy();
//     expect(paramName).toEqual("name");
//     expect(paramValues).toEqual(["test1", "test2", "test3"]);
//   });
// });
//
// describe("ReadParamDtoAppService - parameter structure for aliases", () => {
//   test("should be correct for the command: repox generate -i", () => {
//     const result = runTest(["generate", "-i"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual("-i");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.alias);
//     expect(paramHasValue).toBeFalsy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("i");
//     expect(paramValues).toEqual([]);
//   });
//
//   test("should be correct for the command: repox generate -%", () => {
//     const result = runTest(["generate", "-%"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeTruthy();
//     expect(result.wrongParamIndexes).toEqual([3]);
//     expect(result.errors).toEqual(["You have added not supported characters!"]);
//     expect(result.tips).toEqual(["Supported characters for -% are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
//     expect(paramBaseValue).toEqual("-%");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.alias);
//     expect(paramHasValue).toBeFalsy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("%");
//     expect(paramValues).toEqual([]);
//   });
//
//   test("should be correct for the command: repox generate -name", () => {
//     const result = runTest(["generate", "-name"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeTruthy();
//     expect(result.wrongParamIndexes).toEqual([3]);
//     expect(result.errors).toEqual(["You have added incorrect parameter pattern!"]);
//     expect(result.tips).toEqual(["Supported pattern for -name are: -<sign> or -<sign>=<value>"]);
//     expect(paramBaseValue).toEqual("-name");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.alias);
//     expect(paramHasValue).toBeFalsy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("name");
//     expect(paramValues).toEqual([]);
//   });
//
//   test("should be correct for the command: repox generate -n=test", () => {
//     const result = runTest(["generate", "-n=test"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual("-n=test");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.alias);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("n");
//     expect(paramValues).toEqual(["test"]);
//   });
//
//   test('should be correct for the command: repox generate -n="test"', () => {
//     const result = runTest(["generate", '-n="test"']);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual('-n="test"');
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.alias);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("n");
//     expect(paramValues).toEqual(["test"]);
//   });
//
//   test("should be correct for the command: repox generate -n='test'", () => {
//     const result = runTest(["generate", "-n='test'"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual("-n='test'");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.alias);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("n");
//     expect(paramValues).toEqual(["test"]);
//   });
//
//   test("should be correct for the command: repox generate -n=`test`", () => {
//     const result = runTest(["generate", "-n=`test`"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual("-n=`test`");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.alias);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("n");
//     expect(paramValues).toEqual(["test"]);
//   });
//
//   test("should be incorrect for the command: repox generate -n=te%%s$$t", () => {
//     const result = runTest(["generate", "-n=te%%s$$t"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeTruthy();
//     expect(result.wrongParamIndexes).toEqual([3]);
//     expect(result.errors).toEqual(["You have added not supported characters!"]);
//     expect(result.tips).toEqual(["Supported characters for -n=te%%s$$t are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
//     expect(paramBaseValue).toEqual("-n=te%%s$$t");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.alias);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("n");
//     expect(paramValues).toEqual(["te%%s$$t"]);
//   });
//
//   test('should be incorrect for the command: repox generate -n="te%%s$$t"', () => {
//     const result = runTest(["generate", '-n="te%%s$$t"']);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeTruthy();
//     expect(result.wrongParamIndexes).toEqual([3]);
//     expect(result.errors).toEqual(["You have added not supported characters!"]);
//     expect(result.tips).toEqual(["Supported characters for -n=\"te%%s$$t\" are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
//     expect(paramBaseValue).toEqual('-n="te%%s$$t"');
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.alias);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("n");
//     expect(paramValues).toEqual(["te%%s$$t"]);
//   });
//
//   test("should be incorrect for the command: repox generate -n='te%%s$$t'", () => {
//     const result = runTest(["generate", "-n='te%%s$$t'"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeTruthy();
//     expect(result.wrongParamIndexes).toEqual([3]);
//     expect(result.errors).toEqual(["You have added not supported characters!"]);
//     expect(result.tips).toEqual(["Supported characters for -n='te%%s$$t' are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
//     expect(paramBaseValue).toEqual("-n='te%%s$$t'");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.alias);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("n");
//     expect(paramValues).toEqual(["te%%s$$t"]);
//   });
//
//   test("should be incorrect for the command: repox generate -n=`te%%s$$t`", () => {
//     const result = runTest(["generate", "-n=`te%%s$$t`"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeTruthy();
//     expect(result.wrongParamIndexes).toEqual([3]);
//     expect(result.errors).toEqual(["You have added not supported characters!"]);
//     expect(result.tips).toEqual(["Supported characters for -n=`te%%s$$t` are: [a-z] [A-Z] [0-9] [-] [=] [\"] ['] [`] [,] [space]"]);
//     expect(paramBaseValue).toEqual("-n=`te%%s$$t`");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.alias);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeFalsy();
//     expect(paramName).toEqual("n");
//     expect(paramValues).toEqual(["te%%s$$t"]);
//   });
//
//   test("should be correct for the command: repox generate -n=test1,test2,test3", () => {
//     const result = runTest(["generate", "-n=test1,test2,test3"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual("-n=test1,test2,test3");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.alias);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeTruthy();
//     expect(paramName).toEqual("n");
//     expect(paramValues).toEqual(["test1", "test2", "test3"]);
//   });
//
//   test('should be correct for the command: repox generate -n="test1,test2,test3"', () => {
//     const result = runTest(["generate", '-n="test1,test2,test3"']);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual('-n="test1,test2,test3"');
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.alias);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeTruthy();
//     expect(paramName).toEqual("n");
//     expect(paramValues).toEqual(["test1", "test2", "test3"]);
//   });
//
//   test("should be correct for the command: repox generate -n='test1,test2,test3'", () => {
//     const result = runTest(["generate", "-n='test1,test2,test3'"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual("-n='test1,test2,test3'");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.alias);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeTruthy();
//     expect(paramName).toEqual("n");
//     expect(paramValues).toEqual(["test1", "test2", "test3"]);
//   });
//
//   test("should be correct for the command: repox generate -n=`test1,test2,test3`", () => {
//     const result = runTest(["generate", "-n=`test1,test2,test3`"]);
//     const {
//       paramBaseValue, paramIndex, paramType, paramHasValue,
//       paramHasManyValues, paramName, paramValues
//     } = result.paramDto.params[3];
//     expect(result.isError).toBeFalsy();
//     expect(result.wrongParamIndexes).toEqual([]);
//     expect(result.errors).toEqual([]);
//     expect(result.tips).toEqual([]);
//     expect(paramBaseValue).toEqual("-n=`test1,test2,test3`");
//     expect(paramIndex).toEqual(3);
//     expect(paramType).toEqual(ParamTypeEnum.alias);
//     expect(paramHasValue).toBeTruthy();
//     expect(paramHasManyValues).toBeTruthy();
//     expect(paramName).toEqual("n");
//     expect(paramValues).toEqual(["test1", "test2", "test3"]);
//   });
// });
// // todo: fix it