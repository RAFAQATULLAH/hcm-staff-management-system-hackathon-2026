import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, CalendarDays, UserRound, ArrowUpRight, Clock3 } from "lucide-react";
import staffAPI from "../../services/staffAPI";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import StateMessage from "../../components/StateMessage";

export default function EmployeeDashboard() {
  const [data, setData] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { staffAPI.get("/employee/dashboard").then(r=>setData(r.data)).catch(e=>setError(e.response?.data?.message || "Could not load dashboard. Check the backend routes.")).finally(()=>setLoading(false)); }, []);
  const shortcuts = [["/employee/attendance","My attendance","Check your attendance history",CalendarCheck],["/employee/leaves","Leave requests","Apply for leave and track requests",CalendarDays],["/profile","My profile","Review your personal details",UserRound]];
  return <><PageHeader title={`Hello${data?.user?.name ? `, ${data.user.name}` : ""} 👋`} subtitle="Here is your personal workspace for today."/>
    <StateMessage loading={loading} error={error}><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"><StatCard label="Today's attendance" value={data?.todayStatus || "Not marked"} note="Based on your attendance record" icon={CalendarCheck}/><StatCard label="Pending leave requests" value={data?.pendingLeaves ?? "—"} note="Requests waiting for review" icon={Clock3}/><StatCard label="Approved leaves" value={data?.approvedLeaves ?? "—"} note="Your approved requests" icon={CalendarDays}/></div></StateMessage>
    <section className="mt-8"><h2 className="mb-4 text-lg font-bold text-slate-900">What would you like to do?</h2><div className="grid gap-4 md:grid-cols-3">{shortcuts.map(([to,title,desc,Icon])=><Link key={to} to={to} className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-indigo-200 hover:shadow-md"><div className="flex items-center justify-between"><div className="rounded-xl bg-indigo-50 p-3 text-indigo-600"><Icon size={20}/></div><ArrowUpRight size={18} className="text-slate-300 group-hover:text-indigo-600"/></div><h3 className="mt-4 font-semibold">{title}</h3><p className="mt-1 text-sm text-slate-500">{desc}</p></Link>)}</div></section>
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5"><h2 className="font-semibold text-slate-900">Your workspace</h2><p className="mt-1 text-sm leading-6 text-slate-500">Your attendance and leave information is private to your account. Contact HR if a record needs correction.</p></div>
  </>;
}
