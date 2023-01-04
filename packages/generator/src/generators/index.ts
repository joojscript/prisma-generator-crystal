import { genModel } from './genModel'
import { genEnum } from './genEnum'
import { genType } from './genType'
import { Dictionary } from '@prisma/sdk'

export const Generators: {
  [key: string]: (data: any, meta: Dictionary<string>) => string
} = {
  models: genModel,
  enums: genEnum,
  types: genType,
}
export default Generators
