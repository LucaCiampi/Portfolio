import { motion, useIsPresent } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface Props {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
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

const ProjectItem = ({ children, className, onClick, project }: Props) => {
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

  return (
    <motion.div {...animations} layout>
      <Link
        href={`/projects/${project.slug}`}
        key={project.slug}
        className="cursor-none"
      >
        {project.title}
        <Image
          src={`images/projects/${project.slug}/${project.thumbnail}`}
          alt={project.title}
          width={project.layout?.orientation == "horizontal" ? 9 : 16}
          height={project.layout?.orientation == "horizontal" ? 16 : 9}
          layout="responsive"
        />
      </Link>
    </motion.div>
  );
};

export default ProjectItem;
