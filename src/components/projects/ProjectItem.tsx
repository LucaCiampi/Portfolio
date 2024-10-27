import { motion } from 'framer-motion';
import Image from 'next/image';
import ProjectItemFrame from '@/components/projects/ProjectItemFrame';
import NoScrollLink from '@/components/links/NoScrollLink';

interface Props {
  project: Project;
}

const ProjectItem = ({ project }: Props) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NoScrollLink href={`/projects/${project.slug}`} key={project.slug}>
        <ProjectItemFrame project={project}>
          <Image
            src={`/images/projects/${project.slug}/${project.thumbnail}`}
            alt={project.title}
            width={project.layout?.orientation == 'horizontal' ? 9 : 16}
            height={project.layout?.orientation == 'horizontal' ? 16 : 9}
            className="h-auto w-auto"
          />
        </ProjectItemFrame>
      </NoScrollLink>
    </motion.div>
  );
};

export default ProjectItem;
