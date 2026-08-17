import { useState, useEffect, useMemo } from "react";
import API from "../utils/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Building2, Plus, Pencil, Trash2, ChevronUp, ChevronDown,
  Eye, EyeOff, CheckCircle, AlertCircle, X, Image as ImageIcon, Link2,
} from "lucide-react";

const EMPTY_FORM = {
  name: "",
  role: "",
  image: "",
  type: "contributor",
  github: "",
  linkedin: "",
  instagram: "",
  website: "",
  bio: "",
  location: "",
  skills: "",
  order: 0,
  isActive: true,
};

export default function AdminTeam({ filters = {} }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [section, setSection] = useState("contributor");
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const showMsg = (type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg({ type: "", text: "" }), 4000);
  };

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.set("search", filters.search);
      const res = await API.get(`/team?${params.toString()}`);
      setMembers(res.data);
    } catch (err) {
      showMsg("error", err.response?.data?.message || "Failed to load team");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [filters.search]);

  const filtered = useMemo(
    () => members.filter((m) => m.type === section),
    [members, section]
  );

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, type: section, order: filtered.length });
    setShowForm(true);
  };

  const openEdit = (member) => {
    setEditingId(member._id);
    setForm({
      name: member.name,
      role: member.role || "",
      image: member.image,
      type: member.type,
      github: member.github || "",
      linkedin: member.linkedin || "",
      instagram: member.instagram || "",
      website: member.website || "",
      bio: member.bio || "",
      location: member.location || "",
      skills: member.skills || "",
      order: member.order ?? 0,
      isActive: member.isActive !== false,
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.image.trim()) {
      showMsg("error", "Name and image URL are required.");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await API.put(`/team/${editingId}`, form);
        showMsg("success", "Updated successfully!");
      } else {
        await API.post("/team", form);
        showMsg("success", "Added successfully!");
      }
      closeForm();
      fetchMembers();
    } catch (err) {
      showMsg("error", err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove "${name}" from the team page?`)) return;
    try {
      await API.delete(`/team/${id}`);
      showMsg("success", "Removed.");
      fetchMembers();
    } catch (err) {
      showMsg("error", err.response?.data?.message || "Delete failed");
    }
  };

  const toggleActive = async (member) => {
    try {
      await API.put(`/team/${member._id}`, { isActive: !member.isActive });
      fetchMembers();
    } catch (err) {
      showMsg("error", "Could not update visibility");
    }
  };

  const moveOrder = async (member, direction) => {
    const list = [...filtered].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const idx = list.findIndex((m) => m._id === member._id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= list.length) return;

    const other = list[swapIdx];
    const items = [
      { id: member._id, order: other.order ?? swapIdx },
      { id: other._id, order: member.order ?? idx },
    ];
    try {
      await API.put("/team/reorder", { items });
      fetchMembers();
    } catch (err) {
      showMsg("error", "Reorder failed");
    }
  };

  return (
    <div className="space-y-8">
      {msg.text && (
        <div
          className={`flex items-center gap-3 p-5 rounded-2xl border ${
            msg.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          {msg.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold text-sm">{msg.text}</span>
        </div>
      )}

      {/* Section tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => setSection("contributor")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
              section === "contributor"
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Users size={18} /> Contributors
            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
              {members.filter((m) => m.type === "contributor").length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setSection("partner")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
              section === "partner"
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Building2 size={18} /> Partners
            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
              {members.filter((m) => m.type === "partner").length}
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all"
        >
          <Plus size={18} />
          Add {section === "contributor" ? "Contributor" : "Partner"}
        </button>
      </div>

      <p className="text-sm text-slate-500 -mt-4">
        Manage who appears on the public <strong>/team</strong> page. Use Cloudinary image URLs for photos and logos.
        Hidden members stay in the database but won&apos;t show on the site.
      </p>

      {/* Add / Edit form */}
      <AnimatePresence>
        {showForm && (
          <motion.section
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-slate-800">
                {editingId ? "Edit" : "New"} {section === "contributor" ? "Contributor" : "Partner"}
              </h3>
              <button type="button" onClick={closeForm} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field
                label={section === "partner" ? "Tagline (optional)" : "Role *"}
                value={form.role}
                onChange={(v) => setForm({ ...form, role: v })}
                placeholder={section === "partner" ? "Partner" : "e.g. Full Stack Developer"}
              />
              <div className="md:col-span-2">
                <Field
                  label="Image URL * (Cloudinary recommended)"
                  value={form.image}
                  onChange={(v) => setForm({ ...form, image: v })}
                  placeholder="https://res.cloudinary.com/..."
                  icon={<Link2 size={14} />}
                />
                {form.image && (
                  <div className="mt-3 flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <img
                      src={form.image}
                      alt="Preview"
                      className={`object-cover border-2 border-white shadow ${
                        section === "partner" ? "h-16 w-32 object-contain bg-white rounded-lg" : "w-16 h-16 rounded-full"
                      }`}
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                    <span className="text-xs text-slate-500">Live preview</span>
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">About / Bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={4}
                  placeholder="Shown when someone clicks this card on the team page."
                  className="mt-1.5 w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 font-semibold text-sm resize-none"
                />
              </div>
              <Field label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} placeholder="Jaipur, Rajasthan" />
              <Field
                label={section === "contributor" ? "Skills (comma separated)" : "Website URL"}
                value={section === "contributor" ? form.skills : form.website}
                onChange={(v) => setForm(section === "contributor" ? { ...form, skills: v } : { ...form, website: v })}
                placeholder={section === "contributor" ? "React, Node.js, MongoDB" : "https://..."}
              />
              {section === "contributor" && (
                <>
                  <Field label="GitHub URL" value={form.github} onChange={(v) => setForm({ ...form, github: v })} />
                  <Field label="LinkedIn URL" value={form.linkedin} onChange={(v) => setForm({ ...form, linkedin: v })} />
                  <Field label="Instagram URL" value={form.instagram} onChange={(v) => setForm({ ...form, instagram: v })} />
                  <Field label="Website / Portfolio" value={form.website} onChange={(v) => setForm({ ...form, website: v })} />
                </>
              )}

              <Field
                label="Display order"
                type="number"
                value={form.order}
                onChange={(v) => setForm({ ...form, order: Number(v) })}
              />

              <label className="flex items-center gap-3 cursor-pointer md:col-span-2">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm font-bold text-slate-700">Visible on public team page</span>
              </label>

              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-black hover:bg-emerald-700 disabled:opacity-50 transition"
                >
                  {saving ? "Saving..." : editingId ? "Save changes" : "Add to team"}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-8 py-4 rounded-2xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* List */}
      <section className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-400 font-bold">Loading team...</div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <ImageIcon className="mx-auto text-slate-300 mb-4" size={40} />
            <p className="text-slate-500 font-bold">No {section === "contributor" ? "contributors" : "partners"} yet.</p>
            <button type="button" onClick={openCreate} className="mt-4 text-emerald-600 font-bold text-sm hover:underline">
              Add the first one
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {[...filtered]
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map((member, idx) => (
                <li
                  key={member._id}
                  className={`flex flex-wrap items-center gap-4 p-5 hover:bg-slate-50/80 transition ${
                    !member.isActive ? "opacity-60 bg-slate-50/50" : ""
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => moveOrder(member, "up")}
                      disabled={idx === 0}
                      className="p-1 text-slate-400 hover:text-emerald-600 disabled:opacity-30"
                      title="Move up"
                    >
                      <ChevronUp size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveOrder(member, "down")}
                      disabled={idx === filtered.length - 1}
                      className="p-1 text-slate-400 hover:text-emerald-600 disabled:opacity-30"
                      title="Move down"
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>

                  <img
                    src={member.image}
                    alt={member.name}
                    className={`shrink-0 border-2 border-white shadow ${
                      member.type === "partner"
                        ? "h-14 w-24 object-contain bg-slate-50 rounded-lg"
                        : "w-14 h-14 rounded-full object-cover"
                    }`}
                  />

                  <div className="flex-1 min-w-[180px]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-slate-900">{member.name}</h4>
                      {!member.isActive && (
                        <span className="text-[10px] font-black uppercase bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                          Hidden
                        </span>
                      )}
                    </div>
                    {member.role && <p className="text-sm text-slate-500">{member.role}</p>}
                    <p className="text-[10px] text-slate-400 mt-1 truncate max-w-md">{member.image}</p>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      type="button"
                      onClick={() => toggleActive(member)}
                      className="p-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                      title={member.isActive ? "Hide from site" : "Show on site"}
                    >
                      {member.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => openEdit(member)}
                      className="p-3 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(member._id, member.name)}
                      className="p-3 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </section>

      <a
        href="/team"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700"
      >
        Preview public team page →
      </a>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder = "", icon }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
        {icon} {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 font-semibold text-sm"
      />
    </div>
  );
}
