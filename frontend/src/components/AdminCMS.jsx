import { useState, useEffect } from "react";
import API from "../utils/axios";
import {
  Plus, Pencil, Trash2, Eye, EyeOff, CheckCircle, AlertCircle, X,
  Image as ImageIcon, Briefcase, Mail, Bell, FileText, Youtube, Megaphone,
} from "lucide-react";

function Toast({ msg }) {
  if (!msg?.text) return null;
  return (
    <div className={`flex items-center gap-3 p-4 rounded-2xl border mb-6 ${
      msg.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-rose-50 border-rose-200 text-rose-800"
    }`}>
      {msg.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
      <span className="font-bold text-sm">{msg.text}</span>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder = "", rows }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      {rows ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-semibold text-slate-800 resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-semibold text-slate-800"
        />
      )}
    </div>
  );
}

function useMsg() {
  const [msg, setMsg] = useState({ type: "", text: "" });
  const show = (type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg({ type: "", text: "" }), 4000);
  };
  return [msg, show];
}

/* ===================== GALLERY ===================== */
export function AdminGallery({ filters = {} }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ type: "image", title: "", description: "", url: "", videoId: "", order: 0, isActive: true });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [msg, show] = useMsg();

  const load = async () => {
    setLoading(true);
    try {
      const res = await API.get("/cms/gallery");
      setItems(res.data);
    } catch {
      show("error", "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = items.filter((i) => {
    if (!filters.search) return true;
    const q = filters.search.toLowerCase();
    return i.title?.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q);
  });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return show("error", "Title required");
    if (form.type === "image" && !form.url.trim()) return show("error", "Image URL required");
    if (form.type === "youtube" && !form.videoId.trim()) return show("error", "YouTube video ID required");
    try {
      if (editingId) await API.put(`/cms/gallery/${editingId}`, form);
      else await API.post("/cms/gallery", form);
      show("success", editingId ? "Updated" : "Added");
      setShowForm(false);
      setEditingId(null);
      load();
    } catch (err) {
      show("error", err.response?.data?.message || "Save failed");
    }
  };

  return (
    <div className="space-y-6">
      <Toast msg={msg} />
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-500">Manage `/gallery` images and YouTube videos.</p>
        <button type="button" onClick={() => { setEditingId(null); setForm({ type: "image", title: "", description: "", url: "", videoId: "", order: items.length, isActive: true }); setShowForm(true); }}
          className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-2xl font-bold text-sm hover:bg-emerald-700">
          <Plus size={16} /> Add item
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow space-y-4">
          <div className="flex justify-between"><h3 className="font-black">{editingId ? "Edit" : "New"} gallery item</h3>
            <button type="button" onClick={() => setShowForm(false)}><X size={18} /></button></div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 rounded-2xl font-semibold text-sm outline-none">
                <option value="image">Image</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>
            <Field label="Title *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
            <div className="md:col-span-2"><Field label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={2} /></div>
            {form.type === "image"
              ? <div className="md:col-span-2"><Field label="Image URL *" value={form.url} onChange={(v) => setForm({ ...form, url: v })} placeholder="https://res.cloudinary.com/..." /></div>
              : <Field label="YouTube Video ID *" value={form.videoId} onChange={(v) => setForm({ ...form, videoId: v })} placeholder="eStNXTXcXSU" />}
            <Field label="Order" type="number" value={form.order} onChange={(v) => setForm({ ...form, order: Number(v) })} />
            <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Visible</label>
          </div>
          <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-2xl font-black">Save</button>
        </form>
      )}

      <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden">
        {loading ? <p className="p-10 text-center text-slate-400 font-bold">Loading...</p> : filtered.length === 0 ? (
          <p className="p-10 text-center text-slate-400 font-bold">No gallery items yet. Add your first image or video.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {filtered.map((item) => (
              <li key={item._id} className={`flex flex-wrap items-center gap-4 p-4 ${!item.isActive ? "opacity-50" : ""}`}>
                {item.type === "image" && item.url ? (
                  <img src={item.url} alt="" className="w-16 h-12 object-cover rounded-lg" />
                ) : (
                  <div className="w-16 h-12 bg-rose-50 rounded-lg flex items-center justify-center text-rose-500"><Youtube size={20} /></div>
                )}
                <div className="flex-1 min-w-[160px]">
                  <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                  <p className="text-xs text-slate-400">{item.type} · order {item.order}</p>
                </div>
                <button type="button" onClick={async () => { await API.put(`/cms/gallery/${item._id}`, { isActive: !item.isActive }); load(); }} className="p-2 bg-slate-100 rounded-xl">{item.isActive ? <Eye size={16} /> : <EyeOff size={16} />}</button>
                <button type="button" onClick={() => { setEditingId(item._id); setForm({ type: item.type, title: item.title, description: item.description || "", url: item.url || "", videoId: item.videoId || "", order: item.order || 0, isActive: item.isActive !== false }); setShowForm(true); }} className="p-2 bg-emerald-50 text-emerald-700 rounded-xl"><Pencil size={16} /></button>
                <button type="button" onClick={async () => { if (!confirm("Delete?")) return; await API.delete(`/cms/gallery/${item._id}`); show("success", "Deleted"); load(); }} className="p-2 bg-rose-50 text-rose-600 rounded-xl"><Trash2 size={16} /></button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ===================== PROJECTS ===================== */
const EMPTY_PROJECT = {
  name: "", description: "", category: "easy", icon: "📁", images: "", videoLink: "",
  studentPrice: 999, businessPrice: 2999, features: "", deliveryTime: 7, isActive: true,
};

export function AdminProjects({ filters = {} }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_PROJECT);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("all");
  const [msg, show] = useMsg();

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category !== "all") params.set("category", category);
      if (filters.search) params.set("search", filters.search);
      const res = await API.get(`/cms/projects?${params}`);
      setItems(res.data);
    } catch {
      show("error", "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [category, filters.search]);

  const toPayload = () => ({
    ...form,
    studentPrice: Number(form.studentPrice),
    businessPrice: Number(form.businessPrice),
    deliveryTime: Number(form.deliveryTime),
    images: String(form.images || "").split(/[\n,]/).map((s) => s.trim()).filter(Boolean),
    features: String(form.features || "").split(/[\n,]/).map((s) => s.trim()).filter(Boolean),
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) await API.put(`/projects/${editingId}`, toPayload());
      else await API.post("/projects", toPayload());
      show("success", editingId ? "Updated" : "Created");
      setShowForm(false);
      setEditingId(null);
      load();
    } catch (err) {
      show("error", err.response?.data?.message || "Save failed");
    }
  };

  return (
    <div className="space-y-6">
      <Toast msg={msg} />
      <div className="flex flex-wrap justify-between gap-4 items-center">
        <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
          {["all", "easy", "medium", "hard"].map((c) => (
            <button key={c} type="button" onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase ${category === c ? "bg-white text-emerald-700 shadow" : "text-slate-500"}`}>
              {c}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => { setEditingId(null); setForm(EMPTY_PROJECT); setShowForm(true); }}
          className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-2xl font-bold text-sm">
          <Plus size={16} /> Add project
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="bg-white p-6 rounded-[2rem] border shadow space-y-4">
          <div className="flex justify-between"><h3 className="font-black">{editingId ? "Edit" : "New"} project</h3>
            <button type="button" onClick={() => setShowForm(false)}><X size={18} /></button></div>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 rounded-2xl font-semibold text-sm">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="md:col-span-2"><Field label="Description *" value={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={3} /></div>
            <Field label="Student price" type="number" value={form.studentPrice} onChange={(v) => setForm({ ...form, studentPrice: v })} />
            <Field label="Business price" type="number" value={form.businessPrice} onChange={(v) => setForm({ ...form, businessPrice: v })} />
            <Field label="Delivery days" type="number" value={form.deliveryTime} onChange={(v) => setForm({ ...form, deliveryTime: v })} />
            <Field label="Icon / emoji" value={form.icon} onChange={(v) => setForm({ ...form, icon: v })} />
            <Field label="Video link" value={form.videoLink} onChange={(v) => setForm({ ...form, videoLink: v })} />
            <div className="md:col-span-2"><Field label="Image URLs (comma or new line)" value={form.images} onChange={(v) => setForm({ ...form, images: v })} rows={2} /></div>
            <div className="md:col-span-2"><Field label="Features (comma or new line)" value={form.features} onChange={(v) => setForm({ ...form, features: v })} rows={2} /></div>
            <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Active / visible</label>
          </div>
          <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-2xl font-black">Save project</button>
        </form>
      )}

      <div className="bg-white rounded-[2rem] border overflow-hidden">
        {loading ? <p className="p-10 text-center text-slate-400 font-bold">Loading...</p> : (
          <ul className="divide-y">
            {items.map((p) => (
              <li key={p._id} className={`flex flex-wrap items-center gap-4 p-4 ${!p.isActive ? "opacity-50" : ""}`}>
                <span className="text-2xl">{p.icon || "📁"}</span>
                <div className="flex-1 min-w-[160px]">
                  <p className="font-bold text-sm">{p.name}</p>
                  <p className="text-xs text-slate-400 uppercase">{p.category} · ₹{p.studentPrice} / ₹{p.businessPrice}</p>
                </div>
                <button type="button" onClick={async () => { await API.put(`/projects/${p._id}`, { isActive: !p.isActive }); load(); }} className="p-2 bg-slate-100 rounded-xl">{p.isActive ? <Eye size={16} /> : <EyeOff size={16} />}</button>
                <button type="button" onClick={() => { setEditingId(p._id); setForm({ name: p.name, description: p.description, category: p.category, icon: p.icon || "📁", images: (p.images || []).join("\n"), videoLink: p.videoLink || "", studentPrice: p.studentPrice, businessPrice: p.businessPrice, features: (p.features || []).join("\n"), deliveryTime: p.deliveryTime || 7, isActive: p.isActive !== false }); setShowForm(true); }} className="p-2 bg-emerald-50 text-emerald-700 rounded-xl"><Pencil size={16} /></button>
                <button type="button" onClick={async () => { if (!confirm("Delete project?")) return; await API.delete(`/projects/${p._id}`); show("success", "Deleted"); load(); }} className="p-2 bg-rose-50 text-rose-600 rounded-xl"><Trash2 size={16} /></button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="text-xs text-slate-400">Partners on `/partners` are managed under <strong>Team & Partners</strong>.</p>
    </div>
  );
}

/* ===================== CAREERS ===================== */
export function AdminCareers({ filters = {} }) {
  const [apps, setApps] = useState([]);
  const [positions, setPositions] = useState([]);
  const [posText, setPosText] = useState("");
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("applications");
  const [msg, show] = useMsg();

  const loadApps = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.set("search", filters.search);
      const res = await API.get(`/cms/applications?${params}`);
      setApps(res.data);
    } catch {
      show("error", "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const loadPositions = async () => {
    try {
      const res = await API.get("/cms/content/career_positions");
      const list = res.data?.positions || [];
      setPositions(list);
      setPosText(list.map((p) => `${p.title} | ${p.desc}`).join("\n"));
    } catch {
      show("error", "Failed to load positions");
    }
  };

  useEffect(() => { loadApps(); loadPositions(); }, [filters.search]);

  const savePositions = async () => {
    const positions = posText.split("\n").map((line) => {
      const [title, ...rest] = line.split("|");
      return { title: (title || "").trim(), desc: rest.join("|").trim() };
    }).filter((p) => p.title);
    try {
      await API.put("/cms/content/career_positions", { positions });
      show("success", "Open positions saved");
      setPositions(positions);
    } catch {
      show("error", "Save failed");
    }
  };

  return (
    <div className="space-y-6">
      <Toast msg={msg} />
      <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        <button type="button" onClick={() => setTab("applications")} className={`px-4 py-2 rounded-xl text-xs font-black uppercase ${tab === "applications" ? "bg-white shadow text-emerald-700" : "text-slate-500"}`}>Applications</button>
        <button type="button" onClick={() => setTab("positions")} className={`px-4 py-2 rounded-xl text-xs font-black uppercase ${tab === "positions" ? "bg-white shadow text-emerald-700" : "text-slate-500"}`}>Open roles</button>
      </div>

      {tab === "positions" ? (
        <div className="bg-white p-6 rounded-[2rem] border space-y-4">
          <p className="text-sm text-slate-500">One role per line: <code className="bg-slate-100 px-1 rounded">Title | Description</code></p>
          <textarea value={posText} onChange={(e) => setPosText(e.target.value)} rows={8}
            className="w-full px-4 py-3 bg-slate-50 rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500" />
          <button type="button" onClick={savePositions} className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black text-sm">Save positions</button>
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] border overflow-hidden">
          {loading ? <p className="p-10 text-center text-slate-400 font-bold">Loading...</p> : apps.length === 0 ? (
            <p className="p-10 text-center text-slate-400 font-bold">No applications yet.</p>
          ) : (
            <ul className="divide-y">
              {apps.map((a) => (
                <li key={a._id} className="p-5 space-y-2">
                  <div className="flex flex-wrap justify-between gap-2">
                    <div>
                      <p className="font-bold text-slate-900">{a.name} <span className="text-emerald-600 text-sm font-semibold">· {a.position}</span></p>
                      <p className="text-xs text-slate-500">{a.email} · {a.phone}</p>
                    </div>
                    <select value={a.status} onChange={async (e) => { await API.put(`/cms/applications/${a._id}`, { status: e.target.value }); loadApps(); }}
                      className="text-xs font-bold px-3 py-2 bg-slate-100 rounded-xl outline-none">
                      {["Pending", "Reviewed", "Shortlisted", "Rejected"].map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  {a.about && <p className="text-sm text-slate-600">{a.about}</p>}
                  <div className="flex gap-3 text-xs">
                    {a.resumeUrl && <a href={a.resumeUrl} target="_blank" rel="noreferrer" className="text-emerald-600 font-bold">Resume</a>}
                    {a.linkedin && <a href={a.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 font-bold">LinkedIn</a>}
                    <button type="button" onClick={async () => { if (!confirm("Delete?")) return; await API.delete(`/cms/applications/${a._id}`); loadApps(); }} className="text-rose-500 font-bold ml-auto">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

/* ===================== CONTACT ===================== */
export function AdminContact({ filters = {} }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, show] = useMsg();

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.set("search", filters.search);
      const res = await API.get(`/cms/contact?${params}`);
      setItems(res.data);
    } catch {
      show("error", "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [filters.search]);

  return (
    <div className="space-y-6">
      <Toast msg={msg} />
      <p className="text-sm text-slate-500">Inbox for messages from `/contact`.</p>
      <div className="bg-white rounded-[2rem] border overflow-hidden">
        {loading ? <p className="p-10 text-center text-slate-400 font-bold">Loading...</p> : items.length === 0 ? (
          <p className="p-10 text-center text-slate-400 font-bold">No messages yet.</p>
        ) : (
          <ul className="divide-y">
            {items.map((m) => (
              <li key={m._id} className={`p-5 ${m.status === "new" ? "bg-emerald-50/40" : ""}`}>
                <div className="flex flex-wrap justify-between gap-2 mb-2">
                  <div>
                    <p className="font-bold">{m.name} <span className="text-slate-400 text-xs font-medium">{new Date(m.createdAt).toLocaleString()}</span></p>
                    <p className="text-xs text-slate-500">{m.email}</p>
                  </div>
                  <select value={m.status} onChange={async (e) => { await API.put(`/cms/contact/${m._id}`, { status: e.target.value }); load(); }}
                    className="text-xs font-bold px-3 py-2 bg-slate-100 rounded-xl">
                    {["new", "read", "replied", "archived"].map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{m.message}</p>
                <button type="button" onClick={async () => { if (!confirm("Delete?")) return; await API.delete(`/cms/contact/${m._id}`); load(); }} className="text-xs text-rose-500 font-bold mt-2">Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ===================== ANNOUNCEMENTS ===================== */
export function AdminAnnouncements() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", body: "", image: "", badge: "", ctaText: "", ctaLink: "", layout: "image-right", bullets: "", order: 0, isActive: true });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [msg, show] = useMsg();

  const load = async () => {
    try {
      const res = await API.get("/cms/announcements");
      setItems(res.data);
    } catch {
      show("error", "Failed to load announcements");
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      bullets: String(form.bullets || "").split("\n").map((s) => s.trim()).filter(Boolean),
      order: Number(form.order) || 0,
    };
    try {
      if (editingId) await API.put(`/cms/announcements/${editingId}`, payload);
      else await API.post("/cms/announcements", payload);
      show("success", "Saved");
      setShowForm(false);
      load();
    } catch (err) {
      show("error", err.response?.data?.message || "Save failed");
    }
  };

  return (
    <div className="space-y-6">
      <Toast msg={msg} />
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-500">Cards shown on `/soon` (Notifications).</p>
        <button type="button" onClick={() => { setEditingId(null); setForm({ title: "", body: "", image: "", badge: "", ctaText: "", ctaLink: "", layout: "image-right", bullets: "", order: items.length, isActive: true }); setShowForm(true); }}
          className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-2xl font-bold text-sm"><Plus size={16} /> Add announcement</button>
      </div>
      {showForm && (
        <form onSubmit={submit} className="bg-white p-6 rounded-[2rem] border space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Title *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
            <Field label="Badge" value={form.badge} onChange={(v) => setForm({ ...form, badge: v })} placeholder="Earning Opportunity" />
            <div className="md:col-span-2"><Field label="Body *" value={form.body} onChange={(v) => setForm({ ...form, body: v })} rows={3} /></div>
            <div className="md:col-span-2"><Field label="Image URL" value={form.image} onChange={(v) => setForm({ ...form, image: v })} /></div>
            <Field label="CTA text" value={form.ctaText} onChange={(v) => setForm({ ...form, ctaText: v })} />
            <Field label="CTA link" value={form.ctaLink} onChange={(v) => setForm({ ...form, ctaLink: v })} />
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Layout</label>
              <select value={form.layout} onChange={(e) => setForm({ ...form, layout: e.target.value })} className="w-full px-4 py-3 bg-slate-50 rounded-2xl text-sm font-semibold">
                <option value="image-right">Image right</option>
                <option value="image-left">Image left</option>
              </select>
            </div>
            <Field label="Order" type="number" value={form.order} onChange={(v) => setForm({ ...form, order: v })} />
            <div className="md:col-span-2"><Field label="Bullets (one per line)" value={form.bullets} onChange={(v) => setForm({ ...form, bullets: v })} rows={3} /></div>
            <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Visible</label>
          </div>
          <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-2xl font-black">Save</button>
        </form>
      )}
      <div className="bg-white rounded-[2rem] border overflow-hidden">
        <ul className="divide-y">
          {items.map((a) => (
            <li key={a._id} className={`p-4 flex flex-wrap gap-3 items-center ${!a.isActive ? "opacity-50" : ""}`}>
              <div className="flex-1"><p className="font-bold text-sm">{a.title}</p><p className="text-xs text-slate-400 line-clamp-1">{a.body}</p></div>
              <button type="button" onClick={() => { setEditingId(a._id); setForm({ title: a.title, body: a.body, image: a.image || "", badge: a.badge || "", ctaText: a.ctaText || "", ctaLink: a.ctaLink || "", layout: a.layout || "image-right", bullets: (a.bullets || []).join("\n"), order: a.order || 0, isActive: a.isActive !== false }); setShowForm(true); }} className="p-2 bg-emerald-50 text-emerald-700 rounded-xl"><Pencil size={16} /></button>
              <button type="button" onClick={async () => { if (!confirm("Delete?")) return; await API.delete(`/cms/announcements/${a._id}`); load(); }} className="p-2 bg-rose-50 text-rose-600 rounded-xl"><Trash2 size={16} /></button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ===================== SITE CONTENT ===================== */
export function AdminSiteContent() {
  const [key, setKey] = useState("channel");
  const [data, setData] = useState({});
  const [jsonText, setJsonText] = useState("{}");
  const [msg, show] = useMsg();

  const labels = {
    channel: "YouTube Channel",
    about: "About page",
    how_it_works: "How it works",
    dashboard_popup: "Dashboard popup",
  };

  const load = async (k = key) => {
    try {
      const res = await API.get(`/cms/content/${k}`);
      setData(res.data || {});
      setJsonText(JSON.stringify(res.data || {}, null, 2));
    } catch {
      show("error", "Failed to load content");
    }
  };

  useEffect(() => { load(key); }, [key]);

  const save = async () => {
    try {
      let parsed;
      try {
        parsed = JSON.parse(jsonText);
      } catch {
        return show("error", "Invalid JSON");
      }
      await API.put(`/cms/content/${key}`, parsed);
      show("success", "Saved — live on site after refresh");
      setData(parsed);
    } catch (err) {
      show("error", err.response?.data?.message || "Save failed");
    }
  };

  return (
    <div className="space-y-6">
      <Toast msg={msg} />
      <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        {Object.keys(labels).map((k) => (
          <button key={k} type="button" onClick={() => setKey(k)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase ${key === k ? "bg-white shadow text-emerald-700" : "text-slate-500"}`}>
            {labels[k]}
          </button>
        ))}
      </div>

      {key === "dashboard_popup" && (
        <div className="bg-white p-6 rounded-[2rem] border space-y-4">
          <label className="flex items-center gap-2 text-sm font-bold">
            <input type="checkbox" checked={!!data.enabled} onChange={(e) => {
              const next = { ...data, enabled: e.target.checked };
              setData(next);
              setJsonText(JSON.stringify(next, null, 2));
            }} /> Show popup on dashboard
          </label>
          <Field label="Image URL" value={data.imageUrl || ""} onChange={(v) => {
            const next = { ...data, imageUrl: v };
            setData(next);
            setJsonText(JSON.stringify(next, null, 2));
          }} />
          <Field label="Optional click link" value={data.link || ""} onChange={(v) => {
            const next = { ...data, link: v };
            setData(next);
            setJsonText(JSON.stringify(next, null, 2));
          }} />
        </div>
      )}

      {key === "channel" && (
        <div className="bg-white p-6 rounded-[2rem] border grid md:grid-cols-2 gap-4">
          {["name", "handle", "description", "profileImage", "bannerImage", "youtubeChannelUrl"].map((field) => (
            <div key={field} className={field === "description" ? "md:col-span-2" : ""}>
              <Field
                label={field}
                value={data[field] || ""}
                rows={field === "description" ? 3 : undefined}
                onChange={(v) => {
                  const next = { ...data, [field]: v };
                  setData(next);
                  setJsonText(JSON.stringify(next, null, 2));
                }}
              />
            </div>
          ))}
        </div>
      )}

      {(key === "about" || key === "how_it_works") && (
        <div className="bg-white p-6 rounded-[2rem] border space-y-3">
          <p className="text-xs text-slate-500">Edit as JSON (steps array supported for How it works).</p>
          <textarea value={jsonText} onChange={(e) => setJsonText(e.target.value)} rows={16}
            className="w-full px-4 py-3 bg-slate-50 rounded-2xl font-mono text-xs outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>
      )}

      {key !== "about" && key !== "how_it_works" && (
        <details className="text-xs text-slate-400">
          <summary className="cursor-pointer font-bold">Advanced JSON</summary>
          <textarea value={jsonText} onChange={(e) => setJsonText(e.target.value)} rows={8}
            className="w-full mt-2 px-4 py-3 bg-slate-50 rounded-2xl font-mono text-xs" />
        </details>
      )}

      <button type="button" onClick={save} className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black text-sm">Save {labels[key]}</button>
    </div>
  );
}

export const CMS_TAB_META = {
  gallery: { label: "Gallery", icon: ImageIcon },
  projects: { label: "Projects", icon: Briefcase },
  careers: { label: "Careers", icon: FileText },
  contact: { label: "Contact Inbox", icon: Mail },
  announcements: { label: "Announcements", icon: Bell },
  site: { label: "Site Content", icon: Megaphone },
};
