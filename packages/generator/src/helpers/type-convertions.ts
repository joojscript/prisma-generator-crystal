type _TypeConvertionsHelper = {
  CONVERT_TABLE: {
    [key: string]: (inputValue: any) => string
  }
  convert: (inputType: string, inputValue: any) => string
  fieldDefault: (inputValue: any) => string
}

export const TypeConvertions: _TypeConvertionsHelper = {
  CONVERT_TABLE: {
    String: (inputValue: any) => 'String',
    Int: (inputValue: any) => 'Int32',
    Float: (inputValue: any) => 'Float',
    Boolean: (inputValue: any) => 'Boolean',
    DateTime: (inputValue: any) => 'Time',
  },
  convert: (inputType: string, inputValue: any) => {
    return TypeConvertions.CONVERT_TABLE[inputType]?.(inputValue) || inputType
  },
  fieldDefault: (inputValue: any) => {
    if (typeof inputValue === 'string') {
      return `"${inputValue}"`
    } else if (typeof inputValue === 'number') {
      return inputValue.toString()
    } else if (typeof inputValue === 'boolean') {
      return inputValue ? 'true' : 'false'
    } else if (inputValue === null) {
      return 'nil'
    } else if (Array.isArray(inputValue)) {
      return `[${inputValue
        .map((v) => TypeConvertions.fieldDefault(v))
        .join(', ')}] of ${
        inputValue[0] ? TypeConvertions.fieldDefault(inputValue[0]) : 'Nil'
      }`
    } else if (typeof inputValue === 'object') {
      if (
        Object.values(inputValue).some(
          (v) =>
            v == 'autoincrement' ||
            v == 'dbgenerated' ||
            v == 'uuid' ||
            v == 'cuid' ||
            v == 'auto' ||
            v == 'now',
        )
      ) {
        return ''
      }
      return `{${Object.keys(inputValue)
        .map((k) => `${k}: ${TypeConvertions.fieldDefault(inputValue[k])}`)
        .join(', ')}}`
    } else {
      return 'nil'
    }
  },
}
