import { NAVIGATION } from '@/constants/navigation-constants';
import NoScrollLink from '@/components/NoScrollLink';
import Link from 'next/link';
import clsx from 'clsx';

interface Props {
  className?: string;
  ulClassName?: string;
}

const Navigation = ({ className, ulClassName }: Props) => (
  <nav className={clsx(className)} aria-label="Main Navigation">
    <ul className={clsx('flex gap-8', ulClassName)}>
      {NAVIGATION.map(({ label, href, classes, submenu }) => (
        <li key={label} className={clsx(classes)}>
          <a href={href}>
            <span className="text-lg dynamic-underline">{label}</span>
          </a>
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
