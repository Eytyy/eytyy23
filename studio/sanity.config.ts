import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {media} from 'sanity-plugin-media'
import deskStructure from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'eytyy',

  projectId: '7zyj2mh0',
  dataset: 'production',

  plugins: [deskTool({structure: deskStructure}), visionTool(), media()],

  schema: {
    types: schemaTypes,
  },
})
