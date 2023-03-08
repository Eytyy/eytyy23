import InternalLink from './Internal';
import ExternalLink from './External';
import { MenuItemProps } from './types';

export default function CustomLink(props: MenuItemProps) {
  const { _type, title } = props;
  if (_type === 'navPage') {
    return (
      <InternalLink
        title={title}
        slug={props.page.slug}
        _type={props.page._type}
      />
    );
  }
  return <ExternalLink title={title} link={props.url} />;
}
