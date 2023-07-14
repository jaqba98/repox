import { singleton } from "tsyringe";
import {
  WsRepoxDtoModel
} from "../../model/ws-file-dto/ws-repox-dto.model";
import {
  WsTsconfigDtoModel
} from "../../model/ws-file-dto/ws-tsconfig-dto.model";
import { FileUtilsService } from "@lib/utils";
import {
  WorkspaceFileEnum
} from "../../enum/workspace/workspace-file.enum";
import { Schema, Validator } from "jsonschema";

@singleton()
/**
 * The dto store service is responsible for store all
 * configuration file content directly from files.
 */
export class WsDtoStoreService {
  private wsRepoxDto: WsRepoxDtoModel | undefined;
  private wsTsconfigDto: WsTsconfigDtoModel | undefined;
  // private wsFileDto: Array<WsFileDtoModel> | undefined;

  constructor(
    private readonly file: FileUtilsService,
    private readonly validator: Validator
  ) {
  }

  loadWsDto(): void {
    this.wsRepoxDto = this.file.readJsonFile<WsRepoxDtoModel>(
      WorkspaceFileEnum.repoxJsonFile
    );
    this.wsTsconfigDto = this.file.readJsonFile<WsTsconfigDtoModel>(
      WorkspaceFileEnum.tsconfigJsonFile
    );
    // const projects = this.wsRepoxDto.projects || [];
    // this.wsFileDto = Object.values(projects)
    //   .filter(project => project && project.name && project.root)
    //   .map(project => ({
    //     projectName: project.name,
    //     projectFiles: this.file.readProjectFiles(project.root)
    //       .map(file => ({
    //         filePath: file,
    //         fileName: this.file.getFileName(file),
    //         fileExtname: this.file.getFileExtname(file)
    //       }))
    //   }));
  }

  validationWsRepoxDto(): boolean {
    const schema: Schema = {
      id: "/RepoxDto",
      type: "object",
      properties: {
        projects: {
          type: "object",
          additionalProperties: {
            type: "object",
            properties: {
              name: { type: "string" },
              type: { type: "string" },
              path: { type: "string" },
              scheme: {
                type: "object",
                properties: {
                  type: { type: "string" }
                },
                required: ["type"],
                additionalProperties: false
              }
            },
            required: ["name", "type", "path", "scheme"],
            additionalProperties: false
          }
        }
      },
      additionalProperties: false,
      required: ["projects"]
    };
    this.validator.addSchema(schema, "/RepoxDto");
    const result = this.validator.validate(this.wsRepoxDto, schema);
    console.log(result.toString());
    return result.valid;
  }
}
