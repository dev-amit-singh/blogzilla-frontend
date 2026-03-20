"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Camera, Save, Edit2, Trash2 } from "lucide-react";

const api = axios.create({
  baseURL: '/api/admin', // अब ये rewrite होकर backend पर जाएगा
  withCredentials: true,
});
export default function AdminProfile() {
  const [data, setData] = useState<any>({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ load profile
  const loadProfile = async () => {
    axios.defaults.withCredentials = true;
    try {
      const res = await api.get("/profile");
      setData(res.data);
    } catch (e) {
      console.error("load failed", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProfile(); }, []);

  // ✅ save profile
  const saveProfile = async () => {
    await api.put("/profile", data);
    setEditing(false);
    loadProfile();
  };

  // ✅ avatar upload
   const uploadAvatar = async (file: File) => {
    const fd = new FormData();
    fd.append("avatar", file);
    await api.post("/avatar", fd);
    loadProfile();
  };

  // ✅ avatar delete
   const deleteAvatar = async () => {
    await api.delete("/avatar");
    loadProfile();
  };

  const change = (k: string, v: any) =>
    setData((p: any) => ({ ...p, [k]: v }));

  if (loading) return <div className="p-10">Loading profile...</div>;

  const avatarUrl = data.avatar 
    ? `https://blogzilla-050s.onrender.com/${data.avatar}`
    : `https://blogzilla-050s.onrender.com/assets/admin-avatar.jpg`;

  return (
    <div className="max-w-6xl mx-auto p-6">

      <div className="bg-white rounded-2xl shadow border p-8 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Profile</h1>

          <button
            onClick={editing ? saveProfile : () => setEditing(true)}
            className={`px-4 py-2 rounded-lg text-white flex gap-2 items-center
              ${editing ? "bg-green-600" : "bg-blue-600"}`}
          >
            {editing ? <Save size={18} /> : <Edit2 size={18} />}
            {editing ? "Save" : "Edit"}
          </button>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">

          <div className="relative group">
            <div>
              <img
                src={avatarUrl}
                className="w-36 h-36 rounded-full object-cover border-4"
              />
            </div>

            {editing && (
              <label className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition">
                <Camera className="text-white" />
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) uploadAvatar(e.target.files[0]);
                  }}
                />
              </label>
            )}
          </div>

          {editing && (
            <button
              onClick={deleteAvatar}
              className="text-red-600 text-sm flex gap-1 items-center"
            >
              <Trash2 size={16} /> Remove photo
            </button>
          )}
        </div>

        {/* Form */}
        <div className="grid md:grid-cols-2 gap-6">

          <Field label="Name">
            <Input editing={editing} value={data.name}
              onChange={(v: string) => change("name", v)} />
          </Field>

          <Field label="Email">
            <Input editing={editing} value={data.email}
              onChange={(v: string) => change("email", v)} />
          </Field>

          <Field label="Phone">
            <Input editing={editing} value={data.phone}
              onChange={(v: string) => change("phone", v)} />
          </Field>

          <Field label="Location">
            <Input editing={editing} value={data.location}
              onChange={(v: string) => change("location", v)} />
          </Field>

          <Field label="Website">
            <Input editing={editing} value={data.website}
              onChange={(v: string) => change("website", v)} />
          </Field>

          <Field label="Role">
            <div className="bg-gray-100 p-3 rounded-lg text-sm">
              {data.role}
            </div>
          </Field>

        </div>

        {/* Bio */}
        <div>
          <label className="text-sm font-semibold text-gray-500">Bio</label>

          {editing ? (
            <textarea
              value={data.bio || ""}
              onChange={e => change("bio", e.target.value)}
              className="w-full mt-2 border rounded-lg p-3"
              rows={4}
            />
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg mt-2">
              {data.bio}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

/* ---------- small helpers ---------- */

function Field({ label, children }: any) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-500">
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function Input({ editing, value, onChange }: any) {
  if (!editing)
    return <div className="bg-gray-50 p-3 rounded-lg">{value || "—"}</div>;

  return (
    <input
      value={value || ""}
      onChange={e => onChange(e.target.value)}
      className="w-full border rounded-lg p-3"
    />
  );
}
