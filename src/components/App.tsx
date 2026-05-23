"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

type View = "home" | "projects" | "dispatch" | "payment" | "howItWorks" | "support";

interface ToastData {
  id: number;
  icon: string;
  name: string;
  message: string;
}

const TOAST_MESSAGES: Omit<ToastData, "id">[] = [
  { icon: "✏️", name: "Priya D.", message: "started writing today" },
  { icon: "🟢", name: "Amit J.", message: "received ₹11,000 advance" },
  { icon: "✏️", name: "Deepak R.", message: "completed Project 02" },
  { icon: "🟢", name: "Neha L.", message: "got paid ₹30,000" },
  { icon: "✏️", name: "Rahul S.", message: "started writing today" },
  { icon: "🟢", name: "Sneha V.", message: "withdrew ₹22,500" },
  { icon: "✏️", name: "Vikram K.", message: "completed Project 01" },
  { icon: "🟢", name: "Anjali M.", message: "received ₹15,000 advance" },
];

const TESTIMONIALS = [
  { name: "Rahul Sharma", city: "Mumbai", initial: "R", stars: 5, text: "Received my kit in 2 days. The paper quality is excellent and I already received my ₹11,000 advance. Genuinely impressive." },
  { name: "Anjali Gupta", city: "Delhi", initial: "A", stars: 4, text: "I was hesitant at first, but the process is transparent and the instructions are very clear. A great income source." },
  { name: "Sneha V.", city: "Bangalore", initial: "S", stars: 5, text: "The premium stationery kit they send is beautifully packaged. It feels more like a creative project than work." },
  { name: "Priya Nair", city: "Kochi", initial: "P", stars: 5, text: "Best work-from-home option in Kerala. Payment arrived on time and the support team is always responsive." },
  { name: "Vikram Singh", city: "Chandigarh", initial: "V", stars: 5, text: "Just finished Project 02. The final balance was credited within 24 hours of submission. Highly professional." },
  { name: "Amit Patel", city: "Ahmedabad", initial: "A", stars: 5, text: "Straightforward process with excellent rewards. If you have good handwriting, this is the opportunity you've been waiting for." },
];

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [showStepModal, setShowStepModal] = useState<1 | 2 | null>(null);
  const [showUtrModal, setShowUtrModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [formData, setFormData] = useState({
    name: "", mobile: "", address: "", city: "", state: "", pincode: "", utr: "",
  });

  const plans = [
    { tier: "Explorer", name: "Project 01", reward: "22,000", fee: "550", advance: "11,000", pages: 50 },
    { tier: "Growth", name: "Project 02", reward: "30,000", fee: "850", advance: "15,000", pages: 80, popular: true },
    { tier: "Elite", name: "Project 03", reward: "45,000", fee: "1,250", advance: "22,500", pages: 120 },
  ];

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      const msg = TOAST_MESSAGES[idx % TOAST_MESSAGES.length];
      setToast({ ...msg, id: Date.now() });
      idx++;
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useCallback((view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenu(false);
  }, []);

  const selectPlan = useCallback((planIndex: number) => {
    setSelectedPlan(planIndex);
    setShowStepModal(1);
  }, []);

  const handleFormChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  return (
    <div className="min-h-screen bg-primary-900">
      {/* Toast Notification */}
      {toast && (
        <div key={toast.id} className="animate-toast fixed bottom-6 left-4 z-50 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg">
          <span className="text-lg">{toast.icon}</span>
          <div>
            <p className="text-sm font-semibold text-gray-900">{toast.name}</p>
            <p className="text-xs text-gray-500">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-primary-900/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <button onClick={() => navigate("home")} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500 text-sm font-bold text-primary-900">H</div>
            <div>
              <div className="text-sm font-bold text-white">HomeWrite Publishers</div>
              <div className="text-[10px] tracking-widest text-accent-400">Est. 2026</div>
            </div>
          </button>
          <div className="hidden items-center gap-6 md:flex">
            <button onClick={() => navigate("home")} className="text-sm text-gray-300 hover:text-white transition-colors">Home</button>
            <button onClick={() => navigate("projects")} className="text-sm text-gray-300 hover:text-white transition-colors">Project Plans</button>
            <button onClick={() => setShowHowItWorks(true)} className="text-sm text-accent-400 font-medium">
              📋 How It Works
            </button>
            <button onClick={() => navigate("support")} className="text-sm text-gray-300 hover:text-white transition-colors">Support</button>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <button className="text-sm text-gray-300">🌐 EN</button>
            <button onClick={() => navigate("projects")} className="rounded-full border border-accent-500 px-4 py-1.5 text-sm font-medium text-accent-400 transition-colors hover:bg-accent-500 hover:text-primary-900">
              View Projects →
            </button>
          </div>
          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {mobileMenu && (
          <div className="border-t border-white/10 bg-primary-900 px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              <button onClick={() => navigate("home")} className="text-sm text-gray-300">Home</button>
              <button onClick={() => navigate("projects")} className="text-sm text-gray-300">Project Plans</button>
              <button onClick={() => { setShowHowItWorks(true); setMobileMenu(false); }} className="text-sm text-accent-400">How It Works</button>
              <button onClick={() => navigate("support")} className="text-sm text-gray-300">Support</button>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">
        {currentView === "home" && <HomeView navigate={navigate} />}
        {currentView === "projects" && <ProjectsView plans={plans} selectPlan={selectPlan} />}
        {currentView === "dispatch" && (
          <DispatchView
            formData={formData}
            onChange={handleFormChange}
            onShowStep={() => setShowStepModal(1)}
            onShowTerms={() => setShowTermsModal(true)}
            onSubmit={() => {
              setShowStepModal(2);
            }}
          />
        )}
        {currentView === "payment" && (
          <PaymentView
            plan={selectedPlan !== null ? plans[selectedPlan] : null}
            formData={formData}
            onChange={handleFormChange}
            onShowStep={() => setShowStepModal(2)}
            onShowUtr={() => setShowUtrModal(true)}
          />
        )}
        {currentView === "support" && <SupportView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-primary-800 py-10">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500 text-xs font-bold text-primary-900">H</div>
            <span className="font-semibold text-white">HomeWrite Publishers</span>
          </div>
          <div className="mb-4 flex flex-wrap items-center justify-center gap-6 text-xs tracking-widest text-gray-400">
            <button className="hover:text-white transition-colors">PRIVACY</button>
            <button onClick={() => setShowTermsModal(true)} className="hover:text-white transition-colors">TERMS</button>
            <button className="hover:text-white transition-colors">AGREEMENT</button>
            <button onClick={() => navigate("support")} className="hover:text-white transition-colors">HELP</button>
          </div>
          <p className="text-xs text-gray-500">© 2026 HomeWrite Publishers. All rights reserved.</p>
        </div>
      </footer>

      {/* Telegram Button */}
      <a href="https://t.me/homewritejobs" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#0088cc] text-white shadow-lg transition-transform hover:scale-110">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.97-1.73 6.62-2.87 7.97-3.43 3.79-1.58 4.58-1.86 5.09-1.87.11 0 .37.03.54.17.14.12.18.28.2.45-.01.06.01.24 0 .38z" />
        </svg>
      </a>

      {/* Step 1 Modal */}
      {showStepModal === 1 && (
        <Modal onClose={() => setShowStepModal(null)}>
          <div className="text-center">
            <span className="text-4xl">🚚</span>
            <h3 className="mt-3 text-xl font-bold text-gray-900">Step 1: Dispatch Details</h3>
            <p className="mt-3 text-sm text-gray-600">
              Please provide your complete and accurate legal name, mobile number, and delivery address. We use this to courier your Premium Kit (80GSM paper, gel pens, and instruction manual) directly to your home.
            </p>
            <div className="mt-4 rounded-lg bg-gray-50 p-3">
              <p className="flex items-center gap-2 text-xs text-gray-500">
                <span>🔒</span>
                Your details are encrypted and used exclusively for kit delivery and verification.
              </p>
            </div>
            <button
              onClick={() => { setShowStepModal(null); navigate("dispatch"); }}
              className="mt-5 w-full rounded-xl bg-accent-500 py-3 font-semibold text-primary-900 transition-colors hover:bg-accent-400"
            >
              I Understand →
            </button>
          </div>
        </Modal>
      )}

      {/* Step 2 Modal */}
      {showStepModal === 2 && (
        <Modal onClose={() => setShowStepModal(null)}>
          <div className="text-center">
            <span className="text-4xl">🔐</span>
            <h3 className="mt-3 text-xl font-bold text-gray-900">Step 2: Secure Payment</h3>
            <p className="mt-3 text-sm text-gray-600">
              A fully refundable registration fee activates your project and triggers kit dispatch.
            </p>
            <ul className="mt-4 space-y-2 text-left text-sm text-gray-600">
              <li className="flex items-start gap-2"><span className="text-accent-500">①</span> Scan the QR and pay the exact required amount.</li>
              <li className="flex items-start gap-2"><span className="text-accent-500">②</span> Find the 12-digit UTR / Ref No. in your payment app.</li>
              <li className="flex items-start gap-2"><span className="text-accent-500">③</span> Enter the UTR to receive your 50% advance instantly.</li>
            </ul>
            <button
              onClick={() => { setShowStepModal(null); navigate("payment"); }}
              className="mt-5 w-full rounded-xl bg-accent-500 py-3 font-semibold text-primary-900 transition-colors hover:bg-accent-400"
            >
              Got It →
            </button>
          </div>
        </Modal>
      )}

      {/* UTR Finder Modal */}
      {showUtrModal && (
        <Modal onClose={() => setShowUtrModal(false)}>
          <h3 className="text-lg font-bold text-gray-900">Finding Your UTR</h3>
          <p className="mt-2 text-sm text-gray-600">
            The UTR is a 12-digit reference number generated after a successful UPI payment.
          </p>
          <div className="mt-4 space-y-3">
            {[
              { app: "PhonePe", hint: 'Look for "UTR" on the transaction success screen.' },
              { app: "Google Pay", hint: 'Look for "UPI Transaction ID" at the bottom of the receipt.' },
              { app: "Paytm", hint: 'Look for "UPI Ref No" under payment details.' },
            ].map((item) => (
              <div key={item.app} className="rounded-lg bg-gray-50 p-3">
                <p className="text-sm font-semibold text-gray-900">{item.app}</p>
                <p className="text-xs text-gray-500">{item.hint}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setShowUtrModal(false)} className="mt-4 w-full rounded-xl bg-gray-200 py-2.5 font-medium text-gray-700 hover:bg-gray-300 transition-colors">
            Close
          </button>
        </Modal>
      )}

      {/* Terms Modal */}
      {showTermsModal && (
        <Modal onClose={() => setShowTermsModal(false)}>
          <h3 className="text-lg font-bold text-gray-900">Terms & Conditions</h3>
          <div className="mt-3 space-y-3 text-sm text-gray-600">
            <p><strong>1. Work Agreement:</strong> By registering, you agree to complete the handwriting project using the kit provided, adhering to quality guidelines.</p>
            <p><strong>2. Security Fee:</strong> The registration fee is 100% refundable upon successful submission of your completed project. Delivery and material charges are applicable.</p>
            <p><strong>3. Advance Payouts:</strong> The 50% advance is processed upon successful UTR verification and kit dispatch.</p>
            <p><strong>4. Integrity:</strong> Fraudulent UTR submissions result in immediate IP bans and network suspension.</p>
            <p><strong>5. Deadlines:</strong> Inactivity over 90 days without communication may result in project reallocation.</p>
          </div>
          <button onClick={() => setShowTermsModal(false)} className="mt-4 w-full rounded-xl bg-accent-500 py-2.5 font-semibold text-primary-900 transition-colors hover:bg-accent-400">
            I Accept the Terms
          </button>
        </Modal>
      )}

      {/* How It Works Modal */}
      {showHowItWorks && (
        <Modal onClose={() => setShowHowItWorks(false)}>
          <div className="text-center">
            <p className="text-xs font-semibold tracking-widest text-accent-500">SIMPLE 4-STEP PROCESS</p>
            <h3 className="mt-2 text-xl font-bold text-gray-900">How It Works</h3>
          </div>
          <div className="mt-5 space-y-4">
            {[
              { step: "1", title: "Select a Project Plan", desc: "Choose a tier based on your income goals — Explorer, Growth, or Elite." },
              { step: "2", title: "Provide Dispatch Details", desc: "Enter your name, mobile number, and delivery address accurately." },
              { step: "3", title: "Pay Refundable Fee", desc: "Scan the QR and pay the registration fee — 100% refundable on submission." },
              { step: "4", title: "Submit UTR → Get Advance", desc: "Enter your 12-digit UTR. Your 50% advance is credited instantly on verification!" },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-500 text-sm font-bold text-primary-900">
                  {item.step}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setShowHowItWorks(false); navigate("projects"); }}
            className="mt-5 w-full rounded-xl bg-primary-800 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Understood — Let&apos;s Start!
          </button>
        </Modal>
      )}
    </div>
  );
}

/* ═══════════════════════════ MODAL ═══════════════════════════ */

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="animate-fade-in-up w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════ HOME VIEW ═══════════════════════════ */

function HomeView({ navigate }: { navigate: (v: View) => void }) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-900 px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row">
          <div className="flex-1 animate-slide-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-accent-500 animate-pulse"></span>
              <span className="text-xs font-semibold tracking-widest text-accent-400">1,420+ WRITERS ACTIVE NOW</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Turn Your{" "}
              <span className="font-serif-display text-accent-400">Handwriting</span>
              <br />
              Into Wealth.
            </h1>
            <p className="mt-6 max-w-lg text-gray-400">
              The most trusted handwriting ecosystem in India. Guaranteed payouts, 50% advance on dispatch, and premium kits at your door.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button onClick={() => navigate("projects")} className="rounded-full bg-accent-500 px-6 py-3 font-semibold text-primary-900 transition-all hover:bg-accent-400 hover:shadow-lg">
                View Projects
              </button>
              <button onClick={() => navigate("support")} className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-colors hover:border-white/40">
                💬 Get Support
              </button>
            </div>
            <button onClick={() => navigate("projects")} className="mt-4 flex items-center gap-1 text-sm font-medium text-accent-400 hover:underline">
              ℹ️ Read the Step-by-Step Guide
            </button>
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-400">
              <span>🔒 100% Secure</span>
              <span>🔄 Fee Refundable</span>
              <span>⚡ 50% Instant Advance</span>
            </div>
          </div>
          <div className="relative flex-1 animate-slide-right">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop"
                alt="Handwriting"
                className="h-[350px] w-full object-cover sm:h-[400px]"
                width={600}
                height={400}
                priority
              />
            </div>
            <div className="animate-pulse-glow absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-xl bg-white px-5 py-3 shadow-lg sm:left-auto sm:right-8 sm:translate-x-0">
              <div className="flex items-center gap-2">
                <span className="text-accent-500">✓</span>
                <div>
                  <p className="text-[10px] font-semibold tracking-widest text-gray-400">PAYOUT SENT</p>
                  <p className="text-lg font-bold text-gray-900">₹22,500</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-primary-800 py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 text-center sm:grid-cols-4">
          {[
            { value: "150K+", label: "Global Writers" },
            { value: "₹80Cr+", label: "Paid Out" },
            { value: "99.8%", label: "Satisfaction" },
            { value: "24/7", label: "Live Support" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-serif-display text-3xl font-bold text-white sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs tracking-widest text-gray-400">{stat.label.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:flex-row">
            <div className="flex-1">
              <p className="text-xs font-semibold tracking-widest text-accent-500">WHY THOUSANDS CHOOSE HOMEWRITE</p>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Professionalism<br />
                <span className="font-serif-display text-accent-500">in Every Page.</span>
              </h2>
              <div className="mt-10 space-y-8">
                {[
                  { icon: "📦", title: "Premium Stationery Kit", desc: "80GSM bond paper, signature gel pens, and a detailed instruction manual — everything you need to write with confidence." },
                  { icon: "🔒", title: "100% Secure Earnings", desc: "50% advance credited the moment your kit is dispatched. No holding periods, no hidden conditions." },
                  { icon: "⏰", title: "Zero Deadline Pressure", desc: "Work when it suits you. We care about quality, not how fast your pen moves." },
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-500/10 text-xl">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                {[
                  { label: "Project Integrity", value: "Verified", accent: true },
                  { label: "Kit Delivery", value: "2–4 Business Days" },
                  { label: "Payment Mode", value: "UPI / IMPS / Bank" },
                  { label: "Language Support", value: "EN / HI / Regional" },
                ].map((item, i) => (
                  <div key={item.label} className={`flex items-center justify-between py-3 ${i < 3 ? "border-b border-gray-100" : ""}`}>
                    <span className="text-sm text-gray-600">{item.label}</span>
                    {item.accent ? (
                      <span className="flex items-center gap-1 text-sm font-semibold text-accent-500">✓ VERIFIED</span>
                    ) : (
                      <span className="text-sm font-medium text-gray-900">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-accent-500 p-6">
                <p className="text-xs font-semibold tracking-widest text-primary-900/60">PUBLISHER&apos;S NOTE</p>
                <p className="mt-2 font-serif-display text-lg text-primary-900">
                  &ldquo;Our mission is to digitize hand-written literature while building sustainable livelihoods for talented writers.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs font-semibold tracking-widest text-gray-400">SUCCESS STORIES</p>
          <h3 className="font-serif-display mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Voices of Our Community</h3>
          <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-accent-500"></div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-800 text-sm font-bold text-white">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs tracking-widest text-gray-400">{t.city.toUpperCase()}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} className="text-sm text-yellow-400">★</span>
                  ))}
                  {Array.from({ length: 5 - t.stars }).map((_, i) => (
                    <span key={i} className="text-sm text-gray-300">★</span>
                  ))}
                </div>
                <p className="mt-3 font-serif-display text-sm text-gray-600">&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("projects")} className="mt-10 rounded-full bg-primary-800 px-8 py-3 font-semibold text-white transition-colors hover:bg-primary-700">
            Join 150k+ Successful Writers →
          </button>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════ PROJECTS VIEW ═══════════════════════════ */

function ProjectsView({ plans, selectPlan }: { plans: { tier: string; name: string; reward: string; fee: string; advance: string; pages: number; popular?: boolean }[]; selectPlan: (i: number) => void }) {
  return (
    <section className="min-h-screen bg-primary-900 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs font-semibold tracking-widest text-accent-400">CHOOSE YOUR TIER</p>
        <h2 className="font-serif-display mt-3 text-3xl font-bold text-white sm:text-4xl">Writing Projects</h2>
        <p className="mt-4 text-gray-400">Select a plan that matches your income goals. All registration fees are 100% refundable.</p>
        <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-accent-500"></div>
      </div>
      <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl p-6 transition-transform hover:scale-105 ${
              plan.popular
                ? "bg-primary-700 shadow-xl shadow-accent-500/10"
                : "bg-white/5 border border-white/10"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-500 px-4 py-1 text-xs font-bold text-primary-900">
                MOST POPULAR
              </div>
            )}
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${plan.popular ? "bg-accent-500/20 text-accent-400" : "bg-white/10 text-gray-300"}`}>
              {plan.tier.toUpperCase()}
            </span>
            <h3 className="font-serif-display mt-3 text-xl font-bold text-white">{plan.name}</h3>
            <p className="mt-2 text-3xl font-extrabold text-white">₹{plan.reward}</p>
            <p className="text-xs tracking-widest text-gray-400">GUARANTEED REWARD</p>
            <div className="mt-6 space-y-3 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-accent-500">✓</span>
                <span className="text-gray-300">Fee: <strong className="text-white">₹{plan.fee}</strong></span>
                <span className="rounded bg-accent-500/20 px-1.5 py-0.5 text-[10px] font-bold text-accent-400">REFUNDABLE</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-accent-500">✓</span>
                <span className="text-gray-300">Advance: <strong className="text-white">₹{plan.advance}</strong> Instant</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">⊙</span>
                <span className="text-gray-400">Work: {plan.pages} Pages</span>
              </div>
            </div>
            <button
              onClick={() => selectPlan(index)}
              className={`mt-6 w-full rounded-xl py-3 font-semibold transition-all ${
                plan.popular
                  ? "bg-accent-500 text-primary-900 hover:bg-accent-400"
                  : index === 2
                  ? "bg-primary-700 text-white hover:bg-primary-600"
                  : "border border-white/20 text-white hover:bg-white/10"
              }`}
            >
              {index === 0 ? "Select Plan" : index === 1 ? "Pick This Plan →" : "Go Premium →"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════ DISPATCH VIEW ═══════════════════════════ */

function DispatchView({
  formData,
  onChange,
  onShowStep,
  onShowTerms,
  onSubmit,
}: {
  formData: { name: string; mobile: string; address: string; city: string; state: string; pincode: string };
  onChange: (field: string, value: string) => void;
  onShowStep: () => void;
  onShowTerms: () => void;
  onSubmit: () => void;
}) {
  return (
    <section className="flex min-h-screen items-start justify-center bg-gray-50 px-4 py-20 sm:px-6">
      <div className="w-full max-w-2xl">
        <div className="mx-auto mb-2 h-1 w-16 rounded-full bg-accent-500"></div>
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="text-center">
            <span className="text-3xl">🚚</span>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">Dispatch Details</h2>
            <p className="mt-1 text-sm text-gray-500">Where should we deliver your premium handwriting kit?</p>
            <button onClick={onShowStep} className="mt-2 text-sm font-medium text-accent-500 hover:underline">
              ℹ️ View Step 1 Instructions
            </button>
          </div>
          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold tracking-widest text-gray-400">FULL LEGAL NAME</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold tracking-widest text-gray-400">MOBILE NUMBER</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.mobile}
                  onChange={(e) => onChange("mobile", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold tracking-widest text-gray-400">DETAILED ADDRESS</label>
              <textarea
                placeholder="House/Flat No., Street, Area..."
                value={formData.address}
                onChange={(e) => onChange("address", e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                rows={3}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <input type="text" placeholder="City" value={formData.city} onChange={(e) => onChange("city", e.target.value)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500" required />
              <input type="text" placeholder="State" value={formData.state} onChange={(e) => onChange("state", e.target.value)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500" required />
              <input type="text" placeholder="Pincode" value={formData.pincode} onChange={(e) => onChange("pincode", e.target.value)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500" required />
            </div>
            <p className="text-center text-xs text-gray-400">
              By continuing you agree to our{" "}
              <button type="button" onClick={onShowTerms} className="font-medium text-accent-500 underline">Terms & Conditions</button>.
              Registration charges are applicable.
            </p>
            <button type="submit" className="w-full rounded-xl bg-primary-800 py-3 font-semibold text-white transition-colors hover:bg-primary-700">
              Save & Continue to Payment →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════ PAYMENT VIEW ═══════════════════════════ */

function PaymentView({
  plan,
  formData,
  onChange,
  onShowStep,
  onShowUtr,
}: {
  plan: { tier: string; name: string; reward: string; fee: string; advance: string } | null;
  formData: { utr: string };
  onChange: (field: string, value: string) => void;
  onShowStep: () => void;
  onShowUtr: () => void;
}) {
  return (
    <section className="flex min-h-screen items-start justify-center bg-gray-50 px-4 py-20 sm:px-6">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Registration & Payment</h2>
              <p className="text-xs text-gray-400">Device locked to your application</p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-accent-500/10 px-3 py-1">
              <span className="text-accent-500">🔒</span>
              <span className="text-xs font-semibold text-accent-500">Secured</span>
            </div>
          </div>
          <button onClick={onShowStep} className="mt-3 text-sm font-medium text-accent-500 hover:underline">
            ℹ️ View Step 2 Instructions
          </button>

          {/* Earning Summary */}
          <div className="mt-6 rounded-xl bg-gray-50 p-4">
            <p className="text-xs font-semibold tracking-widest text-gray-400">EARNING SUMMARY</p>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Selected Project</span>
                <span className="font-medium text-gray-900">{plan ? plan.name : "--"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Advance Payout (50%)</span>
                <span className="font-medium text-gray-900">{plan ? `₹${plan.advance}` : "--"}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 text-sm">
                <span className="text-gray-500">Registration Fee</span>
                <span className="font-semibold text-gray-900">{plan ? `₹${plan.fee}` : "--"} <span className="text-[10px] text-gray-400">* applicable</span></span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-400">
            Kit dispatched within 4 hours of payment. Advance credited automatically on delivery confirmation.
          </p>

          {/* QR Section */}
          <div className="mt-6 rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-xs font-semibold tracking-widest text-gray-400">SCAN & PAY</p>
            <div className="mx-auto mt-3 flex h-48 w-48 items-center justify-center rounded-xl bg-gray-100">
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className={`h-6 w-6 rounded-sm ${[0,1,2,4,5,6,10,12,14,18,20,21,22,24].includes(i) ? "bg-gray-800" : "bg-white"}`} />
                ))}
              </div>
            </div>
            <button className="mt-3 text-sm font-medium text-accent-500 hover:underline">
              Tap to Copy UPI ID
            </button>
          </div>

          {/* UTR Input */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold tracking-widest text-gray-400">PAYMENT REFERENCE (UTR)</label>
              <button onClick={onShowUtr} className="text-xs font-medium text-accent-500 hover:underline">Where to find UTR?</button>
            </div>
            <input
              type="text"
              placeholder="Enter 12-digit UTR number"
              value={formData.utr}
              onChange={(e) => onChange("utr", e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
              maxLength={12}
            />
          </div>

          {/* Submit */}
          <a
            href="https://t.me/homewritejobs"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0088cc] py-3 font-semibold text-white transition-colors hover:bg-[#006699]"
          >
            Complete Verification via Telegram
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.97-1.73 6.62-2.87 7.97-3.43 3.79-1.58 4.58-1.86 5.09-1.87.11 0 .37.03.54.17.14.12.18.28.2.45-.01.06.01.24 0 .38z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════ SUPPORT VIEW ═══════════════════════════ */

function SupportView() {
  return (
    <section className="min-h-screen bg-gray-50 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-widest text-accent-500">WE&apos;RE HERE 24/7</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">Help Center</h2>
          <p className="mt-2 text-gray-500">Get instant help from our verified support team — available around the clock.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Live Chat */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 text-2xl">💬</div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Live Chat Support</h3>
            <p className="mt-2 text-sm text-gray-500">Instant response for all registration and technical queries.</p>
            <a href="https://t.me/homewritejobs" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-primary-900 transition-colors hover:bg-accent-400">
              Chat Now
            </a>
          </div>
          {/* Official Channel */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0088cc]/10 text-2xl">
              <svg className="h-6 w-6 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.97-1.73 6.62-2.87 7.97-3.43 3.79-1.58 4.58-1.86 5.09-1.87.11 0 .37.03.54.17.14.12.18.28.2.45-.01.06.01.24 0 .38z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Official Channel</h3>
            <p className="mt-2 text-sm text-gray-500">Join our community of 5,000+ writers for updates and announcements.</p>
            <a href="https://t.me/homewritejobs" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-lg bg-[#0088cc] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#006699]">
              Join Channel
            </a>
          </div>
          {/* Callback */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-800/10 text-2xl">📞</div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Request Callback</h3>
            <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your Name" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-accent-500" />
              <input type="tel" placeholder="Mobile Number" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-accent-500" />
              <button type="submit" className="w-full rounded-lg bg-primary-800 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700">
                Schedule Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
