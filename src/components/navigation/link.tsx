import InternalLink from './Internal';
import ExternalLink from './External';
import clsx from 'clsx';
import { MenuType } from './types';

type Props = MenuType['items'][number] & {
  children?: React.ReactNode;
  className?: string;
};
export default function CustomLink(props: Props) {
  const { _type, title, className, children } = props;
  if (_type === 'navPage') {
    if (!props.slug) {
      return <div className={clsx(className)}>{title}</div>;
    }
    return (
      <InternalLink slug={props.slug} className={className}>
        {children}
      </InternalLink>
    );
  }
  return (
    <ExternalLink link={props.url} className={className}>
      {children}
    </ExternalLink>
  );
}
