import { NAVIGATION } from '@/constants/navigation';
import NoScrollLink from '@/components/NoScrollLink';
import Link from 'next/link';

interface Props {
  className?: string;
  ulClassName?: string;
}

const Navigation = ({ className, ulClassName }: Props) => (
  <nav className={`${className && className}`} aria-label="Main Navigation">
    <ul className={`flex gap-8 ${ulClassName && ulClassName}`}>
      {NAVIGATION.map(({ label, href, classes, submenu }) => (
        <li key={label} className={`${classes || ''}`}>
          <NoScrollLink href={href}>
            <span>{label}</span>
          </NoScrollLink>
          {submenu && (
            <ul className="flex flex-col" aria-label={`${label} submenu`}>
              {submenu.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href}>
                    <span title={label}>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </nav>
);
export default Navigation;
