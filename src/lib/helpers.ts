export function blocksToText(blocks: any[], opts = {}): string {
  const defaults = { nonTextBehavior: 'remove' };

  const options = Object.assign({}, defaults, opts);
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove'
          ? ''
          : `[${block._type} block]`;
      }

      return block.children.map((child: any) => child.text).join('');
    })
    .join('\n\n');
}

export function getInternalLink(_type: string, slug: string): string {
  switch (_type) {
    case 'post':
      return `/blog/${slug}`;
    case 'project':
      return `/projects/${slug}`;
    default:
      return `/${slug}`;
  }
}

export const isBrowser = typeof window !== 'undefined';
