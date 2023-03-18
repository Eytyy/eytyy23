import { MdOutlineWorkspaces } from 'react-icons/md';
import { StructureBuilder } from 'sanity/desk';
import PreviewPane from '../components/PreviewPane';

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
              S.view
                .component(({ document }) => (
                  <PreviewPane document={document} />
                ))
                .id(documentId)
                .title('Preview'),
            ])
        )
    );
