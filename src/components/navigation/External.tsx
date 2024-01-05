import clsx from 'clsx';

type Props = {
  link: string;
  children?: React.ReactNode;
  className?: string;
};

export default function ExternalLink({
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
      {children}
    </a>
  );
}
