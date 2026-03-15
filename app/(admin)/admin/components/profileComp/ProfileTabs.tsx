import { User, Shield, Activity } from "lucide-react";

export default function ProfileTabs({
    activeTab,
    setActiveTab,
    profileData,
    isEditing,
    onChange
}: any) {

    const fields = [
        { label: "Name", key: "name", editable: true },
        { label: "Email", key: "email", editable: true },
        { label: "Phone", key: "phone", editable: true },
        { label: "Location", key: "location", editable: true },
        { label: "Website", key: "website", editable: true },
        { label: "Role", key: "role", editable: false },
    ];

    return (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Tabs */}
            <div className="flex justify-around items-center gap-2 bg-gray-50 px-4 py-2">
                {[
                    { key: "profile", label: "Profile", icon: User },
                    { key: "security", label: "Security", icon: Shield },
                    { key: "activity", label: "Activity", icon: Activity },
                ].map(({ key, label, icon: Icon }) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition
                        ${activeTab === key ? "bg-white text-black shadow-sm" : "text-gray-500 hover:bg-white hover:text-black"}`}>
                        <Icon size={16} />
                        {label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="min-h-[300px]">
                {/* Profile */}
                {activeTab === "profile" && (
                    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                        {fields.map((f) => (
                            <div
                                key={f.key}
                                className="group rounded-xl border border-gray-200 bg-white p-4 transition hover:border-gray-300"
                            >
                                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    {f.label}
                                </label>

                                {isEditing && f.editable ? (
                                    <input
                                        value={profileData[f.key]}
                                        onChange={(e) => onChange(f.key, e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
                                    />
                                ) : (
                                    <div className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-800">
                                        {profileData[f.key] || "—"}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Security */}
                {activeTab === "security" && (
                    <div className="flex h-full items-center justify-center p-10 text-sm text-gray-500">
                        🔒 Security settings coming soon
                    </div>
                )}

                {/* Activity */}
                {activeTab === "activity" && (
                    <div className="flex h-full items-center justify-center p-10 text-sm text-gray-500">
                        📊 Activity log coming soon
                    </div>
                )}
            </div>
        </div>

    );
}
