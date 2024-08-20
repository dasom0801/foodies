'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './nav-link.module.css';

export default function NavLink({ href, children }) {
  const pathname = usePathname();
  const className = `${classes.link} ${pathname.startsWith(href) ? classes.active : null}`;
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
