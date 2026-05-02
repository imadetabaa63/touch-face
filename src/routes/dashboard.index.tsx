import { createFileRoute, Link } from "@tanstack/react-router";
import { ManagerLayout, ManagerHeader } from "@/components/manager-layout";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowUpRight,
  Radio,
  AlertTriangle,
  UserX,
  Clock3,
  CheckCheck,
} from "lucide-react";
import {
  weeklyData,
  departmentStats,
  recentScans,
  employees,
  todayDate,
  avatarUrl,
  departmentColors,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — FaceGate Présence" },
      { name: "description", content: "Vue d'ensemble RH temps réel : présences, absences, anomalies et flux en direct." },
      { property: "og:title", content: "Tableau de bord RH — FaceGate" },
      { property: "og:description", content: "Présences, absences et anomalies en temps réel." },
    ],
  }),
  component: Dashboard,
});

function KpiCard({
  label,
  value,
  sub,
  trend,
  trendDir,
  color,
  progress,
}: {
  label: string;
  value: string | number;
  sub: string;
  trend: string;
  trendDir: "up" | "down" | "flat";
  color: string;
  progress?: number;
}) {
  const TrendIcon = trendDir === "up" ? TrendingUp : trendDir === "down" ? TrendingDown : Minus;
  const trendColor = trendDir === "up" ? "text-success" : trendDir === "down" ? "text-destructive" : "text-muted-foreground";
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-white/15">
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60" style={{ background: color }} />
      <div className="relative">
        <div className="flex items-start justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
          <span className="h-2 w-2 rounded-full" style={{ background: color, boxShadow: `0 0 12px ${color}` }} />
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-4xl font-bold tracking-tight">{value}</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
        {progress !== undefined && (
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: color }} />
          </div>
        )}
        <div className={`mt-3 inline-flex items-center gap-1 text-xs font-medium ${trendColor}`}>
          <TrendIcon className="h-3.5 w-3.5" />
          {trend}
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <ManagerLayout>
      <ManagerHeader greeting="Bonjour, Yasmine 👋" date={todayDate} />

      {/* KPIs */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Présents aujourd'hui" value={127} sub="sur 156 au total" trend="+3 vs hier" trendDir="up" color="oklch(0.68 0.16 160)" progress={81} />
        <KpiCard label="Absents aujourd'hui" value={29} sub="18,6% taux d'absence" trend="-2 vs hier" trendDir="down" color="oklch(0.62 0.24 25)" progress={19} />
        <KpiCard label="Retards" value={8} sub="après 09h00" trend="=0 vs hier" trendDir="flat" color="oklch(0.75 0.17 75)" progress={5} />
        <KpiCard label="Heure moyenne d'arrivée" value="08h43" sub="objectif : 09h00" trend="5min plus tôt" trendDir="up" color="oklch(0.55 0.24 295)" progress={87} />
      </section>

      {/* Charts */}
      <section className="mt-6 grid gap-4 xl:grid-cols-5">
        <div className="rounded-2xl border border-border bg-card p-5 xl:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold">Aperçu de présence hebdomadaire</h2>
              <p className="text-xs text-muted-foreground">Lundi 21 — Vendredi 25 avril 2026</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" /> Présents</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" /> Absents</span>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="gPres" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.68 0.16 160)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.68 0.16 160)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gAbs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.62 0.24 25)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.62 0.24 25)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.05)" />
                <XAxis dataKey="day" stroke="oklch(0.7 0.015 260)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.7 0.015 260)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.18 0.03 265)",
                    border: "1px solid oklch(1 0 0 / 0.1)",
                    borderRadius: "10px",
                    fontSize: "12px",
                  }}
                  labelStyle={{ color: "oklch(0.97 0 0)" }}
                />
                <Area type="monotone" dataKey="presents" stroke="oklch(0.68 0.16 160)" strokeWidth={2.5} fill="url(#gPres)" />
                <Area type="monotone" dataKey="absents" stroke="oklch(0.62 0.24 25)" strokeWidth={2.5} fill="url(#gAbs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 xl:col-span-2">
          <h2 className="font-display text-lg font-semibold">Présence par département</h2>
          <p className="text-xs text-muted-foreground">Taux du jour</p>
          <div className="mt-5 space-y-3.5">
            {departmentStats.map((d) => {
              const color =
                d.rate >= 90 ? "oklch(0.68 0.16 160)" : d.rate >= 70 ? "oklch(0.75 0.17 75)" : "oklch(0.62 0.24 25)";
              return (
                <div key={d.name}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium">{d.name}</span>
                    <span className="font-mono text-muted-foreground">{d.rate}% · {d.count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full transition-all" style={{ width: `${d.rate}%`, background: color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live activity */}
      <section className="mt-6 rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Radio className="h-4 w-4 text-destructive animate-pulse" />
              Flux en direct — 20 derniers scans
            </h2>
            <p className="text-xs text-muted-foreground">Rafraîchissement automatique toutes les 30 secondes</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-destructive">
            <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
            En direct
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-border">
                <th className="px-5 py-3 text-left font-medium">Heure</th>
                <th className="px-5 py-3 text-left font-medium">Collaborateur</th>
                <th className="px-5 py-3 text-left font-medium">Département</th>
                <th className="px-5 py-3 text-left font-medium">Type</th>
                <th className="px-5 py-3 text-left font-medium">Durée</th>
              </tr>
            </thead>
            <tbody>
              {recentScans.map((s, i) => {
                const e = employees[s.employeeIdx];
                return (
                  <tr
                    key={i}
                    className={`border-b border-border/50 transition-colors hover:bg-secondary/60 ${
                      s.isNew ? "bg-primary/5 shadow-[inset_3px_0_0_var(--color-primary)]" : ""
                    } ${i % 2 === 1 ? "bg-secondary/30" : ""}`}
                  >
                    <td className="px-5 py-3 font-mono font-bold">{s.time}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={avatarUrl(e.avatar)} alt="" className="h-8 w-8 rounded-full" width={32} height={32} />
                        <div>
                          <div className="font-medium">{e.firstName} {e.lastName}</div>
                          <div className="text-xs text-muted-foreground">{e.position}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-xs">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: departmentColors[e.department] }} />
                        {e.department}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {s.type === "ENTRÉE" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-xs font-bold text-success">
                          <ArrowUpRight className="h-3 w-3" /> ENTRÉE
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-destructive/15 px-2.5 py-1 text-xs font-bold text-destructive">
                          <ArrowUpRight className="h-3 w-3 rotate-90" /> SORTIE
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{s.duration ?? "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom row */}
      <section className="mt-6 grid gap-4 xl:grid-cols-5">
        <div className="rounded-2xl border border-border bg-card p-5 xl:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <CheckCheck className="h-4 w-4 text-success" />
              Actuellement présents
            </h2>
            <span className="text-xs text-muted-foreground">127 personnes · 8 affichées</span>
          </div>
          <div className="grid gap-2 max-h-[340px] overflow-y-auto scrollbar-thin pr-1">
            {employees.slice(0, 8).map((e, i) => (
              <Link
                key={e.id}
                to="/dashboard/employees"
                className="flex items-center gap-3 rounded-lg border border-transparent p-2.5 transition-all hover:border-border hover:bg-secondary/60"
              >
                <div className="relative">
                  <img src={avatarUrl(e.avatar)} alt="" className="h-10 w-10 rounded-full" width={40} height={40} />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-card" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{e.firstName} {e.lastName}</div>
                  <div className="truncate text-xs text-muted-foreground">{e.position} · {e.department}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs font-semibold">Depuis {["08h32", "08h15", "08h47", "09h02", "08h47", "08h55", "06h30", "08h41"][i]}</div>
                  <div className="text-[10px] text-muted-foreground">aujourd'hui</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 xl:col-span-2">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
            <AlertTriangle className="h-4 w-4 text-warning" />
            Anomalies détectées
          </h2>
          <p className="mb-4 text-xs text-muted-foreground">3 alertes nécessitent votre attention</p>
          <div className="space-y-3">
            <Anomaly
              icon={<UserX className="h-4 w-4" />}
              tone="destructive"
              title="Ahmed B. — Aucune sortie hier"
              detail="Pointage entrée à 08h05, jamais ressorti"
            />
            <Anomaly
              icon={<Clock3 className="h-4 w-4" />}
              tone="warning"
              title="3 employés en retard 3 jours de suite"
              detail="Marketing · Voir le détail"
            />
            <Anomaly
              icon={<AlertTriangle className="h-4 w-4" />}
              tone="info"
              title="Kanza M. — Tentative non reconnue à 07h15"
              detail="Visage inconnu détecté · 1 essai"
            />
          </div>
        </div>
      </section>
    </ManagerLayout>
  );
}

function Anomaly({ icon, tone, title, detail }: { icon: React.ReactNode; tone: "destructive" | "warning" | "info"; title: string; detail: string }) {
  const toneClasses = {
    destructive: "border-destructive/30 bg-destructive/10 text-destructive",
    warning: "border-warning/30 bg-warning/10 text-warning",
    info: "border-info/30 bg-info/10 text-info",
  }[tone];
  return (
    <div className="rounded-xl border border-border bg-secondary/50 p-3">
      <div className="flex items-start gap-3">
        <span className={`grid h-9 w-9 place-items-center rounded-lg border ${toneClasses}`}>{icon}</span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium">{title}</div>
          <div className="text-xs text-muted-foreground">{detail}</div>
        </div>
        <button className="rounded-md border border-border px-2.5 py-1 text-xs transition-colors hover:bg-secondary">Action</button>
      </div>
    </div>
  );
}
