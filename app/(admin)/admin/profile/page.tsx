"use client";

import { useState } from "react";
import { Camera, Edit2, ImageUp, Trash2, X } from "lucide-react";
import { Profile, useProfile } from "../context/ProfileContext";

export default function AdminProfile() {
  const { data, loading, updateProfile, uploadAvatar, deleteAvatar } = useProfile();

  const [editing, setEditing] = useState(false);
  const [tempData, setTempData] = useState<Profile>({});

  // 1. Initialize Edit Mode
  const startEditing = () => {
    if (data) {
      setTempData({ ...data });
      setEditing(true);
    }
  };

  // 2. Cancel Edit Mode
  const cancelEditing = () => {
    setEditing(false);
    setTempData({});
  };

  // 3. Save Changes
  const handleSave = async () => {
    await updateProfile(tempData);
    setEditing(false);
  };

  // 4. Handle Input Change
  const handleChange = (field: keyof Profile, value: string) => {
    setTempData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) return <div className="p-10 text-center font-bold text-gray-500">Loading profile...</div>;

  const avatarUrl = data?.avatar
    ? `${process.env.NEXT_PUBLIC_BACK_URL}/${data.avatar}?t=${new Date().getTime()}`
    : "http://localhost:5000/assets/";



  // Decide which data to show
  const displayData = editing ? tempData : (data || {});

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">

        {/* --- Header --- */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
            <p className="text-sm text-gray-500">Manage your personal information</p>
          </div>

          <div className="flex gap-3">
            {editing && (
              <button
                onClick={cancelEditing}
                className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 flex gap-2 items-center transition"
              >
                <ImageUp />Save Image
              </button>
            )}
            <button
              onClick={editing ? handleSave : startEditing}
              className={`px-4 py-2 rounded-lg text-white flex gap-2 items-center transition shadow-sm
              ${editing ? "bg-gray-400 hover:bg-gray-500" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {editing ? <Edit2 size={18} /> : ""}
              {editing ? "Save Details" : "Edit Details"}
            </button>
          </div>
        </div>

        {/* --- Avatar Section --- */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group w-36 h-36">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="rounded-full object-cover border-4 border-gray-100 shadow-sm w-full h-full"
            />

            {/* Overlay only visible in Edit Mode */}
            {editing && (
              <label className="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition duration-200">
                <Camera className="text-white mb-1" size={24} />
                <span className="text-white text-xs font-medium">Change</span>
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) uploadAvatar(e.target.files[0]);
                  }}
                />
              </label>
            )}
          </div>

          {editing && data?.avatar && (
            <button
              onClick={deleteAvatar}
              className="text-red-500 text-sm flex gap-1 items-center hover:text-red-700 transition"
            >
              <Trash2 size={16} /> Remove photo
            </button>
          )}
        </div>

        {/* --- Form Fields --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GridField label="Full Name">
            <Input
              editing={editing}
              value={displayData.name}
              onChange={(v) => handleChange("name", v)}
              placeholder="John Doe"
            />
          </GridField>

          <GridField label="Email Address">
            <Input
              editing={editing}
              value={displayData.email}
              onChange={(v) => handleChange("email", v)}
              placeholder="name@example.com"
              disabled={true}
            />
          </GridField>

          <GridField label="Phone Number">
            <Input
              editing={editing}
              value={displayData.phone}
              onChange={(v) => handleChange("phone", v)}
              placeholder="+1 234 567 890"
            />
          </GridField>

          <GridField label="Location">
            <Input
              editing={editing}
              value={displayData.location}
              onChange={(v) => handleChange("location", v)}
              placeholder="New York, USA"
            />
          </GridField>
        </div>

        {/* --- Bio Section --- */}
        <div className="pt-6 border-t border-gray-100">
          <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Bio</label>
          {editing ? (
            <textarea
              value={displayData.bio || ""}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              rows={4}
              placeholder="Tell us a little about yourself..."
            />
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg mt-2 text-gray-700 leading-relaxed min-h-[80px]">
              {data?.bio || "No bio added yet."}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// --- Helper Components ---

function GridField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}

interface InputProps {
  editing: boolean;
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

function Input({ editing, value, onChange, placeholder, disabled }: InputProps) {
  if (!editing) {
    return (
      <div className="text-gray-900 font-medium py-2.5 px-3 border border-transparent">
        {value || "—"}
      </div>
    );
  }

  return (
    <input
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
      disabled={disabled}
    />
  );
}