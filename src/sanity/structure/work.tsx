import { MdOutlineWorkspaces } from 'react-icons/md';
import { StructureBuilder } from 'sanity/desk';

export const projects = (S: StructureBuilder) =>
  S.listItem()
    .title('Projects')
    .icon(MdOutlineWorkspaces)
    .child(
      S.documentTypeList('project')
        .title('Projects')
        .child((documentId) =>
          S.document()
            .documentId(documentId)
            .schemaType('project')
            .views([
              S.view.form(),
            ])
        )
    );
