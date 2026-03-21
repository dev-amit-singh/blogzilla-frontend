"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const api = axios.create({
  baseURL: '/api/admin',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login on 401
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);
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
  isAuthenticated: boolean;
  updateProfile: (updatedData: Profile) => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
  deleteAvatar: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  setIsAuthenticated: (val: boolean) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/profile");
      setData(res.data);
      setIsAuthenticated(true); // ✅ Set authenticated
      setError(null);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setData(null);
        setIsAuthenticated(false); // ✅ Not authenticated
        console.log("Not authenticated");
      } else {
        setError("Server connection failed");
        setIsAuthenticated(false);
      }
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
        setData(prev => prev ? { ...prev, avatar: res.data.avatar } : prev);
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
        isAuthenticated, // ✅ Add this
        updateProfile,
        uploadAvatar,
        deleteAvatar,
        refreshProfile: fetchProfile,
        setIsAuthenticated,
        
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