import {IoSettingsSharp, IoEarth} from 'react-icons/io5'

const settings = (S) =>
  S.listItem()
    .title('Settings')
    .icon(IoSettingsSharp)
    .child(
      S.list()
        .title('Settings')
        .items([
          S.documentListItem()
            .schemaType('generalSettings')
            .title('General Settings')
            .icon(IoSettingsSharp)
            .child(
              S.document()
                .schemaType('generalSettings')
                .documentId('generalSettings')
                .views([S.view.form()])
            ),
          S.documentListItem()
            .schemaType('seoSettings')
            .title('Default SEO / Share')
            .icon(IoEarth)
            .child(
              S.document()
                .schemaType('seoSettings')
                .documentId('seoSettings')
                .views([S.view.form()])
            ),
        ])
    )

export default settings
