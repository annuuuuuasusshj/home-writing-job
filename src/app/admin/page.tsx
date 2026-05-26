"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { SiteConfig, PlanConfig, TestimonialConfig, ToastConfig } from "@/lib/config";
import { DEFAULT_CONFIG } from "@/lib/config";

type Tab = "general" | "plans" | "testimonials" | "payment" | "toasts";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const didLoad = useRef(false);

  useEffect(() => {
    if (didLoad.current) return;
    didLoad.current = true;
    fetch("/api/config.php")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data) setConfig(data); })
      .catch(() => {});
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/config.php", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        setIsLoggedIn(true);
        setLoginError("");
      } else {
        setLoginError("Wrong password");
      }
    } catch {
      setLoginError("Connection error");
    }
  };

  const saveConfig = async (extra?: Record<string, string>) => {
    setSaving(true);
    setSaveMsg("");
    try {
      const body = { ...config, ...extra };
      const res = await fetch("/api/config.php", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setSaveMsg("Saved!");
        setTimeout(() => setSaveMsg(""), 2000);
      } else {
        setSaveMsg("Error saving");
      }
    } catch {
      setSaveMsg("Connection error");
    }
    setSaving(false);
  };

  const updatePlan = (index: number, field: keyof PlanConfig, value: string | number | boolean) => {
    setConfig((prev) => {
      const plans = [...prev.plans];
      plans[index] = { ...plans[index], [field]: value };
      return { ...prev, plans };
    });
  };

  const updateTestimonial = (index: number, field: keyof TestimonialConfig, value: string | number) => {
    setConfig((prev) => {
      const testimonials = [...prev.testimonials];
      testimonials[index] = { ...testimonials[index], [field]: value };
      if (field === "name") {
        testimonials[index].initial = (value as string).charAt(0).toUpperCase();
      }
      return { ...prev, testimonials };
    });
  };

  const updateToast = (index: number, field: keyof ToastConfig, value: string) => {
    setConfig((prev) => {
      const toastMessages = [...prev.toastMessages];
      toastMessages[index] = { ...toastMessages[index], [field]: value };
      return { ...prev, toastMessages };
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
        <div className="w-full max-w-sm rounded-2xl bg-gray-800 p-8 shadow-xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500 text-2xl font-bold text-gray-900">
              {config.logoInitial}
            </div>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <p className="mt-1 text-sm text-gray-400">Enter password to continue</p>
          </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="mb-3 w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-sm text-white outline-none focus:border-amber-500"
          />
          {loginError && <p className="mb-3 text-sm text-red-400">{loginError}</p>}
          <button
            onClick={handleLogin}
            className="w-full rounded-lg bg-amber-500 py-3 font-semibold text-gray-900 transition-colors hover:bg-amber-400"
          >
            Login
          </button>
          <p className="mt-4 text-center text-xs text-gray-500">Default: admin123</p>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "general", label: "General", icon: "🏢" },
    { id: "plans", label: "Plans", icon: "📋" },
    { id: "testimonials", label: "Reviews", icon: "⭐" },
    { id: "payment", label: "Payment", icon: "💳" },
    { id: "toasts", label: "Notifications", icon: "🔔" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-30 flex h-full w-56 flex-col border-r border-gray-700 bg-gray-800">
        <div className="flex items-center gap-3 border-b border-gray-700 px-4 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-sm font-bold text-gray-900">
            {config.logoInitial}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Admin Panel</p>
            <p className="text-[10px] text-gray-400">Site Management</p>
          </div>
        </div>
        <nav className="flex-1 px-2 py-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                activeTab === tab.id
                  ? "bg-amber-500/10 font-medium text-amber-400"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-gray-700 p-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
            ← Back to Website
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-56 flex-1 px-8 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">{tabs.find((t) => t.id === activeTab)?.label} Settings</h1>
          <div className="flex items-center gap-3">
            {saveMsg && (
              <span className={`text-sm font-medium ${saveMsg === "Saved!" ? "text-green-400" : "text-red-400"}`}>
                {saveMsg}
              </span>
            )}
            <button
              onClick={() => saveConfig(newPassword ? { adminPassword: newPassword } : undefined)}
              disabled={saving}
              className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-amber-400 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="max-w-4xl space-y-6">
          {activeTab === "general" && (
            <>
              <Card title="Company Information">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Company Name" value={config.companyName} onChange={(v) => setConfig({ ...config, companyName: v })} />
                  <Field label="Short Name (Navbar)" value={config.companyShortName} onChange={(v) => setConfig({ ...config, companyShortName: v })} />
                  <Field label="Logo Letter" value={config.logoInitial} onChange={(v) => setConfig({ ...config, logoInitial: v })} />
                  <Field label="Established Year" value={config.estYear} onChange={(v) => setConfig({ ...config, estYear: v })} />
                </div>
              </Card>
              <Card title="Hero Section">
                <Field label="Tagline" value={config.tagline} onChange={(v) => setConfig({ ...config, tagline: v })} />
                <Field label="Subtitle" value={config.heroSubtitle} onChange={(v) => setConfig({ ...config, heroSubtitle: v })} textarea />
              </Card>
              <Card title="Links & Contact">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Telegram Link" value={config.telegramLink} onChange={(v) => setConfig({ ...config, telegramLink: v })} placeholder="https://t.me/channel" />
                  <Field label="WhatsApp Number" value={config.whatsappNumber} onChange={(v) => setConfig({ ...config, whatsappNumber: v })} placeholder="+91XXXXXXXXXX" />
                  <Field label="Support Phone" value={config.supportPhone} onChange={(v) => setConfig({ ...config, supportPhone: v })} placeholder="+91XXXXXXXXXX" />
                </div>
              </Card>
              <Card title="Change Admin Password">
                <Field label="New Password" value={newPassword} onChange={setNewPassword} placeholder="Leave empty to keep current" />
              </Card>
            </>
          )}

          {activeTab === "plans" && (
            <>
              {config.plans.map((plan, i) => (
                <Card key={i} title={`Plan ${i + 1}: ${plan.tier}`}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Tier Name" value={plan.tier} onChange={(v) => updatePlan(i, "tier", v)} />
                    <Field label="Project Name" value={plan.name} onChange={(v) => updatePlan(i, "name", v)} />
                    <Field label="Total Reward (₹)" value={plan.reward} onChange={(v) => updatePlan(i, "reward", v)} />
                    <Field label="Registration Fee (₹)" value={plan.fee} onChange={(v) => updatePlan(i, "fee", v)} />
                    <Field label="Advance Payout (₹)" value={plan.advance} onChange={(v) => updatePlan(i, "advance", v)} />
                    <Field label="Pages" value={String(plan.pages)} onChange={(v) => updatePlan(i, "pages", Number(v))} />
                    <Field label="Duration" value={plan.duration || ""} onChange={(v) => updatePlan(i, "duration", v)} placeholder="e.g. 10 Days" />
                  </div>
                  <label className="mt-3 flex items-center gap-2 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={!!plan.popular}
                      onChange={(e) => updatePlan(i, "popular", e.target.checked)}
                      className="rounded accent-amber-500"
                    />
                    Mark as MOST POPULAR
                  </label>
                </Card>
              ))}
            </>
          )}

          {activeTab === "testimonials" && (
            <>
              {config.testimonials.map((t, i) => (
                <Card key={i} title={`Review ${i + 1}: ${t.name}`}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name" value={t.name} onChange={(v) => updateTestimonial(i, "name", v)} />
                    <Field label="City" value={t.city} onChange={(v) => updateTestimonial(i, "city", v)} />
                    <Field label="Stars (1-5)" value={String(t.stars)} onChange={(v) => updateTestimonial(i, "stars", Number(v))} />
                  </div>
                  <Field label="Review Text" value={t.text} onChange={(v) => updateTestimonial(i, "text", v)} textarea />
                </Card>
              ))}
            </>
          )}

          {activeTab === "payment" && (
            <Card title="Payment Settings">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="UPI ID" value={config.upiId} onChange={(v) => setConfig({ ...config, upiId: v })} placeholder="yourname@upi" />
                <Field label="QR Code Image URL" value={config.qrImageUrl} onChange={(v) => setConfig({ ...config, qrImageUrl: v })} placeholder="https://... or leave empty for default QR" />
              </div>
              {config.qrImageUrl && (
                <div className="mt-4">
                  <p className="mb-2 text-xs text-gray-400">QR Preview:</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={config.qrImageUrl} alt="QR Preview" className="h-40 w-40 rounded-lg border border-gray-600 object-contain" />
                </div>
              )}
            </Card>
          )}

          {activeTab === "toasts" && (
            <>
              <p className="text-sm text-gray-400">These notifications appear on the bottom-left of the website, rotating every 6 seconds.</p>
              {config.toastMessages.map((t, i) => (
                <Card key={i} title={`Notification ${i + 1}`}>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field label="Icon" value={t.icon} onChange={(v) => updateToast(i, "icon", v)} placeholder="✏️ or 🟢" />
                    <Field label="Name" value={t.name} onChange={(v) => updateToast(i, "name", v)} />
                    <Field label="Message" value={t.message} onChange={(v) => updateToast(i, "message", v)} />
                  </div>
                </Card>
              ))}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
      <h3 className="mb-4 text-sm font-semibold tracking-wide text-gray-300">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
}) {
  const cls =
    "w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white outline-none focus:border-amber-500 placeholder:text-gray-500";
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-400">{label}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} rows={3} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </div>
  );
}
