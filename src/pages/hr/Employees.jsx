import { useEffect, useMemo, useState } from "react";
import { Search, RefreshCw, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import staffAPI from "../../services/staffAPI";
import PageHeader from "../../components/PageHeader";
import StateMessage from "../../components/StateMessage";

export default function Employees() {
  const [employees,setEmployees]=useState([]); const [loading,setLoading]=useState(true); const [error,setError]=useState(""); const [search,setSearch]=useState("");
  const load=()=>{setLoading(true);setError("");staffAPI.get("/hr/employees").then(r=>setEmployees(r.data.employees||[])).catch(e=>setError(e.response?.data?.message||"Could not load employees.")).finally(()=>setLoading(false));};
  useEffect(()=>{load();},[]);
  const filtered=useMemo(()=>employees.filter(e=>`${e.name} ${e.email} ${e.status}`.toLowerCase().includes(search.toLowerCase())),[employees,search]);
  return <><PageHeader title="Employees" subtitle="Browse employee accounts and review their details." action={<button onClick={load} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"><RefreshCw size={16}/> Refresh</button>}/>
    <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"><div className="relative flex-1"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, email, or status…" className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"/></div><p className="text-sm text-slate-500">{filtered.length} employee{filtered.length===1?"":"s"}</p></div>
    <StateMessage loading={loading} error={error} empty={employees.length===0?"No employee accounts were found. Admin can create employee accounts from the Admin application.":null}>
      {filtered.length===0?<div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">No employees match “{search}”.</div>:<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4">Employee</th><th className="px-5 py-4">Email</th><th className="px-5 py-4">Status</th><th className="px-5 py-4 text-right">Details</th></tr></thead><tbody className="divide-y divide-slate-100">{filtered.map(e=><tr key={e._id} className="hover:bg-slate-50/70"><td className="px-5 py-4"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-50 font-semibold text-indigo-700">{(e.name||"E").slice(0,1).toUpperCase()}</div><div className="font-semibold text-slate-900">{e.name}</div></div></td><td className="px-5 py-4 text-slate-500">{e.email}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${e.status==="active"?"bg-emerald-50 text-emerald-700":"bg-slate-100 text-slate-600"}`}>{e.status||"unknown"}</span></td><td className="px-5 py-4 text-right"><Link to={`/hr/employees/${e._id}`} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 font-medium hover:bg-slate-50"><Eye size={15}/> View</Link></td></tr>)}</tbody></table></div></div>}
    </StateMessage>
  </>;
}
