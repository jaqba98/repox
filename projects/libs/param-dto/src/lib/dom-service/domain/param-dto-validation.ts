import { injectable } from 'tsyringe'

@injectable()
/**
 * The domain class is a recipe how to build param dto validation object.
 */
export class ParamDtoValidation {
  supportedSigns: boolean = true
  supportedSignsWrongIndexes: number[] = []

  correctPattern: boolean = true
  correctPatternWrongIndexes: number[] = []

  canExist: boolean = true
  canExistWrongIndexes: number[] = []

  correctOrder: boolean = true
  correctOrderWrongIndexes: number[] = []
}
