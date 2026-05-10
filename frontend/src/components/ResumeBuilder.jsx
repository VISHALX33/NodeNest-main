import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, Plus, Trash2, User, Briefcase, 
  GraduationCap, Code, FileText, Settings, Award, 
  Globe, Trophy, Palette, ChevronDown, ChevronUp,
  Image as ImageIcon, RotateCcw, Layout, Check, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'nodenest_resume_data';

const DEFAULT_DATA = {
  personal: {
    name: "John Doe",
    title: "Software Engineer",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    location: "New York, USA",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    summary: "Passionate software engineer with 3+ years of experience in building scalable web applications. Strong focus on modern JavaScript frameworks and clean code architecture.",
    profilePic: null,
  },
  experience: [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Corp",
      duration: "Jan 2021 - Present",
      description: "Developed and maintained user-facing features using React.js. Improved application performance by 40% and implemented responsive designs.",
    }
  ],
  education: [
    {
      id: 1,
      degree: "B.Tech in Computer Science",
      university: "State University",
      duration: "2017 - 2021",
      grade: "CGPA: 8.5/10",
    }
  ],
  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      link: "github.com/johndoe/ecommerce",
      description: "Built a full-stack e-commerce platform using MERN stack with Stripe integration for seamless payments.",
    }
  ],
  skills: "JavaScript, React, Node.js, Express, MongoDB, Tailwind CSS, Git",
  languages: "English (Fluent), Spanish (Intermediate)",
  achievements: "• Won 1st place in National Hackathon 2022\n• Recognized as Top Performer in Q3 2023",
  certifications: [
    {
      id: 1,
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "Aug 2023",
    }
  ],
  themeColor: "emerald",
  template: "modern" // modern, professional, creative
};

export default function ResumeBuilder() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeSection, setActiveSection] = useState("personal");
  const fileInputRef = useRef(null);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const colors = {
    emerald: { primary: "#10b981", light: "#ecfdf5", border: "border-emerald-600", text: "text-emerald-700", bg: "bg-emerald-50", badge: "text-emerald-600" },
    blue: { primary: "#3b82f6", light: "#eff6ff", border: "border-blue-600", text: "text-blue-700", bg: "bg-blue-50", badge: "text-blue-600" },
    indigo: { primary: "#6366f1", light: "#eef2ff", border: "border-indigo-600", text: "text-indigo-700", bg: "bg-indigo-50", badge: "text-indigo-600" },
    purple: { primary: "#a855f7", light: "#f5f3ff", border: "border-purple-600", text: "text-purple-700", bg: "bg-purple-50", badge: "text-purple-600" },
    rose: { primary: "#f43f5e", light: "#fff1f2", border: "border-rose-600", text: "text-rose-700", bg: "bg-rose-50", badge: "text-rose-600" },
    slate: { primary: "#475569", light: "#f8fafc", border: "border-slate-600", text: "text-slate-700", bg: "bg-slate-50", badge: "text-slate-600" },
  };

  const currentTheme = colors[data.themeColor] || colors.emerald;

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, personal: { ...prev.personal, [name]: value } }));
  };

  const handleArrayChange = (key, id, field, value) => {
    setData(prev => ({
      ...prev,
      [key]: prev[key].map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const addItem = (key, emptyItem) => {
    setData(prev => ({
      ...prev,
      [key]: [...prev[key], { id: Date.now(), ...emptyItem }]
    }));
  };

  const removeItem = (key, id) => {
    setData(prev => ({
      ...prev,
      [key]: prev[key].filter(item => item.id !== id)
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({ ...prev, personal: { ...prev.personal, profilePic: reader.result } }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetData = () => {
    if (window.confirm("Are you sure you want to reset all data?")) {
      setData(DEFAULT_DATA);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row print:bg-white print:block overflow-hidden font-sans">
      
      {/* LEFT PANEL: Editor */}
      <div className="w-full md:w-1/2 lg:w-[45%] h-[calc(100vh-80px)] overflow-y-auto p-4 md:p-8 bg-white/80 backdrop-blur-xl border-r border-slate-200 print:hidden custom-scrollbar pb-32">
        
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Sparkles size={18} className="text-white" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">NoteSea's AI Resume Builder</h1>
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Premium Edition</p>
          </div>
          <button onClick={resetData} className="p-2 text-slate-400 hover:text-rose-500 transition-colors" title="Reset Data">
            <RotateCcw size={20} />
          </button>
        </div>

        {/* Section Accordions */}
        <div className="space-y-4">
          <Accordion 
            title="Personal Information" 
            icon={<User size={18} />} 
            isOpen={activeSection === "personal"} 
            onClick={() => setActiveSection(activeSection === "personal" ? "" : "personal")}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 flex items-center gap-6 mb-2">
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="w-20 h-20 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-200 transition-all overflow-hidden relative group"
                >
                  {data.personal.profilePic ? (
                    <>
                      <img src={data.personal.profilePic} alt="Profile" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ImageIcon size={18} className="text-white" />
                      </div>
                    </>
                  ) : (
                    <>
                      <ImageIcon size={20} className="text-slate-400 mb-1" />
                      <span className="text-[10px] font-bold text-slate-500">Upload</span>
                    </>
                  )}
                  <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={handleImageUpload} />
                </div>
                <div className="flex-1">
                  <InputField label="Full Name" name="name" value={data.personal.name} onChange={handlePersonalChange} />
                </div>
              </div>
              <InputField label="Job Title" name="title" value={data.personal.title} onChange={handlePersonalChange} />
              <InputField label="Email" name="email" value={data.personal.email} onChange={handlePersonalChange} />
              <InputField label="Phone" name="phone" value={data.personal.phone} onChange={handlePersonalChange} />
              <InputField label="Location" name="location" value={data.personal.location} onChange={handlePersonalChange} />
              <InputField label="LinkedIn" name="linkedin" value={data.personal.linkedin} onChange={handlePersonalChange} />
              <InputField label="GitHub" name="github" value={data.personal.github} onChange={handlePersonalChange} />
            </div>
            <div className="mt-4">
              <TextAreaField label="Professional Summary" name="summary" value={data.personal.summary} onChange={handlePersonalChange} rows={4} />
            </div>
          </Accordion>

          <Accordion 
            title="Work Experience" 
            icon={<Briefcase size={18} />} 
            isOpen={activeSection === "experience"} 
            onClick={() => setActiveSection(activeSection === "experience" ? "" : "experience")}
          >
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative bg-slate-50 p-5 rounded-2xl mb-4 border border-slate-100 group">
                <button onClick={() => removeItem("experience", exp.id)} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors">
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <InputField label="Job Title" value={exp.title} onChange={(e) => handleArrayChange("experience", exp.id, 'title', e.target.value)} />
                  <InputField label="Company" value={exp.company} onChange={(e) => handleArrayChange("experience", exp.id, 'company', e.target.value)} />
                  <InputField label="Duration" value={exp.duration} onChange={(e) => handleArrayChange("experience", exp.id, 'duration', e.target.value)} />
                </div>
                <TextAreaField label="Key Responsibilities" value={exp.description} onChange={(e) => handleArrayChange("experience", exp.id, 'description', e.target.value)} rows={3} />
              </div>
            ))}
            <AddButton onClick={() => addItem("experience", { title: "", company: "", duration: "", description: "" })}>Add Experience</AddButton>
          </Accordion>

          <Accordion 
            title="Academic Background" 
            icon={<GraduationCap size={18} />} 
            isOpen={activeSection === "education"} 
            onClick={() => setActiveSection(activeSection === "education" ? "" : "education")}
          >
            {data.education.map((edu) => (
              <div key={edu.id} className="relative bg-slate-50 p-5 rounded-2xl mb-4 border border-slate-100">
                <button onClick={() => removeItem("education", edu.id)} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors">
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Degree" value={edu.degree} onChange={(e) => handleArrayChange("education", edu.id, 'degree', e.target.value)} />
                  <InputField label="Institution" value={edu.university} onChange={(e) => handleArrayChange("education", edu.id, 'university', e.target.value)} />
                  <InputField label="Duration" value={edu.duration} onChange={(e) => handleArrayChange("education", edu.id, 'duration', e.target.value)} />
                  <InputField label="Grade/CGPA" value={edu.grade} onChange={(e) => handleArrayChange("education", edu.id, 'grade', e.target.value)} />
                </div>
              </div>
            ))}
            <AddButton onClick={() => addItem("education", { degree: "", university: "", duration: "", grade: "" })}>Add Education</AddButton>
          </Accordion>

          <Accordion 
            title="Projects & Portfolios" 
            icon={<Code size={18} />} 
            isOpen={activeSection === "projects"} 
            onClick={() => setActiveSection(activeSection === "projects" ? "" : "projects")}
          >
            {data.projects.map((proj) => (
              <div key={proj.id} className="relative bg-slate-50 p-5 rounded-2xl mb-4 border border-slate-100">
                <button onClick={() => removeItem("projects", proj.id)} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors">
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <InputField label="Project Name" value={proj.title} onChange={(e) => handleArrayChange("projects", proj.id, 'title', e.target.value)} />
                  <InputField label="Live Link" value={proj.link} onChange={(e) => handleArrayChange("projects", proj.id, 'link', e.target.value)} />
                </div>
                <TextAreaField label="Short Description" value={proj.description} onChange={(e) => handleArrayChange("projects", proj.id, 'description', e.target.value)} rows={2} />
              </div>
            ))}
            <AddButton onClick={() => addItem("projects", { title: "", link: "", description: "" })}>Add Project</AddButton>
          </Accordion>

          <Accordion 
            title="Skills & Additional Info" 
            icon={<Settings size={18} />} 
            isOpen={activeSection === "skills"} 
            onClick={() => setActiveSection(activeSection === "skills" ? "" : "skills")}
          >
            <TextAreaField label="Technical Skills" value={data.skills} onChange={(e) => setData({...data, skills: e.target.value})} rows={3} placeholder="React, Python, AWS..." />
            <TextAreaField label="Languages" value={data.languages} onChange={(e) => setData({...data, languages: e.target.value})} rows={2} />
            <TextAreaField label="Achievements" value={data.achievements} onChange={(e) => setData({...data, achievements: e.target.value})} rows={3} />
          </Accordion>
        </div>
      </div>

      {/* RIGHT PANEL: Live Preview */}
      <div className="w-full md:w-1/2 lg:w-[55%] bg-slate-200/50 p-4 md:p-8 flex flex-col items-center overflow-y-auto h-[calc(100vh-80px)] print:w-full print:h-auto print:p-0 print:overflow-visible print:bg-white relative custom-scrollbar">
        
        {/* Toolbar */}
        <div className="sticky top-0 z-40 w-full max-w-[800px] mb-6 flex flex-wrap items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-white/20 print:hidden">
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
              <Layout size={18} className="text-slate-400" />
              <select 
                value={data.template} 
                onChange={(e) => setData({...data, template: e.target.value})}
                className="bg-transparent text-sm font-black text-slate-700 outline-none cursor-pointer uppercase tracking-tight"
              >
                <option value="modern">Modern</option>
                <option value="professional">Professional</option>
                <option value="creative">Creative</option>
              </select>
            </div>
            
            <div className="flex gap-2">
              {Object.keys(colors).map(color => (
                <button
                  key={color}
                  onClick={() => setData({...data, themeColor: color})}
                  className={`w-6 h-6 rounded-full transition-all hover:scale-125 flex items-center justify-center ${data.themeColor === color ? 'ring-2 ring-offset-2 ring-slate-800' : ''}`}
                  style={{ backgroundColor: colors[color].primary }}
                >
                  {data.themeColor === color && <Check size={12} className="text-white" />}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handlePrint}
            className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/20"
          >
            <Download size={18} /> Download PDF
          </button>
        </div>

        {/* Paper Container */}
        <div className={`bg-white shadow-2xl w-full max-w-[800px] min-h-[1131px] print:shadow-none print:w-full print:min-h-0 text-slate-800 p-8 md:p-12 lg:p-16 print:p-0 mx-auto transition-all duration-500 ${data.template === 'professional' ? 'font-serif' : 'font-sans'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={data.template}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {data.template === 'modern' && <ModernTemplate data={data} theme={currentTheme} />}
              {data.template === 'professional' && <ProfessionalTemplate data={data} theme={currentTheme} />}
              {data.template === 'creative' && <CreativeTemplate data={data} theme={currentTheme} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { margin: 0; size: auto; }
          body { margin: 0; background: white; }
          nav, footer, .print\\:hidden, header { display: none !important; }
          .print\\:block { display: block !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}} />
    </div>
  );
}

// ---------------- Template Renderers ----------------

function ModernTemplate({ data, theme }) {
  return (
    <div className="space-y-8">
      <header className={`flex justify-between items-start border-b-4 pb-8`} style={{ borderColor: theme.primary }}>
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase mb-2 leading-none">{data.personal.name}</h1>
          <h2 className="text-xl font-bold tracking-widest uppercase opacity-60" style={{ color: theme.primary }}>{data.personal.title}</h2>
          <div className="flex flex-wrap gap-4 mt-6 text-[11px] font-black uppercase tracking-widest text-slate-500">
            {data.personal.email && <span className="flex items-center gap-1"><FileText size={12} /> {data.personal.email}</span>}
            {data.personal.phone && <span>{data.personal.phone}</span>}
            {data.personal.location && <span>{data.personal.location}</span>}
          </div>
        </div>
        {data.personal.profilePic && (
          <img src={data.personal.profilePic} className="w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-xl rotate-3" alt="Profile" />
        )}
      </header>

      <section>
        <p className="text-sm leading-relaxed text-slate-600 text-justify font-medium">{data.personal.summary}</p>
      </section>

      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-2 space-y-8">
          <SectionView title="Experience" theme={theme}>
            {data.experience.map((exp, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-slate-100 pb-6 last:pb-0">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4" style={{ borderColor: theme.primary }} />
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-black text-slate-900 text-base">{exp.title}</h4>
                  <span className="text-[10px] font-black text-slate-400 uppercase">{exp.duration}</span>
                </div>
                <div className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: theme.primary }}>{exp.company}</div>
                <p className="text-xs text-slate-600 leading-relaxed text-justify">{exp.description}</p>
              </div>
            ))}
          </SectionView>

          <SectionView title="Education" theme={theme}>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-black text-slate-900">{edu.degree}</h4>
                  <span className="text-[10px] font-black text-slate-400 uppercase">{edu.duration}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                  <span>{edu.university}</span>
                  <span style={{ color: theme.primary }}>{edu.grade}</span>
                </div>
              </div>
            ))}
          </SectionView>
        </div>

        <div className="space-y-8">
          <SectionView title="Skills" theme={theme}>
            <div className="flex flex-wrap gap-2">
              {data.skills.split(',').map((s, i) => (
                <span key={i} className="px-3 py-1.5 text-[10px] font-black rounded-lg uppercase tracking-tight" style={{ backgroundColor: theme.light, color: theme.primary }}>{s.trim()}</span>
              ))}
            </div>
          </SectionView>

          <SectionView title="Projects" theme={theme}>
            {data.projects.map((p, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <h4 className="font-black text-slate-900 text-sm mb-1">{p.title}</h4>
                <p className="text-[10px] text-slate-600 leading-relaxed mb-2">{p.description}</p>
                <div className="text-[9px] font-black uppercase tracking-tighter" style={{ color: theme.primary }}>{p.link}</div>
              </div>
            ))}
          </SectionView>
        </div>
      </div>
    </div>
  );
}

function ProfessionalTemplate({ data, theme }) {
  return (
    <div className="space-y-8 text-slate-900">
      <header className={`text-center border-b pb-8`} style={{ borderColor: theme.primary }}>
        <h1 className="text-4xl font-serif font-normal uppercase tracking-[0.2em] mb-3">{data.personal.name}</h1>
        <div className="flex justify-center gap-4 text-[10px] font-medium tracking-widest text-slate-500 uppercase">
          <span>{data.personal.location}</span>
          <span>•</span>
          <span>{data.personal.phone}</span>
          <span>•</span>
          <span>{data.personal.email}</span>
        </div>
        <div className="flex justify-center gap-4 mt-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
          {data.personal.linkedin && <span>LinkedIn: {data.personal.linkedin}</span>}
          {data.personal.github && <span>GitHub: {data.personal.github}</span>}
        </div>
      </header>

      <section className="space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-center border-b border-slate-200 pb-2 mb-4" style={{ color: theme.primary, borderBottomColor: theme.light }}>Professional Profile</h3>
        <p className="text-sm leading-relaxed text-justify italic font-serif text-slate-700">{data.personal.summary}</p>
      </section>

      <SectionView title="Professional Experience" theme={theme} centered>
        {data.experience.map((exp, i) => (
          <div key={i} className="mb-8 last:mb-0">
            <div className="flex justify-between items-baseline mb-2">
              <h4 className="text-base font-bold italic">{exp.title}</h4>
              <span className="text-[10px] font-bold italic" style={{ color: theme.primary }}>{exp.duration}</span>
            </div>
            <div className="text-xs font-bold uppercase tracking-widest mb-3 opacity-70">{exp.company}</div>
            <p className="text-sm leading-relaxed text-justify text-slate-700">{exp.description}</p>
          </div>
        ))}
      </SectionView>

      <SectionView title="Education" theme={theme} centered>
        {data.education.map((edu, i) => (
          <div key={i} className="mb-4 last:mb-0">
            <div className="flex justify-between items-baseline">
              <h4 className="text-sm font-bold">{edu.degree}</h4>
              <span className="text-[10px] italic">{edu.duration}</span>
            </div>
            <div className="text-xs text-slate-600 font-serif italic">{edu.university} | <span style={{ color: theme.primary }}>{edu.grade}</span></div>
          </div>
        ))}
      </SectionView>

      <div className="grid grid-cols-2 gap-12">
        <SectionView title="Technical Proficiencies" theme={theme}>
          <p className="text-xs leading-relaxed text-slate-700 italic">{data.skills}</p>
        </SectionView>
        <SectionView title="Languages & Honors" theme={theme}>
          <p className="text-xs leading-relaxed text-slate-700 italic">{data.languages}</p>
          <div className="mt-2 text-xs leading-relaxed whitespace-pre-wrap">{data.achievements}</div>
        </SectionView>
      </div>
    </div>
  );
}

function CreativeTemplate({ data, theme }) {
  return (
    <div className="flex h-full min-h-[1000px]">
      {/* Sidebar */}
      <aside className="w-1/3 text-white p-8 space-y-10 rounded-l-3xl -ml-16 -my-16 h-auto" style={{ backgroundColor: theme.primary }}>
        <div className="text-center">
          {data.personal.profilePic ? (
            <img src={data.personal.profilePic} className="w-32 h-32 rounded-full mx-auto object-cover border-4 shadow-2xl mb-6" style={{ borderColor: 'rgba(255,255,255,0.2)' }} alt="Profile" />
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto bg-white/10 border-4 border-white/20 flex items-center justify-center mb-6">
              <User size={40} className="text-white/40" />
            </div>
          )}
          <h1 className="text-2xl font-black tracking-tighter leading-tight mb-2">{data.personal.name}</h1>
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">{data.personal.title}</h2>
        </div>

        <div className="space-y-6">
          <SectionView title="Contact" theme={theme} dark>
            <div className="space-y-4 text-[10px] font-bold text-white/80 tracking-wider break-all">
              <div className="flex items-center gap-3"><FileText size={14} className="opacity-50" /> {data.personal.email}</div>
              <div className="flex items-center gap-3"><Trophy size={14} className="opacity-50" /> {data.personal.phone}</div>
              <div className="flex items-center gap-3"><Globe size={14} className="opacity-50" /> {data.personal.location}</div>
              <div className="flex items-center gap-3"><Code size={14} className="opacity-50" /> {data.personal.linkedin}</div>
            </div>
          </SectionView>

          <SectionView title="Skills" theme={theme} dark>
            <div className="space-y-3">
              {data.skills.split(',').map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">{s.trim()}</span>
                </div>
              ))}
            </div>
          </SectionView>

          <SectionView title="Languages" theme={theme} dark>
            <p className="text-[10px] font-bold text-white/70 leading-relaxed uppercase tracking-widest">{data.languages}</p>
          </SectionView>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-10 space-y-12 bg-white">
        <SectionView title="About Me" theme={theme}>
          <p className="text-sm leading-relaxed text-slate-600 text-justify">{data.personal.summary}</p>
        </SectionView>

        <SectionView title="Experience" theme={theme}>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-8 last:mb-0">
              <div className="flex justify-between items-baseline mb-2">
                <h4 className="text-lg font-black text-slate-900 tracking-tight">{exp.title}</h4>
                <span className="text-[10px] font-black text-slate-400 uppercase">{exp.duration}</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: theme.primary }}>{exp.company}</div>
              <p className="text-xs text-slate-500 leading-relaxed text-justify">{exp.description}</p>
            </div>
          ))}
        </SectionView>

        <SectionView title="Key Projects" theme={theme}>
          {data.projects.map((p, i) => (
            <div key={i} className="mb-6 last:mb-0 p-4 rounded-2xl border transition-colors" style={{ backgroundColor: theme.light, borderColor: 'rgba(0,0,0,0.05)' }}>
              <h4 className="font-black text-slate-900 text-sm mb-1">{p.title}</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed mb-2">{p.description}</p>
              <div className="text-[9px] font-black uppercase" style={{ color: theme.primary }}>{p.link}</div>
            </div>
          ))}
        </SectionView>
      </main>
    </div>
  );
}

// ---------------- UI Helpers ----------------

function Accordion({ title, icon, children, isOpen, onClick }) {
  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm transition-all hover:shadow-md">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-slate-700 hover:bg-slate-50 transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-slate-100 rounded-xl text-slate-600">
            {icon}
          </div>
          <span className="font-black tracking-tight text-slate-800">{title}</span>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-6 pt-0 border-t border-slate-50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionView({ title, children, theme, dark = false, centered = false }) {
  return (
    <div className={`space-y-4 ${centered ? 'text-center' : ''}`}>
      <h3 className={`text-sm font-black uppercase tracking-[0.25em] pb-2 border-b-2 ${dark ? 'text-white border-white/20' : 'text-slate-900 border-slate-100'}`} style={!dark ? { borderBottomColor: theme.light } : {}}>
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, placeholder = "" }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-slate-800 font-bold text-sm placeholder:text-slate-300"
      />
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, rows = 3, placeholder = "" }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-slate-800 font-bold text-sm resize-none placeholder:text-slate-300 custom-scrollbar"
      />
    </div>
  );
}

function AddButton({ onClick, children }) {
  return (
    <button 
      onClick={onClick}
      className="w-full py-4 border-2 border-dashed border-slate-200 text-slate-400 font-black rounded-3xl hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
    >
      <Plus size={16} /> {children}
    </button>
  );
}
