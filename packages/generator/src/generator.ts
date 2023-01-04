import {
  DMMF,
  generatorHandler,
  GeneratorOptions,
} from '@prisma/generator-helper'
import { logger } from '@prisma/sdk'
import path from 'path'
import { GENERATOR_NAME } from './constants'
import { writeFileSafely } from './utils/writeFileSafely'
import Generators from './generators'
import { Handler } from '@prisma/generator-helper/dist/generatorHandler'

const { version } = require('../package.json')

generatorHandler({
  onManifest() {
    logger.info(`${GENERATOR_NAME}: Registered`)
    return {
      version,
      defaultOutput: '../generated',
      prettyName: GENERATOR_NAME,
      requiresEngines: ['queryEngine'],
    }
  },
  onGenerate: async (options: GeneratorOptions) => {
    for (const _metaType of ['models', 'enums', 'types']) {
      const metaType = _metaType as 'models' | 'enums'
      const meta = options.dmmf.datamodel[metaType]
      if (meta.length === 0) {
        logger.warn(
          `${GENERATOR_NAME}: No ${metaType} found in your Prisma schema`,
        )
      }

      for (const metaInfo of meta) {
        logger.info(
          `${GENERATOR_NAME}: Generating ${metaType} ${metaInfo.name}`,
        )

        const generated = Generators[metaType](
          metaInfo,
          options.generator.config,
        )

        const writeLocation = path.join(
          options.generator.output?.value!,
          `${metaInfo.name}.cr`,
        )

        await writeFileSafely(writeLocation, generated)
      }
    }
  },
} as Handler)
