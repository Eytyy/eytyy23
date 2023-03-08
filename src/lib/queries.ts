// Current Pages IDs
export const homeID = `*[_type == 'generalSettings'][0].home->_id`;
export const workID = `*[_type == 'generalSettings'][0].work->_id`;
export const blogID = `*[_type == 'generalSettings'][0].blog->_id`;
export const errorID = `*[_type == 'generalSettings'][0].error->_id`;

export const page = `
  _type,
  "slug": slug.current,
  "isHome": _id == ${homeID},
  "isWork": _id == ${workID},
  "isBlog": _id == ${blogID},
  _type == 'project' && format == 'link' => {
    format,
    link
  }
`;

const menu = `
  items[]{
    _key, _type, title,
    _type == 'navPage' => { "page": page-> {
      "slug": slug.current,
    }},
    _type == 'navLink' => { url },
  }
`;

// fields
const media_module_fields = `
  format,
  media[] {
    _type, _key, addCaption, caption, format,
    _type == 'imageBlock' => {
      alt,
      image {
        ...,
        asset->
      }
    },
    _type == 'videoBlock' => {
      autoPlay, loop,
      "url": file.asset->.url,
      "color": background,
    }
  }
`;

const content_block_fields = `
  ...,
  _type == 'imageBlock' => {
    ...,
    image {
      ...,
      asset->
    }
  },
  markDefs[] {
    ...,
    _type == 'internalLink' => {
      ...,
      reference-> {
        _type,
        "slug": slug.current
      }
    }
  },
`;

export const blocks = `
  ...,
  _type == "navLink" => {
    "link": url
  },
  _type == "navPage" => {
    page-> { title, "slug": slug.current  }
  },
  _type == "menuBlock" => {
    expand, orientation, isDropdown, "canToggle": toggle,
    menu-> { ${menu} }
  },
  _type == "megaMenuBlock" => {
    expand, orientation, "canToggle": toggle,
    items[] {
      _key, _type,
      _type == 'navGroup' => {
        ${menu}
      },
      _type == 'navMenu' => {
        title,
        menu-> {
          ${menu},
          _type == 'navMenu' => {
            menu-> { ${menu} }
          }
        }
      }
    }
  },
  _type == "sketchBlock" => {
    "sketch": sketch->
  },
  _type == "sketchCollectionModule" => {
    "active" : active->._id,
    hasInlineNavigation,
    sketches[]-> {
      _id,
      title,
      theme,
      description,
      "slug": slug.current,
    },
  },
  _type == 'blogPostsModule' => {
    referenceType == 'auto' => {
      'content': *[_type == 'blogPost' && status != 'draft'] {
        ...,
        tags[]-> {
          _id,
          "slug": slug.current,
          title,
        },
        "slug": 'blog/' + slug.current
      }
    },
    referenceType == 'manual' => {
      showFilters,
      content[]-> {
        ...,
        tags[]-> {
          _id,
          "slug": slug.current,
          title,
        },
        "slug": 'blog/' + slug.current
      }
    }
  },
  _type == 'projectsModule' => {
    referenceType == 'auto' => {
      'content': *[_type == 'blogPost']
    },
    referenceType == 'manual' => {
      content[]->
    }
  }
`;

// Main
export const siteQuery = `{
  "rootDomain": *[_type == "generalSettings"][0].siteURL,
  "defaultSEO": *[ _type == "seoSettings" ][0] {
    "site_title": metaTitle,
    "site_description": metaDesc,
    "share_title": shareTitle,
    "share_image": shareGraphic,
    "share_description": shareDesc,
  }
}`;

export const pageFields = `
  title,
  "slug": slug.current,
  "leftCol": {
     "top": topLeft[][0]{ ${blocks} },
     "center": leftCenter[][0]{ ${blocks} },
     "bottom": bottomLeft[][0]{ ${blocks} }
  },
  "main": mainBlocks[]{ ${blocks} },
  "rightCol": right[0] { ${blocks} },
  footer[0] {
    ${blocks}
  }
`;

export const getPreviewQuery = (page: string) => {
  switch (page) {
    default:
      return `{
        "page": *[ _type == "page" && slug.current == $page][0] {
          ${blocks}
        },
        "site": ${siteQuery}
      }`;
  }
};

export const allProjectsSlugQuery = `*[ _type == "project" && defined(slug) ].slug.current`;

export const allPagesSlugQuery = `*[ _type == "page" && defined(slug) ].slug.current`;

export const projectBySlugQuery = `{
  "page": *[ _type == "project" && slug.current == $slug ][0] {
    title,
    description[] { ${content_block_fields} },
    mainMedia {${media_module_fields}},
    ${blocks},
    seo,
  },
  "site": ${siteQuery}
}`;

export const errorPageQuery = `
  *[_type == "page" && _id == ${errorID}] | order(_updatedAt desc)[0]{
    "id": _id,
    hasTransparentHeader,
    ${blocks},
    title,
    seo
  }
`;
