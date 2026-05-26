export interface PlanConfig {
  tier: string;
  name: string;
  reward: string;
  fee: string;
  advance: string;
  pages: number;
  duration?: string;
  popular?: boolean;
}

export interface TestimonialConfig {
  name: string;
  city: string;
  initial: string;
  stars: number;
  text: string;
}

export interface ToastConfig {
  icon: string;
  name: string;
  message: string;
}

export interface SiteConfig {
  companyName: string;
  companyShortName: string;
  logoInitial: string;
  estYear: string;
  tagline: string;
  heroSubtitle: string;
  telegramLink: string;
  whatsappNumber: string;
  supportPhone: string;
  upiId: string;
  qrImageUrl: string;
  plans: PlanConfig[];
  testimonials: TestimonialConfig[];
  toastMessages: ToastConfig[];
}

export const DEFAULT_CONFIG: SiteConfig = {
  companyName: "Vishv Book Publishers",
  companyShortName: "Vishv Publishers",
  logoInitial: "V",
  estYear: "2026",
  tagline: "Turn Your Handwriting Into Wealth.",
  heroSubtitle:
    "The most trusted handwriting ecosystem in India. Guaranteed payouts, 50% advance on dispatch, and premium kits at your door.",
  telegramLink: "https://t.me/vishvbooks",
  whatsappNumber: "",
  supportPhone: "",
  upiId: "",
  qrImageUrl: "",
  plans: [
    { tier: "Starter", name: "Project 1", reward: "32,500", fee: "650", advance: "16,250", pages: 50, duration: "10 Days" },
    { tier: "Professional", name: "Project 2", reward: "46,000", fee: "850", advance: "23,000", pages: 100, duration: "20 Days", popular: true },
    { tier: "Premium", name: "Project 3", reward: "54,500", fee: "1,050", advance: "27,250", pages: 180, duration: "30 Days" },
  ],
  testimonials: [
    { name: "Suresh Yadav", city: "Lucknow", initial: "S", stars: 5, text: "Kit mila 2 din mein. Paper quality bahut acchi hai aur ₹11,000 advance bhi turant mil gaya. Bahut impressed hoon." },
    { name: "Kavita Mehta", city: "Jaipur", initial: "K", stars: 5, text: "Pehle thoda doubt tha, but process transparent hai aur instructions bilkul clear hain. Income ka badiya zariya hai." },
    { name: "Manoj Kumar", city: "Patna", initial: "M", stars: 5, text: "Premium stationery kit ka packaging bahut sundar hai. Ye kaam se zyada ek creative project lagta hai." },
    { name: "Geeta Devi", city: "Indore", initial: "G", stars: 5, text: "Ghar baithe sabse accha kaam ka option. Payment time pe aaya aur support team hamesha responsive hai." },
    { name: "Harish Reddy", city: "Hyderabad", initial: "H", stars: 5, text: "Project 02 complete kiya. Final balance 24 ghante mein credit ho gaya. Highly professional company hai." },
    { name: "Pooja Verma", city: "Bhopal", initial: "P", stars: 5, text: "Simple process hai aur rewards bhi bahut acche hain. Agar handwriting acchi hai to ye best opportunity hai." },
  ],
  toastMessages: [
    { icon: "✏️", name: "Meena T.", message: "started writing today" },
    { icon: "🟢", name: "Suresh B.", message: "received ₹11,000 advance" },
    { icon: "✏️", name: "Kavita R.", message: "completed Project 02" },
    { icon: "🟢", name: "Harish P.", message: "got paid ₹30,000" },
    { icon: "✏️", name: "Pooja M.", message: "started writing today" },
    { icon: "🟢", name: "Rajesh K.", message: "withdrew ₹22,500" },
    { icon: "✏️", name: "Sunita D.", message: "completed Project 01" },
    { icon: "🟢", name: "Manoj S.", message: "received ₹15,000 advance" },
  ],
};
