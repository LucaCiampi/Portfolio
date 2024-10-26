import Frame, { BorderStyles } from '@/components/projects/Frame';

interface Props {
  project?: Project;
  children?: React.ReactNode;
}

const ProjectItemFrame = ({ project, children }: Props) => {
  switch (project?.layout?.design) {
    case 1:
      return (
        <div className="relative text-brown">
          <div className="absolute -left-6 top-6 w-full -bottom-6 bg-background-darker -z-10">
            <div className="absolute top-0 left-0 w-3/4 h-5/6 pattern-2"></div>
          </div>
          <Frame borderStyle={BorderStyles.solid}>{children}</Frame>
          <hr className="mt-6 mb-4 border-brown" />
          <div className="flex gap-2 flex-wrap items-end">
            <h3 className="text-xl font-bold highlight">{project.title}</h3>
            <div className="text-sm">{project.technos.join(', ')}</div>
          </div>
        </div>
      );

    case 2:
      return (
        <div className="relative text-background">
          <div className="absolute left-6 -top-4 -right-6 bottom-8 bg-green -z-10"></div>
          <div className="flex gap-2 flex-wrap items-end justify-end pl-8">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <div className="text-sm">{project.technos.join(', ')}</div>
          </div>
          <hr className="mt-4 mb-6 border-background-darker w-2/3 ml-auto" />
          {children}
        </div>
      );

    case 3:
      return (
        <div className="relative">
          <div className="absolute -left-6 -top-12 right-6 bottom-6 bg-grey -z-10"></div>
          <div className="flex gap-2 flex-wrap items-end">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <div className="text-sm">{project.technos.join(', ')}</div>
          </div>
          <hr className="mt-4 mb-8 border-text w-2/3" />
          {children}
        </div>
      );

    default:
      return (
        <div className="relative text-brown">
          <div className="absolute -left-10 -top-10 w-full -bottom-10 bg-background-darker -z-10">
            <div className="absolute top-0 left-0 w-3/4 h-5/6 pattern-2"></div>
          </div>
          <Frame borderStyle={BorderStyles.solid}>{children}</Frame>
          <div className="mt-12 mb-4 flex gap-2 flex-wrap items-end">
            <h3 className="text-xl font-bold">{project?.title}</h3>
            <div className="text-sm">{project?.technos.join(', ')}</div>
          </div>
          <hr className="border-brown" />
        </div>
      );
  }
};

export default ProjectItemFrame;
