export default function StatCard({ label, value, note, icon: Icon }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/30"><div className="flex items-start justify-between gap-3"><p className="text-sm font-medium text-slate-500">{label}</p>{Icon && <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600"><Icon size={19}/></div>}</div><p className="mt-4 text-3xl font-bold tracking-tight text-slate-950">{value ?? "—"}</p>{note && <p className="mt-1 text-xs text-slate-500">{note}</p>}</div>;
}
