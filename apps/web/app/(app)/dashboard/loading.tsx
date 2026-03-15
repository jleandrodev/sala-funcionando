export default function DashboardLoading() {
  return (
    <div className="p-6 sm:p-12 animate-pulse">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4">
          <div className="h-10 bg-slate-200 rounded-xl w-48"></div>
          <div className="h-6 bg-slate-100 rounded-lg w-64"></div>
        </header>

        <section className="bg-white p-8 rounded-3xl border border-slate-100 space-y-8">
          <div className="h-20 bg-slate-50 rounded-2xl w-full"></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-slate-100 rounded-3xl"></div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
