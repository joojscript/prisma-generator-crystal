import { genModel } from '../generators/genModel'
import { genEnum } from '../generators/genEnum'
import { DMMF, GeneratorOptions } from '@prisma/generator-helper'

export const Generators: {
  [key: string]: (data: any, meta?: GeneratorOptions) => string
} = {
  models: genModel,
  enums: genEnum,
}
export default Generators
