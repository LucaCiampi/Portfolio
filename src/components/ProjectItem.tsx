import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ProjectItemFrame from '@/components/ProjectItemFrame';

interface Props {
  project: Project;
}

const ProjectItem = ({ project }: Props) => {
  const animations = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

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
            width={project.layout?.orientation == 'horizontal' ? 9 : 16}
            height={project.layout?.orientation == 'horizontal' ? 16 : 9}
            // TODO: remove layout (deprecated)
            layout="responsive"
          />
        </ProjectItemFrame>
      </Link>
    </motion.div>
  );
};

export default ProjectItem;
