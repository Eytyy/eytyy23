import { groq } from 'next-sanity';

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

const nav_link = `_type == "navLink" => {
  "link": url
}`;
const nav_page = `_type == "navPage" => {
  page-> { title, "slug": slug.current  }
}`;

const menu_block = `_type == "menuBlock" => {
  expand, orientation, isDropdown, "canToggle": toggle,
  menu-> { ${menu} }
}`;

const mega_menu_block = `_type == "megaMenuBlock" => {
  expand, orientation, "canToggle": toggle,
  items[] {
    _key, _type,
    _type == 'navGroup' => { ${menu}  },
    _type == 'navMenu' => {
      title,
      menu-> {
        ${menu},
        _type == 'navMenu' => {  menu-> { ${menu} }  }
      }
    }
  }
}`;

const sketch_block = `_type == "sketchBlock" => {
  "sketch": sketch->
}`;

const sketch_collection_block = `_type == "sketchCollectionModule" => {
  "active" : active->._id,
  hasInlineNavigation,
  sketches[]-> {
    _id,
    title,
    theme,
    description,
    "slug": slug.current,
  },
}`;

const tags = `tags[]-> {
  _id,
  "slug": slug.current,
  title,
}`;

const blog_post_modules = ` _type == 'blogPostsModule' => {
  referenceType == 'auto' => {
    'content': *[_type == 'blogPost' && status != 'draft'] {
      ...,
      "slug": 'blog/' + slug.current,
      ${tags}
    }
  },
  referenceType == 'manual' => {
    showFilters,
    content[]-> {
      ...,
      "slug": 'blog/' + slug.current,
      ${tags}
    }
  }
}`;

const projects_module = `_type == 'projectsModule' => {
  referenceType == 'auto' => { 'content': *[_type == 'blogPost'] },
  referenceType == 'manual' => { content[]-> }
}`;

export const blocks = `
  ...,
  ${nav_link},
  ${nav_page},
  ${menu_block},
  ${mega_menu_block},
  ${sketch_block},
  ${sketch_collection_block},
  ${blog_post_modules},
  ${projects_module}
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
  },
  "mobile_menu": *[_type == "generalSettings"][0] {
    "block_1": mobileMenuFirstBlock[][0] { ${blocks} },
    "block_2": mobileMenuSecondtBlock[][0] { ${blocks} },
    "footer": mobileMenuFooter[][0] { ${blocks} },
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

export const indexQuery = groq`
  *[_type == "page" && _id == *[_type=="generalSettings"][0].home->_id ][0] {
    ${pageFields}
  }
`;

export const blogQuery = groq`
  *[_type == "page" && _id == *[_type=="generalSettings"][0].blog->_id ][0] {
    ${pageFields}
  }
`;

export const blogPostSlugsQuery = groq`*[_type == 'blogPost' && defined(slug) && status != 'draft'][].slug.current`;

export const blogPostQuery = groq`*[_type == 'blogPost' && slug.current == $slug][0] {
  ...,
  "slug": slug.current
}`;

export const pageSlugsQuery = groq`
  *[ _type == "page" && defined(slug) && slug.current && !(_id in [
    ${homeID},
    ${workID},
    ${errorID},
    ${blogID},
  ]) ].slug.current
`;

export const pageQuery = groq`*[_type == "page" && slug.current == $slug ][0]{
  ${pageFields}
}`;

export const filtersQuery = groq`[{
  "name": 'tags',
  "filters": *[ _type == 'tag' &&
    slug.current in array::unique(
      *[_type == 'blogPost' && defined(slug) && status != 'draft'][]
      .tags[]->.slug.current
    )
  ] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
}]`;

export const sketchSlugsQuery = groq`*[_type == 'sketch' && defined(slug)][].slug.current`;

export const sketchQuery = groq`*[_type == 'sketch' && slug.current == $slug][0]{
  ...,
  "slug": slug.current
}`;
