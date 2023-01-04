import { DMMF } from '@prisma/generator-helper'
import { StringHelpers } from '../helpers/strings'
import { TypeConvertions } from '../helpers/type-convertions'
import { Dictionary } from '@prisma/sdk'

export const genType = (
  { name, fields }: DMMF.Model,
  meta: Dictionary<string>,
) => {
  const typeName = StringHelpers.capitalize(name)

  const typeFields = fields
    .map(
      ({ name, type, isRequired, isList, hasDefaultValue, kind, ...rest }) => {
        const fieldName = StringHelpers.firstLowerCased(name)
        const fieldType = TypeConvertions.convert(type, kind) || ''
        const fieldRequired =
          fieldType && isRequired ? fieldType : `(${fieldType} | Nil)`
        const fieldList =
          fieldRequired && isList ? `Array(${fieldRequired})` : fieldRequired
        const fieldDefault =
          hasDefaultValue && TypeConvertions.fieldDefault(rest['default'])
            ? ` = ${TypeConvertions.fieldDefault(rest['default'])}`
            : ''

        return `property ${fieldName}: ${fieldList}${fieldDefault}`
      },
    )
    .join('\n  ')

  return `class ${typeName}Type
  ${typeFields}
end`
}
