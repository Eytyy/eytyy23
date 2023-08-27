import clsx from 'clsx';

type Props = {
  title: string;
  link: string;
  children?: React.ReactNode;
  className?: string;
};

export default function ExternalLink({
  title,
  link,
  className,
  children,
}: Props) {
  return (
    <a
      target={!link.match('^mailto:|^tel:') ? '_blank' : '_self'}
      rel="noopener noreferrer"
      href={link}
      className={clsx(className)}
    >
      {children} {title}
    </a>
  );
}
