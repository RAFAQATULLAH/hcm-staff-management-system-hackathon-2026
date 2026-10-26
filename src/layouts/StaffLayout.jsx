import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, CalendarCheck, CalendarDays, ClipboardList,
  UserRound, FileBarChart, Settings, LogOut, Bell, Menu, X, BriefcaseBusiness
} from "lucide-react";
import { useState } from "react";

const linkBase = "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition";
const active = "bg-indigo-600 text-white shadow-sm";
const inactive = "text-slate-600 hover:bg-slate-100 hover:text-slate-950";

export default function StaffLayout() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  let user = {};
  try { user = JSON.parse(localStorage.getItem("staffUser") || "{}"); } catch {}
  const isHR = user.role === "hr";
  const navItems = isHR
    ? [
        ["/hr/dashboard", "Dashboard", LayoutDashboard],
        ["/hr/employees", "Employees", Users],
        ["/hr/attendance", "Attendance", CalendarCheck],
        ["/hr/leaves", "Leave Management", CalendarDays],
        ["/hr/reports", "Reports", FileBarChart],
        ["/notifications", "Notifications", Bell],
        ["/profile", "My Profile", UserRound],
        ["/settings", "Settings", Settings],
      ]
    : [
        ["/employee/dashboard", "Dashboard", LayoutDashboard],
        ["/employee/attendance", "My Attendance", CalendarCheck],
        ["/employee/leaves", "My Leaves", CalendarDays],
        ["/notifications", "Notifications", Bell],
        ["/profile", "My Profile", UserRound],
        ["/change-password", "Change Password", Settings],
      ];

  const logout = () => {
    localStorage.removeItem("staffToken");
    localStorage.removeItem("staffUser");
    navigate("/login", { replace: true });
  };

  const sidebar = (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white"><BriefcaseBusiness size={21} /></div>
        <div><p className="font-bold tracking-tight text-slate-900">HCM Lite</p><p className="text-xs text-slate-500">{isHR ? "HR Workspace" : "Employee Workspace"}</p></div>
        <button className="ml-auto rounded-lg p-2 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={18}/></button>
      </div>
      <div className="px-4 py-5">
        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[.16em] text-slate-400">Workspace</p>
        <nav className="space-y-1">
          {navItems.map(([to, label, Icon]) => (
            <NavLink key={to} to={to} onClick={() => setMobileOpen(false)} className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
              <Icon size={18} strokeWidth={1.8}/><span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t border-slate-100 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">{(user.name || "U").slice(0,1).toUpperCase()}</div>
          <div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-800">{user.name || "Staff member"}</p><p className="truncate text-xs capitalize text-slate-500">{user.role || "staff"}</p></div>
        </div>
        <button onClick={logout} className={`${linkBase} w-full text-rose-600 hover:bg-rose-50`}><LogOut size={18}/> Sign out</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 lg:block">{sidebar}</aside>
      {mobileOpen && <div className="fixed inset-0 z-40 lg:hidden"><button className="absolute inset-0 bg-slate-950/40" onClick={() => setMobileOpen(false)} aria-label="Close navigation"/><aside className="relative h-full w-72 shadow-xl">{sidebar}</aside></div>}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-7">
          <div className="flex items-center gap-3"><button className="rounded-lg p-2 hover:bg-slate-100 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={20}/></button><div><p className="text-sm font-semibold text-slate-900">{isHR ? "Human Resources" : "Employee Portal"}</p><p className="text-xs text-slate-500">People operations at a glance</p></div></div>
          <button onClick={() => navigate("/notifications")} className="relative rounded-xl border border-slate-200 p-2.5 hover:bg-slate-50" aria-label="Notifications"><Bell size={18}/></button>
        </header>
        <main className="mx-auto w-full max-w-[1500px] p-4 sm:p-7 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
