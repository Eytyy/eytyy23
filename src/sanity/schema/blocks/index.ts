import {CgMenuGridO} from 'react-icons/cg'
import {FaExternalLinkSquareAlt, FaImage, FaImages, FaLink, FaVideo} from 'react-icons/fa'
import {IoMdCube} from 'react-icons/io'
import {MdAnimation, MdMoreHoriz} from 'react-icons/md'
import {TbPlugConnected, TbTag} from 'react-icons/tb'

export {default as videoBlock} from './video'
export {default as imageBlock} from './image'
export {default as contentBlock} from './content'
export {default as advancedContentBlock} from './advanced-content'
export {default as sketchBlock} from './sketch'
export {default as menuBlock} from './menu'
export {default as megaMenuBlock} from './mega-menu'

export const blocks = [
  {type: 'mediaModule', icon: FaImages},
  {type: 'imageBlock', icon: FaImage},
  {type: 'videoBlock', icon: FaVideo},
  {type: 'sketchBlock', icon: MdAnimation},

  {type: 'sketchCollectionModule', icon: MdAnimation},
  {type: 'projectsModule', icon: TbPlugConnected},
  {type: 'blogPostsModule', icon: TbPlugConnected},
  {type: 'contentModule', icon: IoMdCube},
]

export const column_blocks = [
  {type: 'contentModule', icon: IoMdCube},
  {type: 'tagsModule', icon: TbTag},
  {type: 'menuBlock', icon: MdMoreHoriz},
  {type: 'megaMenuBlock', icon: CgMenuGridO},
  {type: 'navLink', icon: FaExternalLinkSquareAlt},
  {type: 'navPage', icon: FaLink},
  {type: 'navStatic', icon: FaLink},
]
