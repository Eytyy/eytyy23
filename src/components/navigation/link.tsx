import InternalLink from './Internal';
import ExternalLink from './External';
import { MenuItemProps } from './types';
import clsx from 'clsx';

type Props = MenuItemProps & {
  children?: React.ReactNode;
  className?: string;
};
export default function CustomLink(props: Props) {
  const { _type, title, className, children } = props;
  if (_type === 'navPage') {
    if (!props.page) {
      return <div className={clsx(className)}>{title}</div>;
    }
    return (
      <InternalLink
        title={title}
        slug={props.page.slug}
        _type={props.page._type}
        className={className}
      >
        {children}
      </InternalLink>
    );
  }
  return (
    <ExternalLink
      title={title}
      link={props.url}
      className={className}
    >
      {children}
    </ExternalLink>
  );
}
