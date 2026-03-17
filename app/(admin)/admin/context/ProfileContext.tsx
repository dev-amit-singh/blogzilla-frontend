"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

// TypeScript types
export interface Profile {
  _id?: string; 
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  bio?: string;
  role?: string;
  avatar?: string;
  
}

interface ProfileContextType {
  data: Profile | null;
  loading: boolean;
  error: string | null; 
  updateProfile: (updatedData: Profile) => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
  deleteAvatar: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACK_URL}/api/admin`, 
  withCredentials: true,
});

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch Profile
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/profile");
      setData(res.data);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch profile", err);
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Update Profile (Text Data)
  const updateProfile = async (updatedData: Profile) => {
    try {
      setData((prev) => (prev ? { ...prev, ...updatedData } : null));

      const res = await api.put("/profile", updatedData);
      
      if (res.data?.avatar) {
    setData(prev => prev ? {...prev, avatar: res.data.avatar} : prev);
  } 
    } catch (err: any) {
      console.error("Update failed", err);
      setError("Failed to update profile");
      await fetchProfile(); 
    }
  };

  // 3. Upload Avatar
  const uploadAvatar = async (file: File) => {
  try {
    const fd = new FormData();
    fd.append("avatar", file);

    await api.post("/avatar", fd);

    

    // 🔥 refresh from DB
    await fetchProfile();

  } catch (err: any) {
    console.error("Upload failed", err);
    alert(err.response?.data?.message || "Upload failed");
  }
};


  // 4. Delete Avatar
 const deleteAvatar = async () => {
  await api.delete("/avatar");
  await fetchProfile();
};

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <ProfileContext.Provider 
      value={{ 
        data, 
        loading, 
        error, 
        updateProfile, 
        uploadAvatar, 
        deleteAvatar, 
        refreshProfile: fetchProfile 
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};