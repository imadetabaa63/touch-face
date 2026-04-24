import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ManagerLayout, ManagerHeader } from "@/components/manager-layout";
import { ChevronLeft, ChevronRight, Download, FileText, Eye, X, Calendar } from "lucide-react";
import { attendanceRecords, avatarUrl, departmentColors, type Status } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/attendance")({
  head: () => ({
    meta: [
      { title: "Registre de présence — FaceGate Présence" },
      { name: "description", content: "Tableau quotidien des entrées, sorties et heures travaillées." },
      { property: "og:title", content: "Registre de présence — FaceGate" },
      { property: "og:description", content: "Suivi détaillé des présences par jour, semaine ou mois." },
    ],
  }),
  component: AttendancePage,
});

const statusColors: Record<Status, string> = {
  "PRÉSENT": "bg-success/15 text-success",
  "RETARD": "bg-warning/15 text-warning",
  "ABSENT": "bg-destructive/15 text-destructive",
  "DEMI-JOURNÉE": "bg-info/15 text-info",
  "EN CONGÉ": "bg-primary/15 text-primary",
};

function AttendancePage() {
  const [view, setView] = useState<"jour" | "semaine" | "mois">("jour");
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ManagerLayout>
      <ManagerHeader greeting="Registre de présence" date="Lundi 21 avril 2026" />

      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-white/5">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/40 px-3 py-2 text-sm font-medium">
            <Calendar className="h-4 w-4 text-primary" />
            21 avril 2026
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-white/5">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex rounded-lg border border-border bg-background/40 p-1">
          {(["jour", "semaine", "mois"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                view === v ? "gradient-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="ml-auto flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/40 px-3 py-2 text-sm transition-colors hover:bg-white/5">
            <FileText className="h-4 w-4" /> Exporter PDF
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/40 px-3 py-2 text-sm transition-colors hover:bg-white/5">
            <Download className="h-4 w-4" /> Exporter Excel
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-5">
        <Mini label="Total" value="156" color="oklch(0.7 0.015 260)" />
        <Mini label="Présents" value="127" color="oklch(0.68 0.16 160)" />
        <Mini label="Absents" value="29" color="oklch(0.62 0.24 25)" />
        <Mini label="Retards" value="8" color="oklch(0.75 0.17 75)" />
        <Mini label="Départs anticipés" value="3" color="oklch(0.6 0.18 250)" />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-border">
                <th className="w-12 px-4 py-3 text-left font-medium">N°</th>
                <th className="px-4 py-3 text-left font-medium">Employé</th>
                <th className="px-4 py-3 text-left font-medium">Département</th>
                <th className="px-4 py-3 text-left font-medium">Entrée</th>
                <th className="px-4 py-3 text-left font-medium">Sortie</th>
                <th className="px-4 py-3 text-left font-medium">Durée</th>
                <th className="px-4 py-3 text-left font-medium">Statut</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((r, i) => {
                const arrivalColor =
                  r.arrival === "—" ? "text-muted-foreground" :
                  parseInt(r.arrival) >= 9 ? "text-warning" : "text-success";
                return (
                  <tr key={r.employee.id} className={`border-b border-border/50 transition-colors hover:bg-white/[0.03] ${i % 2 === 1 ? "bg-white/[0.015]" : ""}`}>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={avatarUrl(r.employee.avatar)} alt="" className="h-8 w-8 rounded-full" width={32} height={32} />
                        <div>
                          <div className="font-medium">{r.employee.firstName} {r.employee.lastName}</div>
                          <div className="font-mono text-[10px] text-muted-foreground">{r.employee.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-xs">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: departmentColors[r.employee.department] }} />
                        {r.employee.department}
                      </span>
                    </td>
                    <td className={`px-4 py-3 font-mono font-bold ${arrivalColor}`}>{r.arrival}</td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {r.stillPresent ? (
                        <span className="inline-flex items-center gap-1.5 text-success">
                          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Encore présent
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {r.stillPresent ? (
                        <div>
                          <div className="font-mono text-xs">{
                            r.arrival === "—" ? "—" : "en cours"
                          }</div>
                          <div className="mt-1 h-1 w-20 overflow-hidden rounded-full bg-white/5">
                            <div className="h-full gradient-primary" style={{ width: r.arrival === "—" ? "0%" : "65%" }} />
                          </div>
                        </div>
                      ) : <span className="font-mono text-xs text-muted-foreground">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider ${statusColors[r.status]}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => setOpen(i)} className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-white/5" aria-label="Voir détails">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {open !== null && (() => {
        const r = attendanceRecords[open];
        return (
          <>
            <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(null)} />
            <div className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-sidebar-bg shadow-elevated animate-fade-up">
              <div className="flex items-start justify-between border-b border-border p-6">
                <div>
                  <h3 className="font-display text-xl font-bold">Détails présence — {r.employee.firstName} {r.employee.lastName}</h3>
                  <p className="text-xs text-muted-foreground">Lundi 21 avril 2026 · {r.employee.department}</p>
                </div>
                <button onClick={() => setOpen(null)} className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-white/5">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-6 p-6 md:grid-cols-[auto_1fr]">
                <div className="flex flex-col items-center">
                  <img src={avatarUrl(r.employee.avatar)} alt="" className="h-24 w-24 rounded-2xl ring-2 ring-primary/40" width={96} height={96} />
                  <p className="mt-3 font-mono text-xs text-primary">{r.employee.id}</p>
                  <p className="text-xs text-muted-foreground">{r.employee.position}</p>
                </div>
                <div>
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Chronologie</h4>
                  <ul className="relative space-y-3 border-l border-border pl-5">
                    {[
                      { t: "08h32", l: "Pointage entrée", sub: "Scan visage · Précision 99,2%", c: "bg-success" },
                      { t: "12h30", l: "Pause déjeuner — sortie", c: "bg-info" },
                      { t: "13h45", l: "Retour pause déjeuner", c: "bg-info" },
                      { t: "17h15", l: "Pointage sortie", sub: "Scan visage · Précision 98,7%", c: "bg-destructive" },
                    ].map((e, i) => (
                      <li key={i} className="relative">
                        <span className={`absolute -left-[27px] top-1 h-3 w-3 rounded-full ring-4 ring-sidebar-bg ${e.c}`} />
                        <div className="font-mono text-xs font-bold">{e.t}</div>
                        <div className="text-sm">{e.l}</div>
                        {e.sub && <div className="text-[11px] text-muted-foreground">{e.sub}</div>}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl border border-border bg-background/40 p-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</div>
                      <div className="font-display text-lg font-bold">7h 58min</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Pause</div>
                      <div className="font-display text-lg font-bold">1h 15min</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Net</div>
                      <div className="font-display text-lg font-bold text-success">6h 43min</div>
                    </div>
                  </div>

                  <h4 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">30 derniers jours</h4>
                  <div className="grid grid-cols-15 gap-1" style={{ gridTemplateColumns: "repeat(15, minmax(0, 1fr))" }}>
                    {Array.from({ length: 30 }).map((_, i) => {
                      const v = i % 7 === 5 || i % 7 === 6 ? "bg-muted/30" : i % 11 === 0 ? "bg-destructive/60" : i % 8 === 0 ? "bg-warning/60" : "bg-success/70";
                      return <span key={i} className={`aspect-square rounded ${v}`} title={`Jour ${i + 1}`} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })()}
    </ManagerLayout>
  );
}

function Mini({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-2xl font-bold" style={{ color }}>{value}</div>
    </div>
  );
}
