import { singleton } from "tsyringe";

@singleton()
/**
 * The service is responsible for check type of value.
 */
export class TypeUtilsService {
  valueIsObject(value: string): boolean {
    try {
      const parsedObject = JSON.parse(value);
      return typeof parsedObject === `object` && value !== null;
    } catch {
      return false;
    }
  }

  valueIsNumber(value: string): boolean {
    return !isNaN(Number(value));
  }

  valueIsString(value: any): boolean {
    return typeof value === `string`;
  }
}
