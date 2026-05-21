import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import profileImg from './assets/profile.png';
import {
  Mail, Phone, ExternalLink, Download, Moon, Sun,
  ChevronRight, Award, BookOpen, Code2, Palette,
  Globe, Cpu, ArrowUpRight, Link, Zap, Star, Briefcase,
  Menu, X, Check, Send, Loader2, Copy
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
      color: "from-sky-400 to-indigo-500",
      details: {
        challenge: "Healthcare professionals needed a fast, reliable, and real-time visualization tool to monitor lung health analytics without interface lag during high-frequency data streams.",
        solution: "Engineered a high-performance React application incorporating optimized render loops, light state structures, and GPU-accelerated transition animations using Framer Motion.",
        features: [
          "Real-time medical telemetry dashboards",
          "Low-latency SVG data graphing and reporting",
          "Responsive, accessible design complying with standard healthcare guidelines"
        ],
        fullTech: ["React.js", "Tailwind CSS", "Framer Motion", "Vite", "Recharts", "ES6+"],
        impact: "Reduced rendering overhead and decreased interface latency by 25%, resulting in a highly responsive medical analytics dashboard."
      }
    },
    {
      title: "Security Portal",
      desc: "Comprehensive service management for high-security firms with complex booking flows.",
      tech: ["React.js", "ES6+", "Bootstrap"],
      link: "https://security-portal-web.vercel.app/ar",
      color: "from-purple-500 to-pink-500",
      details: {
        challenge: "Managing security guard scheduling, service booking, and compliance tracking for multiple corporate clients across varied shift patterns in a highly secure environment.",
        solution: "Developed an interactive client portal with nested state management, step-by-step custom wizard flows, and robust validation to prevent scheduling conflicts.",
        features: [
          "Dynamic service booking wizard with real-time price estimation",
          "Guard availability checks and calendar scheduling",
          "Comprehensive multi-role user dashboards (Admin, Client, Guard)"
        ],
        fullTech: ["React.js", "ES6+", "Bootstrap", "React Context API", "REST APIs"],
        impact: "Streamlined the booking and resource assignment cycle, eliminating human error in scheduling and enhancing client trust."
      }
    },
    {
      title: "Saudi Heritage Digital Experience",
      desc: "Redesigning the digital presence of Saudi Heritage sites with focus on user experience and engagement.",
      tech: ["Figma", "Prototyping", "Research", "Usability Testing"],
      link: "https://www.figma.com/proto/RQr3GmAzPt6EOcNAMkD8YT/%D8%B9%D8%B1%D8%A7%D9%82%D8%A9-%D8%A7%D9%84%D8%AA%D8%B1%D8%A7%D8%AB-%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A?node-id=0-1&t=2NrsKWPB9xzH9I8Q-1",
      color: "from-blue-500 to-green-500",
      details: {
        challenge: "Historical and cultural storytelling is often presented statically, leading to low user engagement, high bounce rates, and a disconnect for younger digital audiences.",
        solution: "Created an immersive high-fidelity interactive prototype focused on user journeys, cultural education, and high-impact visual layouts built on user-tested design systems.",
        features: [
          "Interactive map integration for exploring historic sites",
          "Gamified cultural quiz and storytelling modules",
          "Stunning typography, smooth custom transitions, and dark/light content contrast"
        ],
        fullTech: ["Figma", "Component Libraries", "Variables & Auto-Layout", "Interactive Prototyping", "User Testing"],
        impact: "Achieved high usability test scores with user feedback indicating a 40% increase in interest to learn about Saudi cultural heritage."
      }
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
    { title: "Meta Front-End Specialization", issuer: "Coursera", link: "https://coursera.org/share/ed941dde2dd91796c6d5a2e045b017d9" },
    { title: "Meta Principles of UX/UI Design", issuer: "Coursera", link: "https://coursera.org/share/60c76829ea6828da99d195102ebdf8c5" },
    { title: "NVIDIA AI for All", issuer: "NVIDIA" },
    { title: "UI/UX Design Diploma", issuer: "Route" },
    { title: "React.js Training", issuer: "ITI" },
    { title: "Security, Compliance, and Identity Fundamentals", issuer: "Microsoft", link: "https://www.certiport.com/portal/pages/credentialverification.aspx", code: "Xp83-XMVS" }
  ],
  skills: {
    frontend: ["React.js", "JavaScript", "TypeScript", "Next.js", "Tailwind"],
    design: ["Figma", "UI/UX Designer", "Design Systems", "Prototyping"],
    core: ["Algorithm Design", "Semantic Web", "Git", "REST APIs"]
  }
};

// Reusable inputs with premium animations
const FormInput = ({ label, id, type = "text", value, onChange, error, required }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative w-full text-left">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full px-5 pt-6 pb-2.5 bg-slate-950/40 border ${
          error ? 'border-red-500/50 focus:border-red-500' : 'border-slate-800 focus:border-sky-400'
        } rounded-2xl text-slate-100 placeholder-transparent focus:outline-none focus:ring-1 ${
          error ? 'focus:ring-red-500' : 'focus:ring-sky-400'
        } transition-all duration-300 text-sm`}
      />
      <label
        htmlFor={id}
        className={`absolute left-5 pointer-events-none transition-all duration-300 ${
          focused || value 
            ? 'top-2 text-[9px] font-bold text-sky-400 uppercase tracking-widest' 
            : 'top-4 text-sm text-slate-400'
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] text-red-400 mt-1 block ml-2"
        >
          {error}
        </motion.span>
      )}
    </div>
  );
};

const FormTextArea = ({ label, id, value, onChange, error, required }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative w-full text-left">
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={4}
        className={`w-full px-5 pt-7 pb-3 bg-slate-950/40 border ${
          error ? 'border-red-500/50 focus:border-red-500' : 'border-slate-800 focus:border-sky-400'
        } rounded-2xl text-slate-100 focus:outline-none focus:ring-1 ${
          error ? 'focus:ring-red-500' : 'focus:ring-sky-400'
        } transition-all duration-300 resize-none text-sm`}
      />
      <label
        htmlFor={id}
        className={`absolute left-5 pointer-events-none transition-all duration-300 ${
          focused || value 
            ? 'top-2 text-[9px] font-bold text-sky-400 uppercase tracking-widest' 
            : 'top-5 text-sm text-slate-400'
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] text-red-400 mt-1 block ml-2"
        >
          {error}
        </motion.span>
      )}
    </div>
  );
};

const ProjectCard = ({ project, index, onOpenModal }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="card-modern group overflow-hidden p-0 cursor-pointer flex flex-col justify-between"
      onClick={() => onOpenModal(project)}
    >
      <div>
        <div className={`h-60 md:h-72 bg-gradient-to-br ${project.color} relative flex items-center justify-center`}>
          <Code2 size={100} className="text-white opacity-20 scale-[1.5] md:scale-[2] group-hover:scale-[1.8] md:group-hover:scale-[2.5] transition-transform duration-1000" />
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span key={t} className="px-2.5 md:px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[8px] md:text-[9px] font-bold text-white uppercase tracking-widest border border-white/10">{t}</span>
            ))}
          </div>
        </div>
        <div className="p-6 md:p-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 group-hover:text-sky-400 transition-colors">{project.title}</h3>
          <p className="text-sm md:text-base opacity-60 leading-relaxed mb-6">{project.desc}</p>
        </div>
      </div>
      <div className="px-6 pb-8 md:px-10 md:pb-10 flex items-center justify-between border-t border-white/5 pt-6">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(project);
          }}
          className="inline-flex items-center gap-2 text-sky-400 font-bold hover:text-sky-300 transition-colors uppercase text-[10px] md:text-xs tracking-widest"
        >
          View Case Study <ChevronRight size={16} />
        </button>
        <a 
          href={project.link} 
          target="_blank" 
          rel="noreferrer" 
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors uppercase text-[10px] md:text-xs tracking-widest"
        >
          Visit Live <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-xl overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-4xl bg-slate-900/90 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`h-4 md:h-6 bg-gradient-to-r ${project.color} w-full`} />
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 bg-slate-950/50 hover:bg-slate-950 border border-white/5 hover:border-white/10 rounded-2xl text-slate-400 hover:text-white transition-all duration-300 active:scale-95"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="p-6 md:p-12 overflow-y-auto flex-1 text-left">
          <div className="mb-8 pr-12">
            <span className="text-[10px] font-bold text-sky-400 tracking-[0.2em] uppercase">Project Case Study</span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mt-2 tracking-tight">{project.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h4 className="text-xs font-bold text-sky-400 tracking-wider uppercase mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full" /> The Challenge
                </h4>
                <p className="text-sm md:text-base opacity-70 leading-relaxed font-light">
                  {project.details.challenge}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-sky-400 tracking-wider uppercase mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full" /> The Solution
                </h4>
                <p className="text-sm md:text-base opacity-70 leading-relaxed font-light">
                  {project.details.solution}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-sky-400 tracking-wider uppercase mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full" /> Key Features
                </h4>
                <ul className="space-y-3">
                  {project.details.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-3 text-sm opacity-70 font-light">
                      <ChevronRight size={18} className="text-sky-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-8 bg-slate-950/40 p-6 md:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-4">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.details.fullTech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-[9px] font-bold text-slate-300 uppercase tracking-widest"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-800/80 pt-6">
                  <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3">Key Output & Impact</h4>
                  <p className="text-xs md:text-sm text-sky-400/90 leading-relaxed font-medium">
                    {project.details.impact}
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 bg-sky-400 hover:bg-sky-500 active:scale-[0.98] text-slate-950 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                >
                  Visit Live Site <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Typewriter = ({ words, delay = 100, deleteDelay = 50, pauseTime = 2000 }) => {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = words[currentWordIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(prev => prev.slice(0, -1));
      }, deleteDelay);
    } else {
      timer = setTimeout(() => {
        setCurrentText(prev => currentWord.slice(0, prev.length + 1));
      }, delay);
    }

    if (!isDeleting && currentText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIdx((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIdx, words, delay, deleteDelay, pauseTime]);

  return (
    <span className="text-sky-400 font-bold inline-flex">
      {currentText}
      <span className="animate-[pulse_1s_infinite] ml-0.5 select-none font-light">|</span>
    </span>
  );
};

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Custom contact form states
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | success
  
  // Clipboard copy feedback
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when menu or modal is open
  useEffect(() => {
    document.body.style.overflow = (isMenuOpen || selectedProject) ? 'hidden' : 'unset';
  }, [isMenuOpen, selectedProject]);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Stack', href: '#stack' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: null }));
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!form.name.trim()) tempErrors.name = "Name is required";
    if (!form.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!form.message.trim()) tempErrors.message = "Message is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full max-w-full bg-slate-950 text-slate-100 transition-colors duration-500 mesh-bg overflow-x-hidden relative">

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 h-1 bg-sky-400 z-[95] origin-left w-full" style={{ scaleX }} />

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-[90] w-full transition-all duration-500 ${scrolled ? 'py-4 bg-slate-950/90 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'py-6 md:py-8 bg-transparent border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl md:text-3xl font-black font-heading tracking-tighter cursor-pointer text-left"
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
                className="text-sm font-medium opacity-60 hover:opacity-100 hover:text-sky-400 transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <motion.a
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              href={PORTFOLIO_DATA.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 bg-slate-900 border border-slate-800 text-white rounded-full text-sm font-bold hover:bg-sky-400 hover:border-sky-400 transition-all duration-500 shadow-lg flex items-center gap-2"
            >
              <Link size={16} /> LinkedIn
            </motion.a>
            <motion.a
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              href={PORTFOLIO_DATA.socials.github}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 bg-white text-slate-950 rounded-full text-sm font-bold hover:bg-sky-400 hover:text-white transition-all duration-500 shadow-lg flex items-center gap-2"
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
              {/* Background Glows */}
              <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-sky-400/10 blur-[120px] rounded-full pointer-events-none" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

              {/* Menu Header */}
              <div className="relative z-10 flex justify-between items-center px-6 py-6 md:px-10">
                <div className="text-2xl md:text-3xl font-black font-heading tracking-tighter">
                  Kamaleldin<span className="text-sky-400">.</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-3 text-white bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-300 border border-white/5"
                  aria-label="Close menu"
                >
                  <X size={28} strokeWidth={2.5} />
                </button>
              </div>

              {/* Menu Content Group */}
              <div className="relative z-10 flex-1 flex flex-col justify-start items-center pt-16 gap-10">
                {/* Menu Links */}
                <div className="flex flex-col items-center gap-4">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setIsMenuOpen(false)}
                      className="group relative flex flex-col items-center"
                    >
                      <span className="text-[9px] font-bold text-sky-400 tracking-[0.2em] mb-0.5 opacity-40 group-hover:opacity-100 transition-opacity uppercase">0{i + 1}</span>
                      <span className="text-3xl md:text-4xl font-bold font-heading tracking-tight group-hover:text-sky-400 transition-all duration-300">
                        {link.name}
                      </span>
                    </motion.a>
                  ))}
                </div>

                {/* Menu Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="w-full flex flex-col items-center px-6"
                >
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center items-center">
                    {[
                      { icon: <Code2 size={18} />, label: "GitHub", href: PORTFOLIO_DATA.socials.github },
                      { icon: <Link size={18} />, label: "LinkedIn", href: PORTFOLIO_DATA.socials.linkedin },
                      { icon: <Mail size={18} />, label: "Email", href: `mailto:${PORTFOLIO_DATA.email}` }
                    ].map((item, idx) => (
                      <motion.a
                        key={idx}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-3 p-4 bg-slate-900/50 border border-slate-800 text-slate-400 rounded-2xl hover:text-sky-400 hover:border-sky-400 w-full transition-all duration-300"
                      >
                        {item.icon}
                        <span className="text-xs font-bold tracking-wide uppercase">{item.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
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

              <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold font-heading leading-[1.1] md:leading-none tracking-tighter mb-8 md:mb-10 text-left">
                Building <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">
                  Intelligent
                </span> <br />
                Interfaces.
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed opacity-60 max-w-xl mb-10 md:mb-12 text-left h-24 sm:h-auto">
                I'm <span className="font-bold text-white">Kamaleldin Wasim</span>. A <Typewriter words={["Frontend Engineer", "UI/UX Designer", "React Developer", "Problem Solver"]} /> with a focus on Responsive Design and Semantic Web.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-5 w-full sm:w-auto">
                <a href="#work" className="btn-modern justify-center">View Projects <ArrowUpRight size={20} /></a>
                <a href="#contact" className="px-8 py-4 border border-slate-800 rounded-2xl font-bold hover:bg-slate-900 transition-all flex items-center justify-center gap-2">Contact Me</a>
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
                      <div className="text-left text-white">
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
                <div className="text-left">
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
                <ProjectCard key={i} project={project} index={i} onOpenModal={setSelectedProject} />
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section - Vertical Timeline */}
        <section id="experience" className="py-24 md:py-40 px-6 md:px-10 bg-slate-900/10 relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-16 md:mb-24 text-center">
              Professional <span className="text-sky-400">Journey</span>
            </h2>
            
            {/* Timeline Line */}
            <div className="absolute left-6 md:left-10 top-[120px] bottom-10 w-[2px] bg-slate-800/80" />
            
            <div className="space-y-12 relative text-left">
              {PORTFOLIO_DATA.experience.map((exp, i) => {
                const cardRef = useRef(null);
                
                const handleCardGlow = (e) => {
                  if (!cardRef.current) return;
                  const rect = cardRef.current.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  cardRef.current.style.setProperty('--mouse-x', `${x}px`);
                  cardRef.current.style.setProperty('--mouse-y', `${y}px`);
                };

                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="relative pl-16 md:pl-24"
                  >
                    {/* Timeline Glowing Dot */}
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: "spring", stiffness: 200, delay: i * 0.2 }}
                      className="absolute left-4 md:left-8 top-3.5 w-4.5 h-4.5 bg-slate-950 border-2 border-sky-400 rounded-full flex items-center justify-center z-10 shadow-[0_0_15px_rgba(56,189,248,0.6)]"
                    >
                      <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
                    </motion.div>

                    {/* Experience Card */}
                    <div 
                      ref={cardRef}
                      onMouseMove={handleCardGlow}
                      className="card-modern hover:border-sky-400/30 group p-8 md:p-10 transition-all duration-500"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                        <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-400/10 border border-sky-400/20 rounded-full text-[9px] font-bold text-sky-400 uppercase tracking-widest">
                            {exp.type}
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold mt-3 group-hover:text-sky-400 transition-colors duration-300">{exp.role}</h3>
                          <p className="text-base md:text-lg opacity-70 mt-1">{exp.company}</p>
                        </div>
                        <span className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-sky-400 group-hover:border-sky-400/30 rounded-xl text-[10px] md:text-xs font-bold transition-all duration-300">
                          {exp.period}
                        </span>
                      </div>
                      <ul className="space-y-4">
                        {exp.tasks.map((task, j) => (
                          <li key={j} className="flex gap-4 text-sm md:text-base opacity-60 leading-relaxed font-light">
                            <ChevronRight size={18} className="text-sky-400 shrink-0 mt-1" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Education & Certs */}
        <section className="py-24 md:py-40 px-6 md:px-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-20">
            {/* Education */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-left">
              <div className="flex items-center gap-4 mb-8 md:mb-12">
                <BookOpen className="text-sky-400" size={28} />
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
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-left">
              <div className="flex items-center gap-4 mb-8 md:mb-12">
                <Award className="text-sky-400" size={28} />
                <h2 className="text-3xl md:text-4xl font-bold font-heading">Certifications</h2>
              </div>
              <div className="space-y-4">
                {PORTFOLIO_DATA.certifications.map((cert, i) => (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" key={i} className="flex items-center justify-between p-5 md:p-6 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-sky-400/30 transition-colors">
                    <div>
                      <p className="text-sm md:font-bold">{cert.title}</p>
                      <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-40 mt-1">{cert.issuer}</p>
                    </div>
                    {cert.code && (
                      <div>
                        <p className="text-[10px] md:text-[12px] font-bold uppercase tracking-widest opacity-40 mt-1">{cert.code}</p>
                      </div>
                    )}
                    <ChevronRight className="opacity-20" size={18} />
                  </a>
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

        {/* Contact section with custom Glassmorphic Form */}
        <section id="contact" className="py-24 md:py-36 px-6 md:px-10 relative overflow-hidden bg-slate-950">
          <div className="hero-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-sky-400/10 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-start">
              
              {/* Left Side: Contact Information */}
              <div className="lg:col-span-5 text-left space-y-10">
                <div>
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-sky-400/10 border border-sky-400/20 rounded-2xl text-sky-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                    Available for projects
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold font-heading tracking-tight leading-none">
                    Let's Build <br />
                    Something <span className="text-sky-400">Next Level.</span>
                  </h2>
                  <p className="text-sm md:text-base font-light opacity-60 leading-relaxed mt-6 max-w-md">
                    Looking to add high-performance logic or beautiful UI design to your team? Let's connect and discuss your requirements.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Email row with Copy */}
                  <div className="flex items-center justify-between p-4 bg-slate-900/40 border border-slate-800 rounded-2xl group max-w-md">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-sky-400/10 text-sky-400 flex items-center justify-center">
                        <Mail size={18} />
                      </div>
                      <div className="text-left">
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Email Address</p>
                        <a href={`mailto:${PORTFOLIO_DATA.email}`} className="text-xs md:text-sm font-semibold hover:text-sky-400 transition-colors">
                          {PORTFOLIO_DATA.email}
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(PORTFOLIO_DATA.email, 'email')}
                      className="p-2 bg-slate-950/60 border border-slate-800/80 hover:border-sky-400/40 rounded-xl text-slate-400 hover:text-sky-400 transition-all active:scale-95"
                      title="Copy to clipboard"
                    >
                      {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                  </div>

                  {/* Phone row with Copy */}
                  <div className="flex items-center justify-between p-4 bg-slate-900/40 border border-slate-800 rounded-2xl group max-w-md">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-sky-400/10 text-sky-400 flex items-center justify-center">
                        <Phone size={18} />
                      </div>
                      <div className="text-left">
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Phone Number</p>
                        <a href={`tel:${PORTFOLIO_DATA.phone}`} className="text-xs md:text-sm font-semibold hover:text-sky-400 transition-colors">
                          {PORTFOLIO_DATA.phone}
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(PORTFOLIO_DATA.phone, 'phone')}
                      className="p-2 bg-slate-950/60 border border-slate-800/80 hover:border-sky-400/40 rounded-xl text-slate-400 hover:text-sky-400 transition-all active:scale-95"
                      title="Copy to clipboard"
                    >
                      {copiedPhone ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                {/* Social links */}
                <div className="flex items-center gap-4">
                  <a
                    href={PORTFOLIO_DATA.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold transition-all"
                  >
                    GitHub
                  </a>
                  <a
                    href={PORTFOLIO_DATA.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 bg-slate-900 hover:bg-sky-400 hover:text-slate-950 border border-slate-800 rounded-xl text-xs font-bold transition-all"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Right Side: Contact Form Card */}
              <div className="lg:col-span-7">
                <div className="card-modern p-6 md:p-10 relative overflow-hidden bg-slate-900/40 backdrop-blur-xl border border-slate-800">
                  <AnimatePresence mode="wait">
                    
                    {/* Success Screen */}
                    {formStatus === 'success' && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                      >
                        <div className="w-20 h-20 bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.2)]">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                          >
                            <Check size={40} />
                          </motion.div>
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold font-heading text-emerald-400">Message Sent!</h3>
                          <p className="text-sm md:text-base opacity-60 leading-relaxed max-w-sm mt-3 mx-auto">
                            Thank you for reaching out, Kamaleldin will get back to you as soon as possible.
                          </p>
                        </div>
                        <button
                          onClick={() => setFormStatus('idle')}
                          className="px-6 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs font-bold rounded-xl transition-all"
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    )}

                    {/* Standard Form */}
                    {formStatus !== 'success' && (
                      <motion.form
                        key="form"
                        onSubmit={handleFormSubmit}
                        className="space-y-6"
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormInput
                            label="Your Name"
                            id="name"
                            value={form.name}
                            onChange={handleFormChange}
                            error={errors.name}
                            required
                          />
                          <FormInput
                            label="Email Address"
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={handleFormChange}
                            error={errors.email}
                            required
                          />
                        </div>
                        <FormInput
                          label="Subject (Optional)"
                          id="subject"
                          value={form.subject}
                          onChange={handleFormChange}
                        />
                        <FormTextArea
                          label="Your Message"
                          id="message"
                          value={form.message}
                          onChange={handleFormChange}
                          error={errors.message}
                          required
                        />
                        
                        <div className="pt-2 text-right">
                          <button
                            type="submit"
                            disabled={formStatus === 'sending'}
                            className="btn-modern w-full md:w-auto ml-auto justify-center hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black bg-sky-400 hover:bg-sky-500 rounded-2xl transition-all py-4 px-10 text-sm shadow-[0_0_20px_rgba(56,189,248,0.25)] flex items-center gap-3"
                          >
                            {formStatus === 'sending' ? (
                              <>
                                <Loader2 size={16} className="animate-spin text-slate-950" /> Sending Message...
                              </>
                            ) : (
                              <>
                                <Send size={16} /> Send Message
                              </>
                            )}
                          </button>
                        </div>
                      </motion.form>
                    )}

                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>
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

      {/* Case Study Modal portal overlay */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

