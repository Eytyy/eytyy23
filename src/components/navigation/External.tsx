type Props = {
  title: string;
  link: string;
};

export default function ExternalLink({ title, link }: Props) {
  return (
    <a
      target={!link.match('^mailto:|^tel:') ? '_blank' : '_self'}
      rel="noopener noreferrer"
      href={link}
    >
      {title}
    </a>
  );
}
