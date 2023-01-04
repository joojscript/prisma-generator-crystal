import { genModel } from '../generators/genModel'
import { genEnum } from '../generators/genEnum'
import { Dictionary } from '@prisma/sdk'

export const Generators: {
  [key: string]: (data: any, meta?: Dictionary<string>) => string
} = {
  models: genModel,
  enums: genEnum,
}
export default Generators
