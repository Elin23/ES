export type LinkSet = {
  github: string;
  linkedin: string;
  dribbble: string;
  email: string;    // mailto:
  whatsapp: string; // https://wa.me/...
  cv: "/cv/Ellin-Naif-Shaya-CV.pdf",    // /cv/...
};

export type WebProject = {
  title: string;
  image: string;
  live: string;
  github: string;
  tags: string[];
  desc: string;
};

export type UIUXProject = {
  title: string;
  image: string;
  dribbble: string;
  tags: string[];
  desc: string;
};

export type TimelineItem = {
  place: string;
  position: string;
  from: string;
  to: string;
  desc?: string;
};

export type Achievement = {
  year: string;
  title: string;
  desc?: string;
};

export type Profile = {
  name: string;
  title: string;
  tagline: string;
  location?: string;
  links: LinkSet;
  skills: {
    languages: string[];
    frontend: string[];
    design: string[];
  };
  about: string;
  webProjects: WebProject[];
  uiuxProjects: UIUXProject[];
  experience: TimelineItem[];
  internships: TimelineItem[];
  achievements: Achievement[];

  
};
