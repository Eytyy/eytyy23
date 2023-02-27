// Current Pages IDs
export const homeID = `*[_type == 'generalSettings'][0].home->_id`;
export const shopID = `*[_type == 'generalSettings'][0].shop->_id`;
export const errorID = `*[_type == 'generalSettings'][0].error->_id`;

export const page = `
  _type,
  "slug": slug.current,
  "isHome": _id == ${homeID},
  "isShop": _id == ${shopID}
`;

const link = `
  _key,
  _type,
  title,
  _type == 'navPage' => {
    "page": page->{ ${page} }
  },
  _type == 'navLink' => {
    url
  }
`;

const menu = `
  items[]{
    ${link},
    _type == 'navDropdown' => {
      dropdownItems[]{ ${link} },
    }
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
  blocks[] {
    ...,
    _type == "navLink" => {
      "link": url
    },
    _type == "navPage" => {
      page-> {
        ...,
        "slug": slug.current
      }
    }
  }
`;

// Main
export const siteQuery = `{
  "rootDomain": *[_type == "generalSettings"][0].siteURL,
    "shop": *[_type == "shopSettings"][0]{
      storeURL,
      cartMessage
    },
    "productCounts": [ {"slug": "all", "count": count(*[_type == "product"])} ] + *[_type == "collection"]{
      "slug": slug.current,
      "count": count(products)
    },
   'header': *[ _type == "headerSettings" ][0] {
     'menuDesktop': menuDesktop-> { ${menu} },
     'menuMobile': menuMobile-> { ${menu} },
   },
   'footer': *[ _type == "footerSettings" ][0] {
     "block1": {
       'title': blockTitle1,
       newsletter
     },
     "block2": {
       'title': blockTitle2,
       'menu': blockMenu2
     },
     "block3": {
       'title': blockTitle3,
       'menu': blockMenu3
     },
     "block4": {
       'title': blockTitle4,
       social
     },

   },
  'defaultSEO': *[ _type == "seoSettings" ][0] {
    "site_title": metaTitle,
    "site_description": metaDesc,
    "share_title": shareTitle,
    "share_image": shareGraphic,
    "share_description": shareDesc,
  }
}`;

export const pageFields = `
  title,
  'slug': slug.current,
  style,
  style == 'creative' => {
    ${blocks}
  },
  style == 'detailed' => {
    modules[]
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
