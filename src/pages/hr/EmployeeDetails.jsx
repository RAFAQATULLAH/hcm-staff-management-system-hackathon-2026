import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Mail, ShieldCheck, CalendarDays } from "lucide-react";
import staffAPI from "../../services/staffAPI";
import PageHeader from "../../components/PageHeader";
import StateMessage from "../../components/StateMessage";

export default function EmployeeDetails() {
  const { id }=useParams(); const [employee,setEmployee]=useState(null); const [loading,setLoading]=useState(true); const [error,setError]=useState("");
  useEffect(()=>{staffAPI.get(`/hr/employees/${id}`).then(r=>setEmployee(r.data.employee)).catch(e=>setError(e.response?.data?.message||"Could not load this employee.")).finally(()=>setLoading(false));},[id]);
  return <><PageHeader title="Employee details" subtitle="Review the employee account information." action={<Link to="/hr/employees" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold"><ArrowLeft size={16}/> Back to employees</Link>}/><StateMessage loading={loading} error={error}>{employee&&<div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"><div className="flex items-center gap-4 border-b border-slate-100 pb-6"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-indigo-100 text-xl font-bold text-indigo-700">{employee.name?.slice(0,1).toUpperCase()}</div><div><h2 className="text-xl font-bold">{employee.name}</h2><p className="mt-1 text-sm text-slate-500">Employee account</p><span className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${employee.status==="active"?"bg-emerald-50 text-emerald-700":"bg-slate-100 text-slate-600"}`}>{employee.status}</span></div></div><div className="grid gap-5 pt-6 sm:grid-cols-2"><Info icon={Mail} label="Email" value={employee.email}/><Info icon={ShieldCheck} label="Role" value={employee.role}/><Info icon={CalendarDays} label="Created" value={employee.createdAt?new Date(employee.createdAt).toLocaleDateString():"—"}/><Info icon={CalendarDays} label="Last updated" value={employee.updatedAt?new Date(employee.updatedAt).toLocaleDateString():"—"}/></div></div>}</StateMessage></>;
}
function Info({icon:Icon,label,value}){return <div className="flex gap-3"><div className="rounded-xl bg-slate-100 p-2.5 text-slate-600"><Icon size={18}/></div><div><p className="text-xs text-slate-500">{label}</p><p className="mt-1 break-all text-sm font-semibold text-slate-900">{value||"—"}</p></div></div>}
