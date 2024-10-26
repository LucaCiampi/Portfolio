import { NAVIGATION } from '@/constants/navigation';
import NoScrollLink from '@/components/links/NoScrollLink';
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
                  <NoScrollLink href={href}>
                    <span title={label}>{label}</span>
                  </NoScrollLink>
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
