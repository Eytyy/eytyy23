import {StructureBuilder} from 'sanity/desk'

import {MdMoreHoriz} from 'react-icons/md'

const menus = (S: StructureBuilder) =>
  S.listItem()
    .title('Menus')
    .icon(MdMoreHoriz)
    .child(
      S.documentTypeList('menu')
        .title('Menus')
        .child((documentId) => S.document().documentId(documentId).schemaType('menu'))
    )

export default menus
