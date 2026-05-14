import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import profileImg from './assets/profile.png';
import {  
  Mail, Phone, ExternalLink, Download, Moon, Sun,  
  ChevronRight, Award, BookOpen, Code2, Palette,  
  Globe, Cpu, ArrowUpRight, Link, Zap, Star, Briefcase
} from 'lucide-react';

const PORTFOLIO_DATA = {
  name: "Kamaleldin Wasim",
  role: "Frontend Engineer & UI/UX Designer",
  email: "kimowasim123@gmail.com",
  phone: "+201070238755",
  socials: {
    github: "https://github.com/Kamaleldin-Wasim",
    linkedin: "https://linkedin.com/in/kamaleldin-wasim-618036322"
  },
  stats: [
    { label: "Interaction Latency Reduction", value: "25%", icon: <Zap /> },
    { label: "Projects Completed", value: "10+", icon: <Star /> },
    { label: "Graduation Year", value: "2026", icon: <Briefcase /> }
  ],
  projects: [
    {
      title: "LungCare Platform",
      desc: "Optimizing healthcare UX with real-time analytics and high-performance React components.",
      tech: ["React.js", "Tailwind CSS", "Framer Motion"],
      link: "https://lungcare-two.vercel.app/",
      color: "from-sky-400 to-indigo-500"
    },
    {
      title: "Security Portal",
      desc: "Comprehensive service management for high-security firms with complex booking flows.",
      tech: ["React.js", "ES6+", "Bootstrap"],
      link: "https://security-portal-web.vercel.app/ar",
      color: "from-purple-500 to-pink-500"
    }
  ],
  experience: [
    {
      role: "Frontend Developer",
      company: "Security Company Web Portal",
      period: "2026",
      type: "Freelance",
      tasks: [
        "Built a responsive service-request portal using reusable React components.",
        "Improved cross-device UX and reduced interaction latency by 25%."
      ]
    },
    {
      role: "UI/UX Designer",
      company: "Saudi Heritage Digital Experience",
      period: "2025",
      type: "Freelance",
      tasks: [
        "Designed high-fidelity Figma prototypes for cultural storytelling.",
        "Translated complex heritage data into intuitive user flows."
      ]
    }
  ],
  education: {
    degree: "B.Sc. in Computer Science",
    school: "Egyptian E-Learning University (EELU)",
    period: "2022 — 2026",
    focus: "Advanced Logic Systems, Algorithm Design, Semantic Web"
  },
  certifications: [
    { title: "Meta Front-End Specialization", issuer: "Coursera" },
    { title: "NVIDIA AI for All", issuer: "NVIDIA" },
    { title: "UI/UX Design Diploma", issuer: "Route" },
    { title: "React.js Training", issuer: "ITI" }
  ],
  skills: {
    frontend: ["React.js", "JavaScript", "TypeScript", "Next.js", "Tailwind"],
    design: ["Figma", "UI/UX Designer", "Design Systems", "Prototyping"],
    core: ["Algorithm Design", "Semantic Web", "Git", "REST APIs"]
  }
};

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="card-modern group overflow-hidden p-0"
  >
    <div className={`h-80 bg-gradient-to-br ${project.color} relative flex items-center justify-center`}>
      <Code2 size={120} className="text-white opacity-20 scale-[2] group-hover:scale-[2.5] transition-transform duration-1000" />
      <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
        {project.tech.map(t => (
          <span key={t} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-bold text-white uppercase tracking-widest border border-white/10">{t}</span>
        ))}
      </div>
    </div>
    <div className="p-10">
      <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
      <p className="opacity-60 leading-relaxed mb-8">{project.desc}</p>
      <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sky-500 font-bold hover:gap-4 transition-all uppercase text-xs tracking-widest">
        Live Experience <ExternalLink size={16} />
      </a>
    </div>
  </motion.div>
);

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-500 mesh-bg">
      
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-sky-400 z-[60] origin-left" style={{ scaleX }} />
      
      {/* Navbar */}
      <nav className={`nav-glass ${scrolled ? 'py-4 shadow-xl' : 'py-8 bg-transparent border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-10 flex justify-between items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold font-heading tracking-tighter">
            Kamaleldin<span className="text-sky-400">.</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-10 text-[11px] font-bold tracking-[0.2em] uppercase opacity-50">
            {['Work', 'Stack', 'Experience', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-sky-400 hover:opacity-100 transition-all">{item}</a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <a href={PORTFOLIO_DATA.socials.github} target="_blank" rel="noreferrer" className="px-6 py-2.5 bg-white text-slate-950 rounded-2xl text-[11px] font-bold tracking-widest uppercase hover:scale-105 active:scale-95 transition-all">
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center pt-20 px-10 overflow-hidden">
          <div className="hero-glow top-1/4 -left-20 w-[600px] h-[600px] bg-sky-400" />
          <div className="hero-glow bottom-1/4 -right-20 w-[600px] h-[600px] bg-indigo-500" />

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-sky-400/10 border border-sky-400/20 rounded-2xl text-sky-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-10">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                Available for Innovation
              </div>
              
              <h1 className="text-7xl md:text-[6.5rem] font-bold font-heading leading-none tracking-tighter mb-10">
                Building <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">
                  Intelligent
                </span> <br />
                Interfaces.
              </h1>
              
              <p className="text-xl md:text-2xl font-light leading-relaxed opacity-60 max-w-xl mb-12">
                I'm <span className="font-bold text-white">Kamaleldin Wasim</span>. Frontend Engineer & UI/UX Designer with a focus on Responsive Design, Semantic web. I engineer performance-driven React applications with a <span className="italic">Interaction Quality.</span>
              </p>
              
              <div className="flex flex-wrap gap-5">
                <a href="#work" className="btn-modern">View Projects <ArrowUpRight size={20} /></a>
                <a href="mailto:kimowasim123@gmail.com" className="px-8 py-4 border border-slate-800 rounded-2xl font-bold hover:bg-slate-900 transition-all flex items-center gap-2">Contact Me</a>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative">
              <div className="relative aspect-square max-w-[500px] mx-auto group">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 to-purple-500/20 rounded-[3.5rem] blur-3xl" />
                <div className="relative h-full w-full bg-slate-900 rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl p-3">
                  <div className="h-full w-full rounded-[2.5rem] overflow-hidden relative">
                    <img src={profileImg} alt="Portrait" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent flex items-end p-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-white">
                        <p className="text-2xl font-bold font-heading">Kamaleldin Wasim</p>
                        <p className="text-[10px] tracking-widest uppercase opacity-60">Frontend Engineer & UI/UX Designer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 px-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {PORTFOLIO_DATA.stats.map((stat, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="card-modern flex items-center gap-6 group">
                <div className="w-14 h-14 bg-sky-400/10 rounded-2xl flex items-center justify-center text-sky-500 group-hover:bg-sky-400 group-hover:text-white transition-all duration-500">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-4xl font-bold font-heading">{stat.value}</p>
                  <p className="text-[10px] font-bold tracking-widest uppercase opacity-40">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="work" className="py-40 px-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold font-heading mb-20 text-center">Selected <span className="text-sky-400">Works</span></h2>
            <div className="grid md:grid-cols-2 gap-10">
              {PORTFOLIO_DATA.projects.map((project, i) => (
                <ProjectCard key={i} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-40 px-10 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-20">
              <h2 className="text-5xl font-bold font-heading">Experience</h2>
            </div>
            <div className="space-y-8">
              {PORTFOLIO_DATA.experience.map((exp, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card-modern">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                      <span className="text-sky-500 text-[10px] font-bold uppercase tracking-widest">{exp.type}</span>
                      <h3 className="text-3xl font-bold mt-2">{exp.role}</h3>
                      <p className="text-lg opacity-60 mt-1">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-4 py-2 bg-sky-400/10 text-sky-500 rounded-xl text-xs font-bold">{exp.period}</span>
                    </div>
                  </div>
                  <ul className="mt-8 space-y-3">
                    {exp.tasks.map((task, j) => (
                      <li key={j} className="flex gap-4 text-sm opacity-60">
                        <ChevronRight size={18} className="text-sky-500 shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Certs */}
        <section className="py-40 px-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
            {/* Education */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-12">
                <BookOpen className="text-sky-400" size={32} />
                <h2 className="text-4xl font-bold font-heading">Education</h2>
              </div>
              <div className="card-modern p-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold">{PORTFOLIO_DATA.education.degree}</h3>
                    <p className="opacity-60 mt-1">{PORTFOLIO_DATA.education.school}</p>
                  </div>
                  <span className="px-4 py-2 bg-sky-400/10 text-sky-500 rounded-xl text-xs font-bold">{PORTFOLIO_DATA.education.period}</span>
                </div>
                <p className="text-sm italic opacity-50 leading-relaxed border-l-2 border-sky-400 pl-6 mt-8">
                  Focusing on {PORTFOLIO_DATA.education.focus}.
                </p>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-12">
                <Award className="text-sky-400" size={32} />
                <h2 className="text-4xl font-bold font-heading">Certifications</h2>
              </div>
              <div className="space-y-4">
                {PORTFOLIO_DATA.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-sky-400/30 transition-colors">
                    <div>
                      <p className="font-bold">{cert.title}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mt-1">{cert.issuer}</p>
                    </div>
                    <ChevronRight className="opacity-20" size={20} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stack */}
        <section id="stack" className="py-40 px-10 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold font-heading mb-24 text-center">Technical <span className="text-sky-400">Stacks</span></h2>
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(PORTFOLIO_DATA.skills).map(([category, items], i) => (
                <motion.div key={category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card-modern text-center group">
                  <div className="w-20 h-20 bg-sky-400/10 rounded-3xl flex items-center justify-center text-sky-500 mx-auto mb-10 group-hover:bg-sky-400 group-hover:text-white transition-all duration-500">
                    {category === 'frontend' ? <Code2 size={32} /> : category === 'design' ? <Palette size={32} /> : <Cpu size={32} />}
                  </div>
                  <h4 className="text-2xl font-bold capitalize mb-8">{category}</h4>
                  <div className="flex flex-wrap justify-center gap-3">
                    {items.map(skill => (
                      <span key={skill} className="px-5 py-2 bg-slate-800 rounded-2xl text-[10px] font-bold uppercase tracking-widest opacity-60">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-60 px-10 text-center relative overflow-hidden">
          <div className="hero-glow top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-sky-400/20" />
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative z-10">
            <h2 className="text-7xl md:text-[10rem] font-bold font-heading tracking-tighter leading-none mb-10">NEXT <br /> <span className="text-sky-400">LEVEL.</span></h2>
            <p className="text-2xl md:text-4xl font-light opacity-50 mb-20 max-w-3xl mx-auto">Currently open for world-class engineering roles & strategic freelance roles.</p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <a href={`mailto:${PORTFOLIO_DATA.email}`} className="btn-modern px-16 py-6 text-2xl rounded-3xl">Email Me</a>
              <a href={`tel:${PORTFOLIO_DATA.phone}`} className="px-16 py-6 border border-slate-800 rounded-3xl text-2xl font-bold hover:bg-slate-900 transition-all">Call Me</a>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-slate-800 px-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
            <p>© 2026 {PORTFOLIO_DATA.name.toUpperCase()}</p>
            <div className="flex gap-10">
              <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors">LinkedIn</a>
              <a href={PORTFOLIO_DATA.socials.github} target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors">GitHub</a>
              <a href="#" className="hover:text-sky-400 transition-colors" onClick={() => window.print()}>RESUME</a>
            </div>
            <p>Made in Egypt</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
