import Hero from "../component/hero/Hero";
import Footer from "../component/layout/Footer";
import Navbar from "../component/layout/Navbar";
import About from "../component/sections/About";
import Achievements from "../component/sections/Achievements";
import Contact from "../component/sections/Contact";
import Experience from "../component/sections/Experience";
import Skills from "../component/sections/Skills";
import UIUXProjects from "../component/sections/UIUXProjects";
import WebProjects from "../component/sections/WebProjects";
import ScrollToTop from "../component/ui/ScrollToTop";


export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#070712] dark:text-zinc-100">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-fuchsia-300/40 via-indigo-300/30 to-cyan-300/30 blur-3xl dark:from-fuchsia-500/20 dark:via-indigo-500/15 dark:to-cyan-500/15" />
        <div className="absolute bottom-[-140px] right-[-140px] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-rose-300/30 via-purple-300/20 to-sky-300/20 blur-3xl dark:from-rose-500/15 dark:via-purple-500/10 dark:to-sky-500/10" />
      </div>
      <ScrollToTop />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <WebProjects />
        {/* <UIUXProjects /> */}
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
