import { useState } from "react";
import { Bell, Moon, Shield, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-hot-toast";

export const SettingsPage = () => {
  const { authUser } = useAuthStore();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      marketing: false,
    },
    privacy: {
      profileVisibility: "public",
      showOnlineStatus: true,
    },
    appearance: {
      theme: "dark",
      fontSize: "medium",
    },
  });

  const handleNotificationChange = (key) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
    toast.success("Settings updated successfully");
  };

  const handlePrivacyChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value,
      },
    }));
    toast.success("Privacy settings updated");
  };

  const handleAppearanceChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [key]: value,
      },
    }));
    toast.success("Appearance settings updated");
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-4xl mx-auto p-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold">Settings</h1>
            <p className="text-zinc-400">
              Manage your account settings and preferences.
            </p>
          </div>

          {/* Account Settings */}
          <div className="bg-base-300 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5" />
              <h2 className="text-lg font-medium">Account Settings</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-zinc-400">Email</label>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border mt-1">
                  {authUser?.email}
                </p>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Full Name</label>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border mt-1">
                  {authUser?.fullName}
                </p>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-base-300 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5" />
              <h2 className="text-lg font-medium">Notification Preferences</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="capitalize">{key} Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={value}
                      onChange={() => handleNotificationChange(key)}
                    />
                    <div className="w-11 h-6 bg-base-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-base-300 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5" />
              <h2 className="text-lg font-medium">Privacy Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Profile Visibility</span>
                <select
                  className="select select-bordered w-32"
                  value={settings.privacy.profileVisibility}
                  onChange={(e) =>
                    handlePrivacyChange("profileVisibility", e.target.value)
                  }
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="friends">Friends</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span>Show Online Status</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.privacy.showOnlineStatus}
                    onChange={() =>
                      handlePrivacyChange(
                        "showOnlineStatus",
                        !settings.privacy.showOnlineStatus
                      )
                    }
                  />
                  <div className="w-11 h-6 bg-base-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-base-300 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Moon className="w-5 h-5" />
              <h2 className="text-lg font-medium">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Theme</span>
                <select
                  className="select select-bordered w-32"
                  value={settings.appearance.theme}
                  onChange={(e) =>
                    handleAppearanceChange("theme", e.target.value)
                  }
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span>Font Size</span>
                <select
                  className="select select-bordered w-32"
                  value={settings.appearance.fontSize}
                  onChange={(e) =>
                    handleAppearanceChange("fontSize", e.target.value)
                  }
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
