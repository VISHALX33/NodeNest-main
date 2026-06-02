import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, Plus, Trash2, User, Briefcase, 
  GraduationCap, Code, FileText, Settings, Award, 
  Globe, ChevronDown, ChevronUp,
  Image as ImageIcon, RotateCcw, Layout, Check, Sparkles,
  Lightbulb, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'nodenest_resume_data';

const TEMPLATE_LABELS = {
  executive: 'Executive',
  professional: 'Professional',
  classic: 'Classic',
  minimal: 'Minimal',
  modern: 'Modern',
  creative: 'Creative',
};

const ROLE_TEMPLATE_GUIDE = [
  { role: 'Software Engineer / Developer', template: 'minimal', reason: 'Clean ATS-friendly layout highlights skills and projects recruiters scan first.' },
  { role: 'Data Scientist / ML Engineer', template: 'minimal', reason: 'Structured sections make technical skills and research easy to parse.' },
  { role: 'Fresh Graduate / Student', template: 'minimal', reason: 'Simple format puts education and projects front and center without clutter.' },
  { role: 'Intern / Entry Level', template: 'minimal', reason: 'One-page clarity works best when experience is limited.' },
  { role: 'Product Manager', template: 'modern', reason: 'Balanced two-column layout showcases impact and cross-functional skills.' },
  { role: 'Business Analyst', template: 'modern', reason: 'Professional yet contemporary — ideal for stakeholder-facing roles.' },
  { role: 'Marketing Manager', template: 'modern', reason: 'Highlights achievements and metrics in a polished corporate style.' },
  { role: 'Digital Marketer / SEO', template: 'creative', reason: 'Visual sidebar helps you stand out in creative and growth teams.' },
  { role: 'Graphic Designer / UI-UX', template: 'creative', reason: 'Profile photo and color sidebar reflect design sensibility.' },
  { role: 'Content Writer / Copywriter', template: 'creative', reason: 'Personality-forward layout suits portfolio-driven creative hiring.' },
  { role: 'CEO / Director / VP', template: 'executive', reason: 'Sidebar layout signals leadership with strong hierarchy and presence.' },
  { role: 'Sales Manager / Account Executive', template: 'executive', reason: 'Bold structure emphasizes results, territory wins, and revenue impact.' },
  { role: 'Management Consultant', template: 'executive', reason: 'Corporate two-column format matches top-tier consulting expectations.' },
  { role: 'Operations / Supply Chain Manager', template: 'executive', reason: 'Organized sections communicate scale, process, and leadership.' },
  { role: 'HR Manager / Recruiter', template: 'professional', reason: 'Formal centered layout builds trust with hiring stakeholders.' },
  { role: 'Finance / Accountant / Auditor', template: 'professional', reason: 'Conservative serif styling fits banking, audit, and compliance roles.' },
  { role: 'Banking / Investment Analyst', template: 'classic', reason: 'Traditional format aligns with finance industry norms.' },
  { role: 'Lawyer / Legal Associate', template: 'classic', reason: 'Formal typography and centered headers suit legal profession standards.' },
  { role: 'Teacher / Professor / Academic', template: 'classic', reason: 'Scholarly, timeless layout for education and research positions.' },
  { role: 'Doctor / Nurse / Healthcare', template: 'professional', reason: 'Clear credentials, certifications, and experience in a credible format.' },
  { role: 'Civil / Mechanical Engineer', template: 'minimal', reason: 'Technical skills and project delivery read clearly for engineering recruiters.' },
  { role: 'Government / Public Sector', template: 'classic', reason: 'Straightforward, formal presentation for public service applications.' },
  { role: 'MBA / General Management', template: 'executive', reason: 'Leadership-focused sidebar highlights strategy and business outcomes.' },
  { role: 'Startup Founder / Co-founder', template: 'modern', reason: 'Flexible layout tells your story across roles, ventures, and skills.' },
  { role: 'Architect / Interior Designer', template: 'creative', reason: 'Visual layout complements design portfolios and creative portfolios.' },
  { role: 'Customer Success / Support Lead', template: 'professional', reason: 'Professional tone with room for metrics and client relationship wins.' },
];

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
  template: "executive",
  selectedRole: "",
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
  const TEMPLATES = ['executive', 'professional', 'classic', 'minimal', 'modern', 'creative'];
  const activeTemplate = TEMPLATES.includes(data.template) ? data.template : 'executive';

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

        <RoleSuggestionBox
          selectedRole={data.selectedRole || ''}
          currentTemplate={activeTemplate}
          onRoleChange={(roleId) => setData((prev) => ({ ...prev, selectedRole: roleId }))}
          onApplyTemplate={(template) => setData((prev) => ({ ...prev, template }))}
        />

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

          <Accordion 
            title="Certifications" 
            icon={<Award size={18} />} 
            isOpen={activeSection === "certifications"} 
            onClick={() => setActiveSection(activeSection === "certifications" ? "" : "certifications")}
          >
            {data.certifications.map((cert) => (
              <div key={cert.id} className="relative bg-slate-50 p-5 rounded-2xl mb-4 border border-slate-100">
                <button onClick={() => removeItem("certifications", cert.id)} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors">
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Certificate Name" value={cert.title} onChange={(e) => handleArrayChange("certifications", cert.id, 'title', e.target.value)} />
                  <InputField label="Issuing Organization" value={cert.issuer} onChange={(e) => handleArrayChange("certifications", cert.id, 'issuer', e.target.value)} />
                  <InputField label="Date" value={cert.date} onChange={(e) => handleArrayChange("certifications", cert.id, 'date', e.target.value)} />
                </div>
              </div>
            ))}
            <AddButton onClick={() => addItem("certifications", { title: "", issuer: "", date: "" })}>Add Certification</AddButton>
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
                className="bg-transparent text-sm font-black text-slate-700 outline-none cursor-pointer uppercase tracking-tight max-w-[140px]"
              >
                <option value="executive">Executive</option>
                <option value="professional">Professional</option>
                <option value="classic">Classic</option>
                <option value="minimal">Minimal</option>
                <option value="modern">Modern</option>
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
        <div className={`resume-paper bg-white shadow-2xl w-full max-w-[800px] min-h-[1131px] print:shadow-none print:w-full print:min-h-0 text-slate-800 mx-auto transition-all duration-500 overflow-hidden ${['professional', 'classic'].includes(activeTemplate) ? 'font-serif' : 'font-sans'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTemplate}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              {activeTemplate === 'executive' && <ExecutiveTemplate data={data} theme={currentTheme} />}
              {activeTemplate === 'modern' && <ModernTemplate data={data} theme={currentTheme} />}
              {activeTemplate === 'professional' && <ProfessionalTemplate data={data} theme={currentTheme} />}
              {activeTemplate === 'classic' && <ClassicTemplate data={data} theme={currentTheme} />}
              {activeTemplate === 'minimal' && <MinimalTemplate data={data} theme={currentTheme} />}
              {activeTemplate === 'creative' && <CreativeTemplate data={data} theme={currentTheme} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { margin: 12mm; size: A4 portrait; }
          body { margin: 0; background: white; }
          nav, footer, .print\\:hidden, header { display: none !important; }
          .print\\:block { display: block !important; }
          .resume-paper { max-width: 100% !important; box-shadow: none !important; min-height: auto !important; }
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

// ---------------- Template helpers ----------------

function parseLines(text) {
  if (!text?.trim()) return [];
  return text.split(/\n|•/).map(s => s.trim()).filter(Boolean);
}

function parseSkills(skills) {
  if (!skills?.trim()) return [];
  return skills.split(/[,;|]/).map(s => s.trim()).filter(Boolean);
}

function ContactRow({ items, className = "" }) {
  const visible = items.filter(Boolean);
  if (!visible.length) return null;
  return (
    <p className={`text-[10px] text-slate-500 tracking-wide ${className.includes('center') ? 'text-center' : ''} ${className}`}>
      {visible.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2 text-slate-300">|</span>}
          {item}
        </span>
      ))}
    </p>
  );
}

function BulletList({ text, className = "text-xs text-slate-600 leading-relaxed" }) {
  const lines = parseLines(text);
  if (!lines.length) return null;
  if (lines.length === 1) return <p className={className}>{lines[0]}</p>;
  return (
    <ul className={`${className} list-disc pl-4 space-y-1`}>
      {lines.map((line, i) => <li key={i}>{line}</li>)}
    </ul>
  );
}

function SkillPills({ skills, theme, variant = "light" }) {
  const list = parseSkills(skills);
  if (!list.length) return null;
  const dark = variant === "dark";
  return (
    <div className="flex flex-wrap gap-1.5">
      {list.map((s, i) => (
        <span
          key={i}
          className={`px-2.5 py-1 text-[9px] font-semibold rounded tracking-wide ${dark ? 'bg-white/15 text-white' : ''}`}
          style={dark ? {} : { backgroundColor: theme.light, color: theme.primary }}
        >
          {s}
        </span>
      ))}
    </div>
  );
}

function CertBlock({ certifications, className = "text-xs text-slate-600" }) {
  if (!certifications?.length) return null;
  return (
    <div className="space-y-2">
      {certifications.map((c) => (
        <div key={c.id} className={className}>
          <span className="font-semibold text-slate-800">{c.title}</span>
          {c.issuer && <span className="text-slate-500"> — {c.issuer}</span>}
          {c.date && <span className="text-slate-400"> ({c.date})</span>}
        </div>
      ))}
    </div>
  );
}

function ProSectionTitle({ title, theme, variant = "default", align = "left" }) {
  const alignClass = align === "center" ? "text-center" : "";
  if (variant === "sidebar") {
    return (
      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 border-b border-white/20 pb-2 mb-3">
        {title}
      </h3>
    );
  }
  if (variant === "underline") {
    return (
      <h3
        className={`text-[11px] font-bold uppercase tracking-[0.18em] pb-1.5 mb-4 border-b ${alignClass}`}
        style={{ color: theme.primary, borderColor: theme.light }}
      >
        {title}
      </h3>
    );
  }
  return (
    <h3 className={`text-[11px] font-bold uppercase tracking-[0.15em] text-slate-800 mb-3 flex items-center gap-2 ${alignClass}`}>
      <span className="w-8 h-0.5 shrink-0" style={{ backgroundColor: theme.primary }} />
      {title}
    </h3>
  );
}

// ---------------- Template Renderers ----------------

function ExecutiveTemplate({ data, theme }) {
  const { personal } = data;
  return (
    <div className="flex min-h-[1050px] text-slate-800">
      <aside className="w-[32%] shrink-0 px-7 py-10 text-white print:text-white" style={{ backgroundColor: theme.primary }}>
        {personal.profilePic ? (
          <img src={personal.profilePic} alt="" className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-white/25 mb-6 shadow-lg" />
        ) : (
          <div className="w-28 h-28 rounded-full mx-auto bg-white/10 border-2 border-white/20 flex items-center justify-center mb-6">
            <User size={36} className="text-white/50" />
          </div>
        )}
        <h1 className="text-xl font-bold leading-tight text-center mb-1">{personal.name}</h1>
        <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-center text-white/75 mb-8">{personal.title}</p>

        <div className="space-y-7">
          <div>
            <ProSectionTitle title="Contact" variant="sidebar" />
            <div className="space-y-2.5 text-[10px] text-white/85 leading-relaxed">
              {personal.email && <p>{personal.email}</p>}
              {personal.phone && <p>{personal.phone}</p>}
              {personal.location && <p>{personal.location}</p>}
              {personal.linkedin && <p className="break-all">{personal.linkedin}</p>}
              {personal.github && <p className="break-all">{personal.github}</p>}
            </div>
          </div>

          <div>
            <ProSectionTitle title="Core Skills" variant="sidebar" />
            <SkillPills skills={data.skills} theme={theme} variant="dark" />
          </div>

          {data.languages && (
            <div>
              <ProSectionTitle title="Languages" variant="sidebar" />
              <p className="text-[10px] text-white/80 leading-relaxed">{data.languages}</p>
            </div>
          )}

          {data.certifications?.length > 0 && (
            <div>
              <ProSectionTitle title="Certifications" variant="sidebar" />
              <CertBlock certifications={data.certifications} className="text-[10px] text-white/85" />
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 px-9 py-10 space-y-7 bg-white">
        {personal.summary && (
          <section>
            <ProSectionTitle title="Professional Summary" theme={theme} variant="underline" />
            <p className="text-[13px] leading-[1.65] text-slate-600 text-justify">{personal.summary}</p>
          </section>
        )}

        {data.experience?.length > 0 && (
          <section>
            <ProSectionTitle title="Work Experience" theme={theme} variant="underline" />
            <div className="space-y-5">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <h4 className="text-[13px] font-bold text-slate-900">{exp.title}</h4>
                    <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap shrink-0">{exp.duration}</span>
                  </div>
                  <p className="text-[11px] font-semibold mb-2" style={{ color: theme.primary }}>{exp.company}</p>
                  <BulletList text={exp.description} />
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education?.length > 0 && (
          <section>
            <ProSectionTitle title="Education" theme={theme} variant="underline" />
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between gap-4">
                  <div>
                    <h4 className="text-[13px] font-bold text-slate-900">{edu.degree}</h4>
                    <p className="text-[11px] text-slate-500">{edu.university}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-slate-400">{edu.duration}</p>
                    {edu.grade && <p className="text-[10px] font-medium" style={{ color: theme.primary }}>{edu.grade}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects?.length > 0 && (
          <section>
            <ProSectionTitle title="Projects" theme={theme} variant="underline" />
            <div className="space-y-4">
              {data.projects.map((p) => (
                <div key={p.id}>
                  <div className="flex justify-between items-baseline gap-2">
                    <h4 className="text-[12px] font-bold text-slate-900">{p.title}</h4>
                    {p.link && <span className="text-[9px] text-slate-400 truncate max-w-[45%]">{p.link}</span>}
                  </div>
                  <BulletList text={p.description} className="text-[11px] text-slate-600 mt-1" />
                </div>
              ))}
            </div>
          </section>
        )}

        {data.achievements && (
          <section>
            <ProSectionTitle title="Achievements" theme={theme} variant="underline" />
            <BulletList text={data.achievements} className="text-[11px] text-slate-600" />
          </section>
        )}
      </main>
    </div>
  );
}

function ClassicTemplate({ data, theme }) {
  const { personal } = data;
  return (
    <div className="px-10 py-11 space-y-7 text-slate-900">
      <header className="text-center border-b-2 pb-6" style={{ borderColor: theme.primary }}>
        <h1 className="text-3xl font-normal tracking-[0.12em] uppercase mb-2">{personal.name}</h1>
        <p className="text-sm italic text-slate-600 mb-3">{personal.title}</p>
        <ContactRow
          className="justify-center text-[10px] uppercase tracking-wider"
          items={[personal.location, personal.phone, personal.email, personal.linkedin, personal.github]}
        />
      </header>

      {personal.summary && (
        <section>
          <ProSectionTitle title="Summary" theme={theme} align="center" variant="underline" />
          <p className="text-sm leading-relaxed text-justify text-slate-700 px-2">{personal.summary}</p>
        </section>
      )}

      {data.experience?.length > 0 && (
        <section>
          <ProSectionTitle title="Professional Experience" theme={theme} align="center" variant="underline" />
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-5 last:mb-0">
              <div className="flex justify-between items-baseline">
                <h4 className="text-sm font-bold">{exp.title}</h4>
                <span className="text-[10px] italic text-slate-500">{exp.duration}</span>
              </div>
              <p className="text-xs font-semibold mb-2" style={{ color: theme.primary }}>{exp.company}</p>
              <BulletList text={exp.description} className="text-xs text-slate-700 leading-relaxed" />
            </div>
          ))}
        </section>
      )}

      {data.education?.length > 0 && (
        <section>
          <ProSectionTitle title="Education" theme={theme} align="center" variant="underline" />
          {data.education.map((edu) => (
            <div key={edu.id} className="flex justify-between mb-3 last:mb-0">
              <div>
                <h4 className="text-sm font-bold">{edu.degree}</h4>
                <p className="text-xs text-slate-600 italic">{edu.university}</p>
              </div>
              <div className="text-right text-[10px] text-slate-500">
                <p>{edu.duration}</p>
                {edu.grade && <p className="font-semibold" style={{ color: theme.primary }}>{edu.grade}</p>}
              </div>
            </div>
          ))}
        </section>
      )}

      <div className="grid grid-cols-2 gap-10">
        {data.skills && (
          <section>
            <ProSectionTitle title="Skills" theme={theme} variant="underline" />
            <SkillPills skills={data.skills} theme={theme} />
          </section>
        )}
        {(data.languages || data.achievements) && (
          <section>
            {data.languages && (
              <>
                <ProSectionTitle title="Languages" theme={theme} variant="underline" />
                <p className="text-xs text-slate-700 mb-4">{data.languages}</p>
              </>
            )}
            {data.achievements && (
              <>
                <ProSectionTitle title="Honors & Awards" theme={theme} variant="underline" />
                <BulletList text={data.achievements} className="text-xs text-slate-700" />
              </>
            )}
          </section>
        )}
      </div>

      {data.projects?.length > 0 && (
        <section>
          <ProSectionTitle title="Selected Projects" theme={theme} align="center" variant="underline" />
          {data.projects.map((p) => (
            <div key={p.id} className="mb-4 last:mb-0">
              <h4 className="text-sm font-bold">{p.title}{p.link && <span className="font-normal text-slate-500 text-xs"> — {p.link}</span>}</h4>
              <BulletList text={p.description} className="text-xs text-slate-700 mt-1" />
            </div>
          ))}
        </section>
      )}

      {data.certifications?.length > 0 && (
        <section>
          <ProSectionTitle title="Certifications" theme={theme} align="center" variant="underline" />
          <CertBlock certifications={data.certifications} />
        </section>
      )}
    </div>
  );
}

function MinimalTemplate({ data, theme }) {
  const { personal } = data;
  return (
    <div className="px-11 py-12 space-y-8 text-slate-800">
      <header className="border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 mb-1">{personal.name}</h1>
        <p className="text-sm text-slate-500 mb-3">{personal.title}</p>
        <ContactRow items={[personal.email, personal.phone, personal.location, personal.linkedin, personal.github]} />
      </header>

      {personal.summary && (
        <section>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">About</h3>
          <p className="text-[13px] leading-[1.7] text-slate-600 max-w-prose">{personal.summary}</p>
        </section>
      )}

      {data.experience?.length > 0 && (
        <section>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">Experience</h3>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1">
                <h4 className="text-[13px] font-semibold text-slate-900 col-span-1">{exp.title}</h4>
                <span className="text-[11px] text-slate-400 text-right row-span-2 self-start">{exp.duration}</span>
                <p className="text-[11px] text-slate-500 col-span-1">{exp.company}</p>
                <div className="col-span-2 mt-1">
                  <BulletList text={exp.description} className="text-[12px] text-slate-600 leading-relaxed" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education?.length > 0 && (
        <section>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">Education</h3>
          {data.education.map((edu) => (
            <div key={edu.id} className="flex justify-between mb-3 last:mb-0">
              <div>
                <h4 className="text-[13px] font-semibold">{edu.degree}</h4>
                <p className="text-[11px] text-slate-500">{edu.university}</p>
              </div>
              <div className="text-right text-[11px] text-slate-400">
                <p>{edu.duration}</p>
                {edu.grade && <p className="text-slate-600">{edu.grade}</p>}
              </div>
            </div>
          ))}
        </section>
      )}

      {data.skills && (
        <section>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">Skills</h3>
          <p className="text-[12px] text-slate-600 leading-relaxed">{parseSkills(data.skills).join(' · ')}</p>
        </section>
      )}

      {data.projects?.length > 0 && (
        <section>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">Projects</h3>
          {data.projects.map((p) => (
            <div key={p.id} className="mb-4 last:mb-0">
              <h4 className="text-[13px] font-semibold">{p.title}</h4>
              {p.link && <p className="text-[10px] text-slate-400 mb-1">{p.link}</p>}
              <BulletList text={p.description} className="text-[12px] text-slate-600" />
            </div>
          ))}
        </section>
      )}

      {(data.languages || data.achievements || data.certifications?.length > 0) && (
        <section className="grid grid-cols-2 gap-8 pt-2 border-t border-slate-100">
          {data.languages && (
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">Languages</h3>
              <p className="text-[12px] text-slate-600">{data.languages}</p>
            </div>
          )}
          {data.achievements && (
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">Achievements</h3>
              <BulletList text={data.achievements} className="text-[12px] text-slate-600" />
            </div>
          )}
          {data.certifications?.length > 0 && (
            <div className="col-span-2">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">Certifications</h3>
              <CertBlock certifications={data.certifications} className="text-[12px] text-slate-600" />
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function ModernTemplate({ data, theme }) {
  const { personal } = data;
  return (
    <div className="px-10 py-11 space-y-8">
      <header className="flex justify-between items-start gap-6 border-b-4 pb-7" style={{ borderColor: theme.primary }}>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">{personal.name}</h1>
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: theme.primary }}>{personal.title}</h2>
          <div className="mt-4">
            <ContactRow items={[personal.email, personal.phone, personal.location, personal.linkedin, personal.github]} />
          </div>
        </div>
        {personal.profilePic && (
          <img src={personal.profilePic} className="w-20 h-20 rounded-xl object-cover border-2 border-white shadow-md shrink-0" alt="" />
        )}
      </header>

      {personal.summary && (
        <section>
          <ProSectionTitle title="Profile" theme={theme} />
          <p className="text-[13px] leading-relaxed text-slate-600 text-justify">{personal.summary}</p>
        </section>
      )}

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-8 space-y-7">
          <section>
            <ProSectionTitle title="Experience" theme={theme} />
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative pl-5 border-l-2 border-slate-100 pb-5 last:pb-0 mb-1">
                <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-white border-2" style={{ borderColor: theme.primary }} />
                <div className="flex justify-between items-baseline gap-2 mb-0.5">
                  <h4 className="font-semibold text-slate-900 text-[13px]">{exp.title}</h4>
                  <span className="text-[10px] text-slate-400 shrink-0">{exp.duration}</span>
                </div>
                <p className="text-[11px] font-medium mb-2" style={{ color: theme.primary }}>{exp.company}</p>
                <BulletList text={exp.description} />
              </div>
            ))}
          </section>

          <section>
            <ProSectionTitle title="Education" theme={theme} />
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3 last:mb-0 flex justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-slate-900 text-[13px]">{edu.degree}</h4>
                  <p className="text-[11px] text-slate-500">{edu.university}</p>
                </div>
                <div className="text-right text-[10px] text-slate-400 shrink-0">
                  <p>{edu.duration}</p>
                  {edu.grade && <p className="font-medium" style={{ color: theme.primary }}>{edu.grade}</p>}
                </div>
              </div>
            ))}
          </section>
        </div>

        <div className="col-span-4 space-y-7">
          <section>
            <ProSectionTitle title="Skills" theme={theme} />
            <SkillPills skills={data.skills} theme={theme} />
          </section>
          <section>
            <ProSectionTitle title="Projects" theme={theme} />
            {data.projects.map((p) => (
              <div key={p.id} className="mb-4 last:mb-0">
                <h4 className="font-semibold text-slate-900 text-[12px]">{p.title}</h4>
                <BulletList text={p.description} className="text-[10px] text-slate-600 mt-1" />
                {p.link && <p className="text-[9px] mt-1 truncate" style={{ color: theme.primary }}>{p.link}</p>}
              </div>
            ))}
          </section>
          {data.achievements && (
            <section>
              <ProSectionTitle title="Achievements" theme={theme} />
              <BulletList text={data.achievements} className="text-[10px] text-slate-600" />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfessionalTemplate({ data, theme }) {
  const { personal } = data;
  return (
    <div className="px-10 py-11 space-y-7 text-slate-900">
      <header className="text-center border-b-2 pb-7" style={{ borderColor: theme.primary }}>
        <h1 className="text-3xl font-serif font-normal uppercase tracking-[0.15em] mb-2">{personal.name}</h1>
        <p className="text-sm text-slate-600 mb-3 tracking-wide">{personal.title}</p>
        <ContactRow
          className="text-center text-[10px] uppercase tracking-wider"
          items={[personal.location, personal.phone, personal.email]}
        />
        <ContactRow
          className="text-center text-[9px] text-slate-400 mt-1"
          items={[personal.linkedin && `LinkedIn: ${personal.linkedin}`, personal.github && `GitHub: ${personal.github}`]}
        />
      </header>

      {personal.summary && (
        <section>
          <ProSectionTitle title="Professional Profile" theme={theme} align="center" variant="underline" />
          <p className="text-sm leading-[1.7] text-justify text-slate-700 px-4">{personal.summary}</p>
        </section>
      )}

      <section>
        <ProSectionTitle title="Professional Experience" theme={theme} align="center" variant="underline" />
        {data.experience.map((exp) => (
          <div key={exp.id} className="mb-6 last:mb-0">
            <div className="flex justify-between items-baseline gap-4">
              <h4 className="text-sm font-bold">{exp.title}</h4>
              <span className="text-[10px] text-slate-500 italic shrink-0">{exp.duration}</span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2 text-slate-600">{exp.company}</p>
            <BulletList text={exp.description} className="text-sm text-slate-700 leading-relaxed" />
          </div>
        ))}
      </section>

      <section>
        <ProSectionTitle title="Education" theme={theme} align="center" variant="underline" />
        {data.education.map((edu) => (
          <div key={edu.id} className="flex justify-between mb-3 last:mb-0">
            <div>
              <h4 className="text-sm font-bold">{edu.degree}</h4>
              <p className="text-xs text-slate-600">{edu.university}</p>
            </div>
            <div className="text-right text-[10px] text-slate-500">
              <p className="italic">{edu.duration}</p>
              {edu.grade && <p className="font-semibold" style={{ color: theme.primary }}>{edu.grade}</p>}
            </div>
          </div>
        ))}
      </section>

      {data.projects?.length > 0 && (
        <section>
          <ProSectionTitle title="Key Projects" theme={theme} align="center" variant="underline" />
          {data.projects.map((p) => (
            <div key={p.id} className="mb-4 last:mb-0">
              <h4 className="text-sm font-bold">{p.title}</h4>
              <BulletList text={p.description} className="text-xs text-slate-700 mt-1" />
            </div>
          ))}
        </section>
      )}

      <div className="grid grid-cols-2 gap-10">
        <section>
          <ProSectionTitle title="Technical Skills" theme={theme} variant="underline" />
          <SkillPills skills={data.skills} theme={theme} />
        </section>
        <section>
          <ProSectionTitle title="Languages & Honors" theme={theme} variant="underline" />
          {data.languages && <p className="text-xs text-slate-700 mb-3">{data.languages}</p>}
          <BulletList text={data.achievements} className="text-xs text-slate-700" />
        </section>
      </div>

      {data.certifications?.length > 0 && (
        <section>
          <ProSectionTitle title="Certifications" theme={theme} align="center" variant="underline" />
          <CertBlock certifications={data.certifications} />
        </section>
      )}
    </div>
  );
}

function CreativeTemplate({ data, theme }) {
  const { personal } = data;
  return (
    <div className="flex min-h-[1050px]">
      <aside className="w-[34%] shrink-0 text-white px-7 py-10" style={{ backgroundColor: theme.primary }}>
        <div className="text-center mb-8">
          {personal.profilePic ? (
            <img src={personal.profilePic} className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-white/25 shadow-lg mb-5" alt="" />
          ) : (
            <div className="w-28 h-28 rounded-full mx-auto bg-white/10 border-2 border-white/20 flex items-center justify-center mb-5">
              <User size={36} className="text-white/50" />
            </div>
          )}
          <h1 className="text-xl font-bold leading-tight mb-1">{personal.name}</h1>
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/70">{personal.title}</p>
        </div>

        <div className="space-y-7">
          <div>
            <ProSectionTitle title="Contact" variant="sidebar" />
            <div className="space-y-2.5 text-[10px] text-white/85 break-all">
              {personal.email && <p className="flex items-center gap-2"><FileText size={12} className="opacity-50 shrink-0" /> {personal.email}</p>}
              {personal.phone && <p>{personal.phone}</p>}
              {personal.location && <p className="flex items-center gap-2"><Globe size={12} className="opacity-50 shrink-0" /> {personal.location}</p>}
              {personal.linkedin && <p>{personal.linkedin}</p>}
              {personal.github && <p>{personal.github}</p>}
            </div>
          </div>

          <div>
            <ProSectionTitle title="Skills" variant="sidebar" />
            <SkillPills skills={data.skills} theme={theme} variant="dark" />
          </div>

          {data.languages && (
            <div>
              <ProSectionTitle title="Languages" variant="sidebar" />
              <p className="text-[10px] text-white/80 leading-relaxed">{data.languages}</p>
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 px-9 py-10 space-y-8 bg-white">
        {personal.summary && (
          <section>
            <ProSectionTitle title="About" theme={theme} variant="underline" />
            <p className="text-[13px] leading-relaxed text-slate-600 text-justify">{personal.summary}</p>
          </section>
        )}

        <section>
          <ProSectionTitle title="Experience" theme={theme} variant="underline" />
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-6 last:mb-0">
              <div className="flex justify-between items-baseline gap-2">
                <h4 className="text-[14px] font-bold text-slate-900">{exp.title}</h4>
                <span className="text-[10px] text-slate-400 shrink-0">{exp.duration}</span>
              </div>
              <p className="text-[11px] font-semibold mb-2" style={{ color: theme.primary }}>{exp.company}</p>
              <BulletList text={exp.description} />
            </div>
          ))}
        </section>

        {data.education?.length > 0 && (
          <section>
            <ProSectionTitle title="Education" theme={theme} variant="underline" />
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3 last:mb-0 flex justify-between">
                <div>
                  <h4 className="text-[13px] font-bold">{edu.degree}</h4>
                  <p className="text-[11px] text-slate-500">{edu.university}</p>
                </div>
                <span className="text-[10px] text-slate-400">{edu.duration}</span>
              </div>
            ))}
          </section>
        )}

        <section>
          <ProSectionTitle title="Projects" theme={theme} variant="underline" />
          {data.projects.map((p) => (
            <div key={p.id} className="mb-4 last:mb-0 p-4 rounded-lg" style={{ backgroundColor: theme.light }}>
              <h4 className="font-semibold text-slate-900 text-[12px]">{p.title}</h4>
              <BulletList text={p.description} className="text-[11px] text-slate-600 mt-1" />
              {p.link && <p className="text-[9px] mt-1" style={{ color: theme.primary }}>{p.link}</p>}
            </div>
          ))}
        </section>

        {data.achievements && (
          <section>
            <ProSectionTitle title="Achievements" theme={theme} variant="underline" />
            <BulletList text={data.achievements} className="text-[11px] text-slate-600" />
          </section>
        )}
      </main>
    </div>
  );
}

// ---------------- Role suggestion ----------------

function RoleSuggestionBox({ selectedRole, currentTemplate, onRoleChange, onApplyTemplate }) {
  const [showFullGuide, setShowFullGuide] = useState(false);
  const roleIndex = selectedRole !== '' ? Number(selectedRole) : -1;
  const suggestion = roleIndex >= 0 ? ROLE_TEMPLATE_GUIDE[roleIndex] : null;
  const isMatch = suggestion && currentTemplate === suggestion.template;

  return (
    <div className="mb-6 rounded-[1.75rem] border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 via-white to-slate-50 shadow-sm overflow-hidden print:hidden">
      <div className="px-5 py-4 border-b border-emerald-100/80 flex items-start gap-3">
        <div className="p-2 bg-emerald-500 rounded-xl text-white shrink-0 mt-0.5">
          <Lightbulb size={18} />
        </div>
        <div>
          <h2 className="text-sm font-black text-slate-900 tracking-tight">Which resume fits your role?</h2>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
            Pick your target role — we&apos;ll suggest the best layout for that industry.
          </p>
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Your target role
          </label>
          <select
            value={selectedRole}
            onChange={(e) => onRoleChange(e.target.value)}
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="">— Select a role —</option>
            {ROLE_TEMPLATE_GUIDE.map((item, index) => (
              <option key={index} value={String(index)}>
                {item.role}
              </option>
            ))}
          </select>
        </div>

        <AnimatePresence mode="wait">
          {suggestion && (
            <motion.div
              key={roleIndex}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-2xl border border-emerald-100 bg-white p-4 space-y-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Best fit</span>
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase tracking-wide">
                  {TEMPLATE_LABELS[suggestion.template]}
                </span>
                {isMatch && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-emerald-700 uppercase">
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{suggestion.reason}</p>
              {!isMatch && (
                <button
                  type="button"
                  onClick={() => onApplyTemplate(suggestion.template)}
                  className="w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
                >
                  Use {TEMPLATE_LABELS[suggestion.template]} template
                  <ChevronRight size={14} />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setShowFullGuide((v) => !v)}
          className="w-full flex items-center justify-between text-[11px] font-bold text-emerald-700 uppercase tracking-wider py-2 hover:text-emerald-600 transition-colors"
        >
          {showFullGuide ? 'Hide full role guide' : 'View all roles & templates'}
          {showFullGuide ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        <AnimatePresence>
          {showFullGuide && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="max-h-64 overflow-y-auto custom-scrollbar rounded-xl border border-slate-100 bg-slate-50/80">
                <table className="w-full text-left text-[11px]">
                  <thead className="sticky top-0 bg-slate-100 z-10">
                    <tr>
                      <th className="px-3 py-2 font-black text-slate-500 uppercase tracking-wider">Role</th>
                      <th className="px-3 py-2 font-black text-slate-500 uppercase tracking-wider w-24">Template</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {ROLE_TEMPLATE_GUIDE.map((item, index) => (
                      <tr
                        key={index}
                        className={`hover:bg-white cursor-pointer transition-colors ${String(index) === selectedRole ? 'bg-emerald-50' : ''}`}
                        onClick={() => {
                          onRoleChange(String(index));
                          onApplyTemplate(item.template);
                        }}
                      >
                        <td className="px-3 py-2.5 text-slate-700 font-medium">{item.role}</td>
                        <td className="px-3 py-2.5">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-white border border-slate-200 font-bold text-emerald-700 text-[10px] uppercase">
                            {TEMPLATE_LABELS[item.template]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 px-1">Click any row to select that role and apply its template.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
