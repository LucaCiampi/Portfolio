interface Project {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  technos: string[];
  content: string;
  company?: string;
  url?: string;
  media?: Media[];
}
