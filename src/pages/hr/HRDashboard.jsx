import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, UserCheck, UserX, CalendarClock, ArrowUpRight, CalendarCheck, FileBarChart } from "lucide-react";
import staffAPI from "../../services/staffAPI";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import StateMessage from "../../components/StateMessage";

export default function HRDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    staffAPI.get("/hr/dashboard").then(r => setData(r.data)).catch(e => setError(e.response?.data?.message || "Could not load HR dashboard. Check that the backend routes are mounted.")).finally(() => setLoading(false));
  }, []);
  const shortcuts = [
    ["/hr/employees", "Employee directory", "View employee records", Users],
    ["/hr/attendance", "Attendance", "Review or mark attendance", CalendarCheck],
    ["/hr/leaves", "Leave requests", "Review employee requests", CalendarClock],
    ["/hr/reports", "Reports", "View workforce summary", FileBarChart],
  ];
  return <><PageHeader title="HR Dashboard" subtitle={`Welcome back${data?.user?.name ? `, ${data.user.name}` : ""}. Here's your workforce overview.`}/>
    <StateMessage loading={loading} error={error}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total employees" value={data?.stats?.totalEmployees ?? "—"} note="Active employee accounts" icon={Users}/>
        <StatCard label="Present today" value={data?.stats?.presentToday ?? "—"} note="Attendance records for today" icon={UserCheck}/>
        <StatCard label="Absent today" value={data?.stats?.absentToday ?? "—"} note="Marked absent today" icon={UserX}/>
        <StatCard label="Pending leave requests" value={data?.stats?.pendingLeaves ?? "—"} note="Awaiting HR decision" icon={CalendarClock}/>
      </div>
    </StateMessage>
    <section className="mt-8"><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold text-slate-900">Quick actions</h2><span className="text-xs text-slate-400">HR tools</span></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{shortcuts.map(([to,title,desc,Icon])=><Link key={to} to={to} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"><div className="flex items-center justify-between"><div className="rounded-xl bg-indigo-50 p-3 text-indigo-600"><Icon size={20}/></div><ArrowUpRight className="text-slate-300 transition group-hover:text-indigo-600" size={18}/></div><h3 className="mt-4 font-semibold text-slate-900">{title}</h3><p className="mt-1 text-sm text-slate-500">{desc}</p></Link>)}</div></section>
    <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5 sm:p-6"><h2 className="font-semibold text-indigo-950">Keep your people data up to date</h2><p className="mt-1 max-w-2xl text-sm leading-6 text-indigo-900/70">Use the employee directory to review staff records, manage attendance, and process leave requests. Statistics above are fetched from your backend.</p></div>
  </>;
}
