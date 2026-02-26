import { useState } from "react";
import {
  Bell,
  Settings,
  Search,
  Calendar,
  XCircle,
  Clock,
  CheckCircle2,
  Layers,
  Tag,
  TrendingUp,
  Lightbulb,
  Plus,
  LayoutDashboard,
  CalendarDays,
  Wrench,
  FileBarChart2,
} from "lucide-react";
import Avatar from "@/componentPages/avatar";

// ── Mini SVG Chart ────────────────────────────────────────────────────────────
function MiniChart() {
  const points = [18, 28, 22, 38, 32, 50, 44, 60, 54, 72, 65, 80, 74, 95];
  const w = 560;
  const h = 200;
  const maxV = Math.max(...points);
  const xs = points.map((_, i) => (i / (points.length - 1)) * w);
  const ys = points.map((v) => h - (v / maxV) * (h - 20) - 10);

  const linePath = xs
    .map((x, i) => {
      if (i === 0) return `M ${x} ${ys[i]}`;
      const px = xs[i - 1], py = ys[i - 1];
      const cx1 = px + (x - px) / 3, cy1 = py;
      const cx2 = x - (x - px) / 3, cy2 = ys[i];
      return `C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x} ${ys[i]}`;
    })
    .join(" ");

  const areaPath =
    linePath + ` L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#areaGrad)" />
      <path d={linePath} fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={xs[xs.length - 1]} cy={ys[ys.length - 1]} r="5" fill="#22c55e" stroke="white" strokeWidth="2" />
    </svg>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, iconBg, label, value, change, changeUp }) {
  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon size={20} />
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${
            changeUp ? "text-emerald-600 bg-emerald-50" : "text-red-500 bg-red-50"
          }`}
        >
          {changeUp ? "↑" : "↓"} {change}
        </span>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-800 tracking-tight">{value}</p>
      </div>
    </div>
  );
}

// ── Status Badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const styles = {
    CONFIRMED: "bg-emerald-100 text-emerald-700",
    "IN PROGRESS": "bg-blue-100 text-blue-700",
    CANCELLED: "bg-red-100 text-red-500",
    PENDING: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wide ${styles[status] ?? "bg-gray-100 text-gray-500"}`}>
      {status}
    </span>
  );
}

// ── Schedule Row ──────────────────────────────────────────────────────────────
function ScheduleRow({ name, service, time, status }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
      <Avatar name={name} size="md" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{name}</p>
        <p className="text-xs text-gray-400 truncate">{service}</p>
      </div>
      <div className="text-right shrink-0 flex flex-col items-end gap-1">
        <p className="text-xs font-semibold text-gray-600">{time}</p>
        <StatusBadge status={status} />
      </div>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const schedule = [
  { name: "Alice Thompson",  service: "Full Hair Color",      time: "09:00 AM", status: "CONFIRMED"   },
  { name: "Michael Chen",    service: "Deep Tissue Massage",  time: "10:30 AM", status: "IN PROGRESS" },
  { name: "Sarah Williams",  service: "Gel Manicure",         time: "11:15 AM", status: "CONFIRMED"   },
  { name: "Robert Miller",   service: "Standard Haircut",     time: "12:00 PM", status: "CANCELLED"   },
  { name: "Emma Davis",      service: "Facial Treatment",     time: "01:45 PM", status: "CONFIRMED"   },
  { name: "James Wilson",    service: "Pedicure",             time: "02:30 PM", status: "CONFIRMED"   },
  { name: "Olivia Brown",    service: "Luxury Spa Pack",      time: "03:15 PM", status: "CONFIRMED"   },
  { name: "David Garcia",    service: "Beard Trim",           time: "04:00 PM", status: "CONFIRMED"   },
];

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: CalendarDays,    label: "Appointments" },
  { icon: Wrench,          label: "Services" },
  { icon: FileBarChart2,   label: "Reports" },
];

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [activeNav, setActiveNav]   = useState("Dashboard");
  const [chartView, setChartView]   = useState("Week");

  return (
    <div className="min-h-screen w-full bg-[#f3f4f6] flex flex-col">

      {/* ══ Navbar ══════════════════════════════════════════════════════════ */}
      <header className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
              <LayoutDashboard size={18} className="text-white" />
            </div>
            <span className="font-bold text-gray-800 text-base hidden sm:block">ServiceAnalytics</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-sm ml-2">
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-200 focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-100 transition-all">
              <Search size={15} className="text-gray-400 shrink-0" />
              <input
                className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
                placeholder="Search data..."
              />
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 ml-2">
            {navItems.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => setActiveNav(label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeNav === label
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 ml-auto shrink-0">
            <button className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors">
              <Bell size={18} className="text-gray-500" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-1 ring-white" />
            </button>
            <button className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors hidden sm:flex">
              <Settings size={18} className="text-gray-500" />
            </button>
            <div className="flex items-center gap-2 pl-1">
              <Avatar name="John Doe" size="sm" status="online" />
            </div>
          </div>
        </div>
      </header>

      {/* ══ Main Content ════════════════════════════════════════════════════ */}
      <main className="flex-1 w-full">
        <div className="max-w-[1400px] mx-auto sm:px-6 lg:px-8 py-6 space-y-5">

          {/* Stat Cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard icon={Calendar}     iconBg="bg-emerald-50 text-emerald-600" label="Total Appointments" value="1,284" change="12.5%" changeUp />
            <StatCard icon={XCircle}      iconBg="bg-orange-50 text-orange-500"   label="Total Cancelled"    value="42"    change="2.1%"  changeUp={false} />
            <StatCard icon={Clock}        iconBg="bg-blue-50 text-blue-500"       label="Pending"            value="156"   change="5.4%"  changeUp />
            <StatCard icon={CheckCircle2} iconBg="bg-purple-50 text-purple-500"   label="Done Appointments"  value="1,086" change="14.2%" changeUp />
          </div>

          {/* Services + Categories */}
          <div className="flex flex-wrap gap-4">
            <div className="bg-white rounded-2xl px-6 py-4 flex items-center gap-4 shadow-sm border border-gray-100">
              <Layers size={18} className="text-gray-400" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Services</p>
                <p className="text-2xl font-bold text-gray-800">48</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl px-6 py-4 flex items-center gap-4 shadow-sm border border-gray-100">
              <Tag size={18} className="text-gray-400" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Categories</p>
                <p className="text-2xl font-bold text-gray-800">12</p>
              </div>
            </div>
          </div>

          {/* Chart + Schedule */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-5">

            {/* Chart Panel */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-bold text-gray-800 text-base">Daily Appointments</h2>
                  <p className="text-sm text-gray-400 mt-0.5">Weekly Trend Overview</p>
                </div>
                <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                  {["Week", "Month"].map((v) => (
                    <button
                      key={v}
                      onClick={() => setChartView(v)}
                      className={`text-sm px-4 py-1.5 rounded-lg font-medium transition-all ${
                        chartView === v
                          ? "bg-white text-gray-800 shadow-sm"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-48 w-full mb-3">
                <MiniChart />
              </div>

              <div className="flex justify-between px-1 mb-6">
                {days.map((d) => (
                  <span key={d} className="text-xs text-gray-400 font-medium">{d}</span>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={15} className="text-emerald-500" />
                    <span className="text-sm font-bold text-gray-700">Peak Performance</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Your highest appointment density occurs on{" "}
                    <span className="font-semibold text-gray-700">Fridays between 2:00 PM and 5:00 PM.</span>{" "}
                    Consider allocating extra staff during this window.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb size={15} className="text-emerald-500" />
                    <span className="text-sm font-bold text-gray-700">Growth Tip</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Customer retention is up{" "}
                    <span className="font-semibold text-emerald-600">15%</span> this month. Sending
                    automated follow-up emails after appointments is yielding positive results.
                  </p>
                </div>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800 text-base">Today's Schedule</h2>
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                  10 PENDING
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-0 max-h-[420px] pr-1">
                {schedule.map((s) => (
                  <ScheduleRow key={s.name} {...s} />
                ))}
              </div>

              <button className="mt-5 w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm">
                <Plus size={16} />
                Add New Appointment
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ══ Mobile Bottom Nav ═══════════════════════════════════════════════ */}
      <nav className="lg:hidden bg-white border-t border-gray-100 shadow-md flex items-center justify-around py-2 px-4 sticky bottom-0 z-50">
        {navItems.map(({ icon: Icon, label }) => (
          <button
            key={label}
            onClick={() => setActiveNav(label)}
            className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition-colors ${
              activeNav === label ? "text-emerald-600" : "text-gray-400"
            }`}
          >
            <Icon size={20} />
            <span className="text-[10px] font-semibold">{label}</span>
          </button>
        ))}
      </nav>

      {/* ══ Footer ══════════════════════════════════════════════════════════ */}
      <footer className="bg-white border-t border-gray-100 w-full">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle2 size={10} className="text-white" />
            </div>
            <span className="text-xs text-gray-400">© 2024 ServiceAnalytics Platform. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Help Center"].map((l) => (
              <a key={l} href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}