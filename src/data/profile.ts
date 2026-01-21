export type LinkSet = {
    github: string;
    linkedin: string;
    dribbble: string;
    email: string; // mailto:
    whatsapp: string; // https://wa.me/...
    cv: string; // /cv/...
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

export const profile: Profile = {
    name: "Ellin Naif Shaya",
    title: "Front-End Developer",
    tagline:
        "“Consistency is my strength — I transform concepts into thoughtful, high-quality digital experiences, no matter the challenge.”",
    location: "Syria (Remote-ready)",

    links: {
        github: "https://github.com/elin23",
        linkedin: "https://www.linkedin.com/in/ellinshaia",
        dribbble: "https://dribbble.com/your-handle",
        email: "mailto:elinshaia23@gmail.com",
        whatsapp: "https://wa.me/00963959902149",
        cv: "/cv/Ellin-Naif-Shaya-CV.pdf",
    },

    skills: {
        languages: ["HTML", "CSS", "JavaScript", "TypeScript", "Python", "C#"],
        frontend: ["React", "Next.js", "Tailwind CSS", "Bootstrap"],
        design: ["Figma"],
    },

    webProjects: [
        {
            title: "Learnify Courses",
            image: "/imgs/project-9.png",
            live: "https://learnify-courses-lime.vercel.app/",
            github: "https://github.com/Elin23/LearnifyCourses",
            tags: ["React", "TypeScript", "Tailwind"],
            desc: "An online courses platform featuring a clean UI, course listings, and a responsive design focused on user-friendly learning experiences.",
        },
        {
            title: "Estatien | Real Estate",
            image: "/imgs/project-1.png",
            live: "https://estatein-team-x1.netlify.app/",
            github: "https://github.com/Elin23/Estatein-GraduationProject",
            tags: ["React", "TypeScript", "Tailwind", "Firebase", "Redux"],
            desc: "Modern Real Estate Website UI with responsive layout and smooth interactions.",
        },
        {
            title: "Estatien | Dashboard",
            image: "/imgs/project-2.png",
            live: "estatein-admindashboard.netlify.app/",
            github: "https://github.com/Elin23/Estatein-AdminDashboard",
            tags: ["React", "TypeScript", "Tailwind", "Firebase", "Redux"],
            desc: "The dashboard enables administrators and authorized users to manage Estatien Real Estate’s platform efficiently.",
        },
        {
            title: "YourBank | Digital Bank",
            image: "/imgs/project-3.png",
            live: "https://elin23.github.io/YourBank/",
            github: "https://github.com/Elin23/YourBank",
            tags: ["React", "JavaScript", "CSS"],
            desc: "YourBank is a digital banking platform designed for users seeking an efficient and visually appealing solution for managing their finances.",
        },
        {
            title: "The Blog ",
            image: "/imgs/project-4.png",
            live: "https://elin23.github.io/TheBlog-task-6-/",
            github: "https://github.com/Elin23/TheBlog-task-6-",
            tags: ["React", "TypeScript", "Tailwind", "Redux"],
            desc: "A blogging platform UI that focuses on content readability, clean design, and structured presentation of articles.",
        },
        {
            title: "Tours 2 Tuscany ",
            image: "/imgs/project-5.png",
            live: "https://tours2-tuscany.vercel.app/",
            github: "https://github.com/Elin23/Tours2Tuscany-task-7-",
            tags: ["Next.js", "TypeScript", "Tailwind"],
            desc: "A travel website showcasing tour packages with engaging visuals, clear sections, and a responsive user experience.",
        },
        {
            title: "Little Learners ",
            image: "/imgs/project-6.png",
            live: "https://little-learners-five.vercel.app/",
            github: "https://github.com/Elin23/Task-3-Little-Learners",
            tags: ["React", "JavaScript", "CSS"],
            desc: "An educational website designed for children, featuring friendly visuals, simple navigation, and an engaging layout.",
        },
        {
            title: "Flora ",
            image: "/imgs/project-7.png",
            live: "https://elin23.github.io/task-4-flora/",
            github: "https://github.com/Elin23/task-4-flora",
            tags: ["React", "TypeScript", "CSS"],
            desc: "A visually appealing landing page for a floral brand, focusing on aesthetics, smooth layout, and responsive design.",
        },
        {
            title: "SawBook ",
            image: "/imgs/project-8.png",
            live: "https://book-saw-ten.vercel.app/",
            github: "https://github.com/Elin23/BookSaw",
            tags: ["HTML", "JavaScript", "CSS"],
            desc: "A bookstore website that displays books in a structured way with simple interactions and a clean, classic design.",
        },
    ],

    uiuxProjects: [
        {
            title: "Dashboard Concept",
            image: "/uiux/dashboard.png",
            dribbble: "https://dribbble.com/shots/xxxx",
            tags: ["Figma", "Design System", "UX"],
            desc: "A clean, scalable dashboard concept with elegant spacing & hierarchy.",
        },
    ],

    // ✅ مهم: خليهم فاضيين “فعليًا” بدون comments داخل array
    experience: [
        {
            place: "Datex (Desktop Application)",
            position: "Founder & Front-End Developer",
            from: "Dec 2025",
            to: "Present",
            desc: "Founded and developed a desktop application using modern front-end technologies. Led architecture decisions, implemented performance-focused UI, and applied best practices for scalability and maintainability.",
        },
        {
            place: "Focal X Agency (Remote, Contract)",
            position: "Front-End Developer",
            from: "May 2025",
            to: "Nov 2025",
            desc: "Developed responsive and user-friendly interfaces for dashboards, e-commerce platforms, and corporate websites. Collaborated with designers and back-end developers, contributed to planning, code reviews, and continuous improvement.",
        },
        {
            place: "Freelance",
            position: "Front-End Developer",
            from: "Jun 2025",
            to: "Present",
            desc: "Delivered scalable, performance-focused front-end solutions using React and modern CSS frameworks. Worked closely with clients to translate requirements into accessible and maintainable user interfaces.",
        },
    ],

    internships: [
        {
            place: "Prokoders (Remote)",
            position: "Front-End Development Intern",
            from: "Nov 2025",
            to: "Jan 2026",
            desc: "Participated in structured, discussion-based sessions covering advanced front-end concepts. Completed intensive, high-level tasks with a strong focus on performance optimization and industry best practices.",
        },
        {
            place: "Focal X Agency",
            position: "UI/UX Intern",
            from: "Aug 2025",
            to: "Feb 2026",
            desc: "Assisted in designing wireframes, prototypes, and user flows. Conducted user research and usability testing to enhance usability and overall user experience.",
        },
        {
            place: "Focal X Agency",
            position: "Front-End Development Intern (Advanced Level)",
            from: "Apr 2025",
            to: "Aug 2025",
            desc: "Built scalable web applications using React and Next.js, integrated RESTful APIs and Firebase authentication, and improved SEO, performance, and usability through clean architecture principles.",
        },
        {
            place: "Focal X Agency",
            position: "Front-End Development Intern (Beginner Level)",
            from: "Aug 2024",
            to: "Jan 2025",
            desc: "Completed structured training in HTML, CSS, JavaScript, Tailwind CSS, and React. Led the final project team and delivered the highest-rated project among all submissions.",
        },

    ],

    achievements: [
        {
            year: "2024",
            title: "1st Place Among 88 Trainees — Front-End Internship",
            desc: "Ranked first among approximately 88 front-end trainees across Syria based on technical performance, consistency, and project quality.",
        },
        {
            year: "2024",
            title: "Highest-Rated Final Project — Front-End Internship (Beginner Level)",
            desc: "Led the final project team and delivered the highest-rated project among all internship submissions.",
        },
        {
            year: "2025",
            title: "Highest-Rated Final Project — Front-End Internship (Advanced Level)",
            desc: "Selected as team leader and delivered the top-evaluated final project through strong technical execution and team coordination.",
        },
        {
            year: "2025",
            title: "Launched a Desktop Application Using Web Technologies",
            desc: "Designed and shipped a cross-platform desktop application using modern front-end tools and web-based technologies.",
        },
    ],


    about:
        "I’m Ellin Shaya, an Informatics Engineering (Software Engineering) student at the Syrian Virtual University, with an expected graduation year of 2026. I’m a fast learner who enjoys turning complex requirements into clear plans, structured timelines, and polished interfaces. I combine strong analytical thinking with creative UI execution, and I’m known for reliability, leadership, and delivering on time.",
};
