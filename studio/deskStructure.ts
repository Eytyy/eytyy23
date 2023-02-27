import {projects} from './structure/work'
import settings from './structure/settings'
import pages from './structure/pages'
import menus from './structure/menus'
import {StructureBuilder, StructureResolverContext} from 'sanity/desk'

const excluded = ['page', 'project', 'product', 'menu', 'generalSettings', 'seoSettings']

export default (S: StructureBuilder, context: StructureResolverContext) => {
  return S.list()
    .title('Content')
    .items([
      pages(S, context),
      S.divider(),
      projects(S),
      S.divider(),
      settings(S),
      menus(S),
      // @ts-ignore
      ...S.documentTypeListItems().filter((listItem) => !excluded.includes(listItem.getId())),
    ])
}
