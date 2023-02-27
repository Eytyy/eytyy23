import {StructureBuilder} from 'sanity/desk'

import {MdArticle} from 'react-icons/md'

import {BsType} from 'react-icons/bs'

export const posts = (S: StructureBuilder) =>
  S.listItem()
    .title('Blog Posts')
    .icon(BsType)
    .child(
      S.documentTypeList('post')
        .title('Blog Posts')
        .child((documentId) => S.document().documentId(documentId).schemaType('post'))
    )

export const blog = (S: StructureBuilder) =>
  S.documentListItem().id('blog').icon(MdArticle).title('Blog').schemaType('blog')
