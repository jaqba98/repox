import { container } from "tsyringe";
import { WriteFileService } from "../write-file.service";
import { existsSync, readFileSync, unlinkSync } from "fs";

/** Testing of the WriteFileService service. */

interface TJsonContent {
  hello: string;
}

describe("WriteFileService", () => {
  const path: string = "test.json";
  const content: TJsonContent = { hello: "Hello" };
  const writeFile = container.resolve(WriteFileService);

  beforeEach(() => {
    if (existsSync(path)) {
      unlinkSync(path);
    }
  });

  afterAll(() => {
    if (existsSync(path)) {
      unlinkSync(path);
    }
  });

  test("Should correctly save json data to file", () => {
    writeFile.writeJsonFile<TJsonContent>(path, content);
    const dataFromFile = JSON.parse(readFileSync(path, "utf-8"));
    expect(dataFromFile).toEqual(content);
  });
});
// todo: refactor this