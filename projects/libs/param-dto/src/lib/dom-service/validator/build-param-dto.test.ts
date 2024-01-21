// import {container} from "tsyringe";
//
// import {BuildParamDtoService} from "./build-param-dto.service";
// import {ParamDtoModel} from "../../model/param-dto.model";
// import {ParamTypeEnum} from "../../enum/param-type.enum";
// import {ParamDtoStoreService} from "../store/param-dto-store.service";
//
// describe("BuildParamDtoService", (): void => {
//     class MockReadArgumentsService {
//         read(): string[] {
//             return [
//                 "node",
//                 "application",
//                 "program",
//                 "--argument1",
//                 "--argument2=val1",
//                 '--argument3="val1,val2"',
//                 "command",
//                 "-a",
//                 "-b='val1'",
//                 '-c="val1,val2"'
//             ];
//         }
//     }
//
//     const service = container.resolve(BuildParamDtoService);
//     const store = container.resolve(ParamDtoStoreService);
//     const args = container.resolve(MockReadArgumentsService).read();
//
//     afterAll((): void => {
//         container.clearInstances();
//     });
//
//     test("Should correctly build param DTO model", (): void => {
//         service.build(args);
//         expect(store.getParamDto()).toEqual<ParamDtoModel>({
//             params: [
//                 {
//                     baseValue: "node",
//                     index: 0,
//                     type: ParamTypeEnum.executor,
//                     hasValue: false,
//                     name: "node",
//                     values: [],
//                     hasManyValues: false
//                 },
//                 {
//                     baseValue: "application",
//                     index: 1,
//                     type: ParamTypeEnum.application,
//                     hasValue: false,
//                     name: "application",
//                     values: [],
//                     hasManyValues: false
//                 },
//                 {
//                     baseValue: "program",
//                     index: 2,
//                     type: ParamTypeEnum.program,
//                     hasValue: false,
//                     name: "program",
//                     values: [],
//                     hasManyValues: false
//                 },
//                 {
//                     baseValue: "--argument1",
//                     index: 3,
//                     type: ParamTypeEnum.argument,
//                     hasValue: false,
//                     name: "argument1",
//                     values: [],
//                     hasManyValues: false
//                 },
//                 {
//                     baseValue: "--argument2=val1",
//                     index: 4,
//                     type: ParamTypeEnum.argument,
//                     hasValue: true,
//                     name: "argument2",
//                     values: ["val1"],
//                     hasManyValues: false
//                 },
//                 {
//                     baseValue: '--argument3="val1,val2"',
//                     index: 5,
//                     type: ParamTypeEnum.argument,
//                     hasValue: true,
//                     name: "argument3",
//                     values: ["val1", "val2"],
//                     hasManyValues: true
//                 },
//                 {
//                     baseValue: "command",
//                     index: 6,
//                     type: ParamTypeEnum.command,
//                     hasValue: false,
//                     name: "command",
//                     values: [],
//                     hasManyValues: false
//                 },
//                 {
//                     baseValue: "-a",
//                     index: 7,
//                     type: ParamTypeEnum.alias,
//                     hasValue: false,
//                     name: "a",
//                     values: [],
//                     hasManyValues: false
//                 },
//                 {
//                     baseValue: "-b='val1'",
//                     index: 8,
//                     type: ParamTypeEnum.alias,
//                     hasValue: true,
//                     name: "b",
//                     values: ["val1"],
//                     hasManyValues: false
//                 },
//                 {
//                     baseValue: '-c="val1,val2"',
//                     index: 9,
//                     type: ParamTypeEnum.alias,
//                     hasValue: true,
//                     name: "c",
//                     values: ["val1", "val2"],
//                     hasManyValues: true
//                 }
//             ]
//         });
//     });
// });
//
// // todo: refactor the code