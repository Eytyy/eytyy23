import { groq } from 'next-sanity';

// Current Pages IDs
export const homeID = `*[_type == 'generalSettings'][0].home->_id`;
export const workID = `*[_type == 'generalSettings'][0].work->_id`;
export const blogID = `*[_type == 'generalSettings'][0].blog->_id`;
export const errorID = `*[_type == 'generalSettings'][0].error->_id`;

// ------------------- Blocks, Modules, and Fields ------------------- //
const links = `
  _type == "navLink" => {
    ...,
    "link": url
  },
  _type == "navPage" => {
    ...,
    "page": page-> {
      _type,
      title,
      "slug": slug.current
    }
  }
`;

const menu = `
  items[]{
    _key, _type, title,
    ${links}
  }
`;

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

const image_block = `_type == 'imageBlock' => {
  ...,
  "_type": "imageBlock",
  image {
    ...,
    asset->
  }
}`;

const video_block = ` _type == 'videoBlock' => {
  "_type": "videoBlock",
  autoPlay, loop, cropTop,
  "url": file.asset->.url,
  "color": background,
}`;

const media_module = `_type == 'mediaModule' => {
  format,
  _type,
  media[] {
    _type, _key, addCaption, caption, format,
    ${image_block},
    ${video_block},
  }
}`;

const content_block_fields = `
  ...,
  ${image_block},
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

const content_module = `_type == 'contentModule' => {
  ${content_block_fields}
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

export const column_blocks = `
  ...,
  ${links},
  ${menu_block},
  ${mega_menu_block},
  ${blog_post_modules},
  ${projects_module},
  ${content_module}
`;

export const main_blocks = `
  ...,
  ${media_module},
  ${content_module},
  ${sketch_block},
  ${sketch_collection_block},
  ${image_block},
  ${video_block},
`;

export const pageFields = `
  title,
  "slug": slug.current,
  "leftCol": {
     "top": topLeft[][0]{ ${column_blocks} },
     "center": leftCenter[][0]{ ${column_blocks} },
     "bottom": bottomLeft[][0]{ ${column_blocks} }
  },
  "main": mainBlocks[]{ ${main_blocks} },
  "rightCol": right[0] { ${column_blocks} },
  footer[0] {
    ${column_blocks}
  }
`;

// ------------------------ Queries ------------------------ //
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
    "block_1": mobileMenuFirstBlock[][0] { ${column_blocks} },
    "block_2": mobileMenuSecondtBlock[][0] { ${column_blocks} },
    "footer": mobileMenuFooter[][0] { ${column_blocks} },
  }
}`;

export const allProjectsSlugQuery = `*[ _type == "project" && defined(slug) ].slug.current`;

export const allPagesSlugQuery = `*[ _type == "page" && defined(slug) ].slug.current`;

export const projectBySlugQuery = `{
  "page": *[ _type == "project" && slug.current == $slug ][0] {
    title,
    description { ${content_block_fields} },
    ${main_blocks},
    seo,
  },
  "site": ${siteQuery}
}`;

export const errorPageQuery = `
  *[_type == "page" && _id == ${errorID}] | order(_updatedAt desc)[0]{
    "id": _id,
    hasTransparentHeader,
    ${main_blocks},
    title,
    seo
  }
`;

export const porfolioPageQuery = `
  *[_type == "cv"][0]{
    sections[] {
      ...,
      _key,
      title,
      anchor,
      theme,
      link,
      description[] {
        ${content_block_fields}
      },
      mainBlocks[] {
        ${main_blocks}
      }
    }
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
