import { motion, useIsPresent } from "framer-motion";

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
      {children}
    </motion.div>
  );
};

export default ProjectItem;
