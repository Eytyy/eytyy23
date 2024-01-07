import { StructureBuilder } from 'sanity/desk';
import { BsType } from 'react-icons/bs';
import { CgPen, CgTag } from 'react-icons/cg';

export const posts = (S: StructureBuilder) =>
  S.listItem()
    .title('Blog Posts')
    .icon(BsType)
    .child(
      S.documentTypeList('blogPost')
        .title('Blog Posts')
        .child((documentId) =>
          S.document()
            .documentId(documentId)
            .schemaType('blogPost')
            .views([
              S.view.form(),
            ])
        )
    );

export const tags = (S: StructureBuilder) =>
  S.listItem()
    .title('Tags')
    .icon(CgTag)
    .child(
      S.documentTypeList('tag')
        .title('Tags')
        .child((documentId) =>
          S.document().documentId(documentId).schemaType('tag')
        )
    );

export const blog = (S: StructureBuilder) => {
  return S.listItem()
    .title('Blog')
    .icon(CgPen)
    .child(
      S.list()
        .title('Blog')
        .items([posts(S), tags(S)])
    );
};
