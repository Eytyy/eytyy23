import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { codeInput } from '@sanity/code-input';
import { media } from 'sanity-plugin-media';
import deskStructure from '@/sanity/deskStructure';

import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
} from '@/lib/sanity.api';
import { schema } from './src/sanity/schema';
import { productionUrl } from '@/plugins/productionUrl';
import { page } from '@/sanity/schema/documents';
import blogPost from '@/sanity/schema/documents/blog-post';

export default defineConfig({
  name: 'default',
  title: 'eytyy',

  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    media(),
    codeInput(),
    productionUrl({
      apiVersion,
      previewSecretId,
      types: [page.name, blogPost.name],
    }),
  ],
});
