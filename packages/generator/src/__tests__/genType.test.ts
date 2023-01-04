import { genType } from '../../src/generators/genType'
import { getSampleDMMF } from './__fixtures__/getSampleDMMF'

test('type generation', async () => {
  const sampleDMMF = await getSampleDMMF()

  sampleDMMF.datamodel.types.forEach((typeInfo) => {
    expect(genType(typeInfo, {})).toMatchSnapshot(typeInfo.name)
  })
})
