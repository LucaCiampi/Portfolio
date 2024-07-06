import ExternalLink from './ExternalLink';
import Github from 'public/images/social/github.svg';
import Linkedin from 'public/images/social/linkedin.svg';
import Arrow from '@/components/Arrow';

interface Props {
  name: string;
  href: string;
  className?: string;
  color?: string;
}

const ExternalLinkSocial = ({ name, href, className, color }: Props) => {
  const properName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  const IconComponent =
    name === 'github' ? Github : name === 'linkedin' ? Linkedin : null;

  return (
    <ExternalLink
      href={href}
      className={`flex items-center gap-2 min-w-60 justify-between ${
        className || ''
      }`}
    >
      <div className="flex items-center gap-6">
        {IconComponent && (
          <IconComponent
            className="max-w-12 w-full"
            color={color ?? '#363636'}
          />
        )}
        <span className="text-2xl" title={properName}>
          {properName}
        </span>
      </div>
      <Arrow large />
    </ExternalLink>
  );
};

export default ExternalLinkSocial;
