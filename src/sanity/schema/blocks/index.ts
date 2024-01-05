import { FaImage, FaImages, FaVideo } from 'react-icons/fa';
import { IoMdCube } from 'react-icons/io';
import { MdAnimation } from 'react-icons/md';
import { TbPlugConnected } from 'react-icons/tb';

export { default as videoBlock } from './video';
export { default as imageBlock } from './image';
export { default as contentBlock } from './content';
export { default as advancedContentBlock } from './advanced-content';
export { default as sketchBlock } from './sketch';

export const blocks = [
  { type: 'mediaModule', icon: FaImages },
  { type: 'imageBlock', icon: FaImage },
  { type: 'videoBlock', icon: FaVideo },
  { type: 'sketchBlock', icon: MdAnimation },

  { type: 'sketchCollectionModule', icon: MdAnimation },
  { type: 'blogPostsModule', icon: TbPlugConnected },
  { type: 'contentModule', icon: IoMdCube },
];
