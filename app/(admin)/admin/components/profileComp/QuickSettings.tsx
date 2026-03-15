import { Bell, Lock } from "lucide-react";

export default function QuickSettings({ profileData, onChange }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
      <h3 className="font-semibold">Quick Settings</h3>

      <label className="flex justify-between items-center">
        <span className="flex gap-2"><Bell size={18}/> Notifications</span>
        <input
          type="checkbox"
          checked={profileData.notifications}
          onChange={(e) => onChange("notifications", e.target.checked)}
        />
      </label>

      <label className="flex justify-between items-center">
        <span className="flex gap-2"><Lock size={18}/> Two Factor</span>
        <input
          type="checkbox"
          checked={profileData.twoFactor}
          onChange={(e) => onChange("twoFactor", e.target.checked)}
        />
      </label>
    </div>
  );
}
