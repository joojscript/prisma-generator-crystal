import { genModel } from '../../src/generators/genModel'
import { getSampleDMMF } from './__fixtures__/getSampleDMMF'

test('model generation', async () => {
  const sampleDMMF = await getSampleDMMF()

  sampleDMMF.datamodel.models.forEach((modelInfo) => {
    expect(genModel(modelInfo, {})).toMatchSnapshot(modelInfo.name)
  })
})
