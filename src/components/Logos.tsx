import Link from 'next/link';
import LetterLogo from './LetterLogo';
import Logo from './Logo';

export default function Logos() {
  return (
    <>
      <Link href="/" className="md:hidden">
        <LetterLogo />
      </Link>
      <Link href="/" className="hidden md:block">
        <Logo />
      </Link>
    </>
  );
}
