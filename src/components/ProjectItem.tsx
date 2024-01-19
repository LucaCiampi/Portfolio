import { motion, useIsPresent } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Frame, { BorderStyles } from "./Frame";

interface Props {
  project: Project;
}

export type Project = {
  title: string;
  description: string;
  date: number;
  slug: string;
  thumbnail: string;
  content: string;
  technos: string[];
  url?: string;
  repo?: string;
  company?: string;
  media?: {
    type: string;
    url: string;
    credits?: string;
  }[];
  layout?: {
    orientation: string;
    design: number;
  };
};

const ProjectItem = ({ project }: Props) => {
  const isPresent = useIsPresent();
  const animations = {
    style: {
      position: isPresent ? "static" : "absolute",
    },
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    // transition: { type: "spring", stiffness: 900, damping: 40 },
  };

  console.log(project);

  return (
    <motion.div {...animations} layout>
      <Link
        href={`/projects/${project.slug}`}
        key={project.slug}
        className="cursor-none"
      >
        <ProjectItemFrame project={project}>
          <Image
            src={`images/projects/${project.slug}/${project.thumbnail}`}
            alt={project.title}
            width={project.layout?.orientation == "horizontal" ? 9 : 16}
            height={project.layout?.orientation == "horizontal" ? 16 : 9}
            layout="responsive"
          />
        </ProjectItemFrame>
      </Link>
    </motion.div>
  );
};

interface ProjectItemFrameProps {
  project?: Project;
  children?: React.ReactNode;
}

const ProjectItemFrame = ({ project, children }: ProjectItemFrameProps) => {
  switch (project?.layout?.design) {
    case 1:
      return (
        <div className="relative">
          <div className="absolute -left-20 -top-20 w-full -bottom-20 bg-background-darker -z-10">
            <div className="absolute top-0 left-0 w-3/4 h-5/6 pattern-2"></div>
          </div>
          <Frame borderStyle={BorderStyles.solid}>{children}</Frame>
          <div className="mt-12 mb-4 flex gap-2 items-end">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <div className="text-sm">{project.technos.join(", ")}</div>
          </div>
          <hr />
        </div>
      );

    case 2:
      return (
        <div className="bg-marine text-white p-8">
          {children}
          <div className="mt-12 mb-4 flex gap-2 items-end">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <div className="text-sm">{project.technos.join(", ")}</div>
          </div>
          <hr />
        </div>
      );

    case 3:
      return (
        <div className="bg-marine text-white p-8">
          {children}
          <div className="mt-12 mb-4 flex gap-2 items-end">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <div className="text-sm">{project.technos.join(", ")}</div>
          </div>
          <hr />
        </div>
      );

    default:
      return null;
  }
};

export default ProjectItem;
