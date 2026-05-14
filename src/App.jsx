import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import profileImg from './assets/profile.png';
import {  
  Mail, Phone, ExternalLink, Download, Moon, Sun,  
  ChevronRight, Award, BookOpen, Code2, Palette,  
  Globe, Cpu, ArrowUpRight, Link, Zap, Star, Briefcase,
  Menu, X
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
    },
    {
      title: "Saudi Heritage Digital Experience",
      desc: "Redesigning the digital presence of Saudi Heritage sites with focus on user experience and engagement.",
      tech: ["Figma","Prototyping","Research","Usability Testing",],
      link: "https://www.figma.com/proto/RQr3GmAzPt6EOcNAMkD8YT/%D8%B9%D8%B1%D8%A7%D9%82%D8%A9-%D8%A7%D9%84%D8%AA%D8%B1%D8%A7%D8%AB-%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A?node-id=0-1&t=2NrsKWPB9xzH9I8Q-1",
      color: "from-blue-500 to-green-500"
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
    <div className={`h-64 md:h-80 bg-gradient-to-br ${project.color} relative flex items-center justify-center`}>
      <Code2 size={100} className="text-white opacity-20 scale-[1.5] md:scale-[2] group-hover:scale-[1.8] md:group-hover:scale-[2.5] transition-transform duration-1000" />
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex flex-wrap gap-2">
        {project.tech.map(t => (
          <span key={t} className="px-2 md:px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[8px] md:text-[9px] font-bold text-white uppercase tracking-widest border border-white/10">{t}</span>
        ))}
      </div>
    </div>
    <div className="p-6 md:p-10">
      <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">{project.title}</h3>
      <p className="text-sm md:text-base opacity-60 leading-relaxed mb-6 md:mb-8">{project.desc}</p>
      <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sky-500 font-bold hover:gap-4 transition-all uppercase text-[10px] md:text-xs tracking-widest">
        Live Experience <ExternalLink size={16} />
      </a>
    </div>
  </motion.div>
);

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Optimized loading experience
    const timer = setTimeout(() => setIsLoading(false), 1200);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Prevent scroll when menu or loader is open
  useEffect(() => {
    if (isMenuOpen || isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen, isLoading]);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Stack', href: '#stack' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen w-full max-w-full bg-slate-950 text-slate-100 transition-colors duration-500 mesh-bg overflow-x-hidden relative">
      
      {/* Preloader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative flex flex-col items-center"
            >
              <div className="text-4xl font-black font-heading tracking-tighter mb-4">
                Kamaleldin<span className="text-sky-400">.</span>
              </div>
              <div className="w-48 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-sky-400"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 h-1 bg-sky-400 z-[70] origin-left w-full" style={{ scaleX }} />
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-[60] w-full transition-all duration-500 ${scrolled ? 'py-4 bg-slate-950/90 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'py-8 bg-transparent border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center w-full">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="text-2xl md:text-3xl font-black font-heading tracking-tighter cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Kamaleldin<span className="text-sky-400">.</span>
          </motion.div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40 hover:opacity-100 hover:text-sky-400 transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <motion.a 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              href={PORTFOLIO_DATA.socials.github} 
              target="_blank" 
              rel="noreferrer" 
              className="px-6 py-2.5 bg-white text-slate-950 rounded-full text-[10px] font-black tracking-widest uppercase hover:bg-sky-400 hover:text-white transition-all duration-500 shadow-lg"
            >
              GitHub
            </motion.a>
          </div>

          {/* Mobile Toggle Button */}
          {!isMenuOpen && (
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-2xl transition-all duration-300"
              aria-label="Open menu"
            >
              <Menu size={28} strokeWidth={2.5} />
            </button>
          )}
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-0 bg-slate-950 z-[100] flex flex-col w-full h-screen overflow-hidden"
            >
              {/* Menu Header */}
              <div className="flex justify-between items-center px-6 py-8 md:px-10">
                <div className="text-2xl md:text-3xl font-black font-heading tracking-tighter">
                  Kamaleldin<span className="text-sky-400">.</span>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-white hover:bg-white/10 rounded-2xl transition-all duration-300"
                  aria-label="Close menu"
                >
                  <X size={32} strokeWidth={2.5} />
                </button>
              </div>

              {/* Menu Links */}
              <div className="flex-1 flex flex-col justify-center items-center gap-10">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl font-bold font-heading tracking-tighter hover:text-sky-400 transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
              
              {/* Menu Footer */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pb-20 flex justify-center gap-8"
              >
                <a href={PORTFOLIO_DATA.socials.github} target="_blank" rel="noreferrer" className="p-4 bg-slate-900 rounded-full hover:bg-sky-400/20 transition-colors"><Code2 /></a>
                <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="p-4 bg-slate-900 rounded-full hover:bg-sky-400/20 transition-colors"><Globe /></a>
                <a href={`mailto:${PORTFOLIO_DATA.email}`} className="p-4 bg-slate-900 rounded-full hover:bg-sky-400/20 transition-colors"><Mail /></a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center pt-28 pb-20 px-6 md:px-10 overflow-hidden">
          <div className="hero-glow top-1/4 -left-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-sky-400 pointer-events-none" />
          <div className="hero-glow bottom-1/4 -right-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-500 pointer-events-none" />

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-sky-400/10 border border-sky-400/20 rounded-2xl text-sky-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 md:mb-10">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                Available for Innovation
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold font-heading leading-[1.1] md:leading-none tracking-tighter mb-8 md:mb-10">
                Building <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">
                  Intelligent
                </span> <br />
                Interfaces.
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed opacity-60 max-w-xl mb-10 md:mb-12">
                I'm <span className="font-bold text-white">Kamaleldin Wasim</span>. Frontend Engineer & UI/UX Designer with a focus on Responsive Design and Semantic Web.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 md:gap-5 w-full sm:w-auto">
                <a href="#work" className="btn-modern justify-center">View Projects <ArrowUpRight size={20} /></a>
                <a href="mailto:kimowasim123@gmail.com" className="px-8 py-4 border border-slate-800 rounded-2xl font-bold hover:bg-slate-900 transition-all flex items-center justify-center gap-2">Contact Me</a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.6 }} 
              className="relative order-1 lg:order-2"
            >
              <div className="relative aspect-square max-w-[320px] md:max-w-[500px] mx-auto group">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 to-purple-500/20 rounded-[2.5rem] md:rounded-[3.5rem] blur-2xl md:blur-3xl" />
                <div className="relative h-full w-full bg-slate-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl p-2 md:p-3">
                  <div className="h-full w-full rounded-[1.8rem] md:rounded-[2.5rem] overflow-hidden relative">
                    <img src={profileImg} alt="Portrait" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent flex items-end p-6 md:p-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-white">
                        <p className="text-xl md:text-2xl font-bold font-heading">Kamaleldin Wasim</p>
                        <p className="text-[8px] md:text-[10px] tracking-widest uppercase opacity-60">Frontend Engineer & UI/UX Designer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 md:py-20 px-6 md:px-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {PORTFOLIO_DATA.stats.map((stat, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="card-modern flex items-center gap-5 md:gap-6 group p-6 md:p-8">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-sky-400/10 rounded-xl md:rounded-2xl flex items-center justify-center text-sky-500 group-hover:bg-sky-400 group-hover:text-white transition-all duration-500">
                  {React.cloneElement(stat.icon, { size: 24 })}
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold font-heading">{stat.value}</p>
                  <p className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase opacity-40">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="work" className="py-24 md:py-40 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-12 md:mb-20 text-center">Selected <span className="text-sky-400">Works</span></h2>
            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              {PORTFOLIO_DATA.projects.map((project, i) => (
                <ProjectCard key={i} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 md:py-40 px-6 md:px-10 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-12 md:mb-20">Experience</h2>
            <div className="space-y-6 md:space-y-8">
              {PORTFOLIO_DATA.experience.map((exp, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card-modern p-6 md:p-10">
                  <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
                    <div>
                      <span className="text-sky-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">{exp.type}</span>
                      <h3 className="text-2xl md:text-3xl font-bold mt-2">{exp.role}</h3>
                      <p className="text-base md:text-lg opacity-60 mt-1">{exp.company}</p>
                    </div>
                    <div className="md:text-right">
                      <span className="inline-block px-4 py-2 bg-sky-400/10 text-sky-500 rounded-xl text-[10px] md:text-xs font-bold">{exp.period}</span>
                    </div>
                  </div>
                  <ul className="mt-6 md:mt-8 space-y-3">
                    {exp.tasks.map((task, j) => (
                      <li key={j} className="flex gap-3 md:gap-4 text-xs md:text-sm opacity-60">
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
        <section className="py-24 md:py-40 px-6 md:px-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-20">
            {/* Education */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-8 md:mb-12">
                <BookOpen className="text-sky-400" size={28} md:size={32} />
                <h2 className="text-3xl md:text-4xl font-bold font-heading">Education</h2>
              </div>
              <div className="card-modern p-8 md:p-10">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold">{PORTFOLIO_DATA.education.degree}</h3>
                    <p className="text-sm md:text-base opacity-60 mt-1">{PORTFOLIO_DATA.education.school}</p>
                  </div>
                  <span className="px-4 py-2 bg-sky-400/10 text-sky-500 rounded-xl text-[10px] md:text-xs font-bold">{PORTFOLIO_DATA.education.period}</span>
                </div>
                <p className="text-xs md:text-sm italic opacity-50 leading-relaxed border-l-2 border-sky-400 pl-4 md:pl-6 mt-6 md:mt-8">
                  Focusing on {PORTFOLIO_DATA.education.focus}.
                </p>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-8 md:mb-12">
                <Award className="text-sky-400" size={28} md:size={32} />
                <h2 className="text-3xl md:text-4xl font-bold font-heading">Certifications</h2>
              </div>
              <div className="space-y-4">
                {PORTFOLIO_DATA.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center justify-between p-5 md:p-6 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-sky-400/30 transition-colors">
                    <div>
                      <p className="text-sm md:font-bold">{cert.title}</p>
                      <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-40 mt-1">{cert.issuer}</p>
                    </div>
                    <ChevronRight className="opacity-20" size={18} md:size={20} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stack */}
        <section id="stack" className="py-24 md:py-40 px-6 md:px-10 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-16 md:mb-24 text-center">Technical <span className="text-sky-400">Stacks</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {Object.entries(PORTFOLIO_DATA.skills).map(([category, items], i) => (
                <motion.div key={category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card-modern text-center group p-8 md:p-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-sky-400/10 rounded-2xl md:rounded-3xl flex items-center justify-center text-sky-500 mx-auto mb-8 md:mb-10 group-hover:bg-sky-400 group-hover:text-white transition-all duration-500">
                    {category === 'frontend' ? <Code2 size={32} /> : category === 'design' ? <Palette size={32} /> : <Cpu size={32} />}
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold capitalize mb-6 md:mb-8">{category}</h4>
                  <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                    {items.map(skill => (
                      <span key={skill} className="px-4 md:px-5 py-1.5 md:py-2 bg-slate-800 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-60">
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
        <section id="contact" className="py-32 md:py-60 px-6 md:px-10 text-center relative overflow-hidden">
          <div className="hero-glow top-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-sky-400/20 pointer-events-none" />
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative z-10">
            <h2 className="text-5xl md:text-7xl lg:text-[10rem] font-bold font-heading tracking-tighter leading-none mb-8 md:mb-10">NEXT <br /> <span className="text-sky-400">LEVEL.</span></h2>
            <p className="text-lg md:text-2xl lg:text-4xl font-light opacity-50 mb-12 md:mb-20 max-w-3xl mx-auto">Currently open for world-class engineering roles & strategic freelance roles.</p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center items-center">
              <a href={`mailto:${PORTFOLIO_DATA.email}`} className="btn-modern w-full sm:w-auto px-10 md:px-16 py-4 md:py-6 text-xl md:text-2xl rounded-2xl md:rounded-3xl justify-center">Email Me</a>
              <a href={`tel:${PORTFOLIO_DATA.phone}`} className="w-full sm:w-auto px-10 md:px-16 py-4 md:py-6 border border-slate-800 rounded-2xl md:rounded-3xl text-xl md:text-2xl font-bold hover:bg-slate-900 transition-all">Call Me</a>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-slate-800 px-6 md:px-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10 text-[8px] md:text-[10px] font-bold tracking-[0.3em] uppercase opacity-40 text-center">
            <p>© 2026 {PORTFOLIO_DATA.name.toUpperCase()}</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors">LinkedIn</a>
              <a href={PORTFOLIO_DATA.socials.github} target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors">GitHub</a>
              <a href="#" className="hover:text-sky-400 transition-colors" onClick={(e) => { e.preventDefault(); window.print(); }}>RESUME</a>
            </div>
            <p>Made in Egypt</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
