import { groq } from 'next-sanity';

// Current Pages IDs
export const homeID = `*[_type == 'generalSettings'][0].home->_id`;
export const workID = `*[_type == 'generalSettings'][0].work->_id`;
export const blogID = `*[_type == 'generalSettings'][0].blog->_id`;
export const errorID = `*[_type == 'generalSettings'][0].error->_id`;

// ------------------- Blocks, Modules, and Fields ------------------- //
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
  autoPlay, loop,
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
  "sketch": sketch-> {
    ...,
    "slug": slug.current,
    image {
      ...,
      asset->
    }
  }
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
      "slug": slug.current,
      preview {
        ${media_module}
      }
    }
  }
`;

const menu = `
  title,
  items[]{
    _key, _type, title,
    ${links}
  }
`;

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

export const main_blocks = `
  ...,
  ${media_module},
  ${content_module},
  ${sketch_block},
  ${sketch_collection_block},
  ${image_block},
  ${video_block},
  ${blog_post_modules},
  ${projects_module},
`;

export const pageFields = `
  title,
  "slug": slug.current,
  "main": mainBlocks[]{ ${main_blocks} },
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
  "settings": *[_type == "generalSettings"][0] {
    ...,
    "rootDomain": siteURL,
    mainMenu-> { ${menu} },
    secondaryMenu-> { ${menu} },
    footerMenu-> { ${menu} },
    "mainVisual": mainVisual[0] {
      ${main_blocks}
    }
  },
}`;

export const allProjectsSlugQuery = `*[ _type == "project" && defined(slug) ].slug.current`;

export const allPagesSlugQuery = `*[ _type == "page" && defined(slug) ].slug.current`;

export const errorPageQuery = `
  *[_type == "page" && _id == ${errorID}] | order(_updatedAt desc)[0]{
    "id": _id,
    hasTransparentHeader,
    ${main_blocks},
    title,
    seo
  }
`;

export const indexQuery = groq`
  *[_type == "page" && _id == *[_type=="generalSettings"][0].home->_id ][0] {
    ${pageFields}
  }
`;

export const pageSlugsQuery = groq`
  *[ _type == "page" && defined(slug) && slug.current && !(_id in [
    ${homeID},
    ${errorID},
    ${blogID},
  ]) ].slug.current
`;

export const pageQuery = groq`*[_type == "page" && slug.current == $slug ][0]{
  ${pageFields}
}`;

export const blogQuery = groq`
  *[_type == "page" && _id == *[_type=="generalSettings"][0].blog->_id ][0] {
    ${pageFields}
  }
`;

export const projectQuery = groq`*[_type == 'project' && slug.current == $slug][0] {
  _id,
  "slug": slug.current,
  title,
  theme,
  sections[] {
    _type,
    _key,
    title,
    theme,
    showSideFirst,
    content[] {
      _key,
      _type,
      ${media_module},
      ${image_block},
      ${video_block},
      ${content_module}
    },
    sideContent[] {
      _key,
      title,
      fullWidth,
      content[] {
        ${content_block_fields}
      }
    },
  }
}`;

export const blogPostSlugsQuery = groq`*[_type == 'blogPost' && defined(slug) && status != 'draft'][].slug.current`;

export const blogPostQuery = groq`*[_type == 'blogPost' && slug.current == $slug][0] {
  ...,
  "slug": slug.current
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
