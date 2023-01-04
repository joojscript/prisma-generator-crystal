import { DMMF } from '@prisma/generator-helper'
import { StringHelpers } from '../helpers/strings'

export const genEnum = ({ name, values }: DMMF.DatamodelEnum) => {
  const enumValues = values
    .map(({ name }) => StringHelpers.capitalize(name))
    .join('\n  ')

  return `enum ${StringHelpers.capitalize(name)} 
  ${enumValues}
end`
}
