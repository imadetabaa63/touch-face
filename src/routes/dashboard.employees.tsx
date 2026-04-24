import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ManagerLayout, ManagerHeader } from "@/components/manager-layout";
import { Search, Plus, Download, LayoutGrid, List, Eye, Pencil, Trash2, X } from "lucide-react";
import { employees, avatarUrl, departmentColors, type Employee } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/employees")({
  head: () => ({
    meta: [
      { title: "Collaborateurs — FaceGate Présence" },
      { name: "description", content: "Liste des 156 identités enregistrées avec recherche, filtres et profils détaillés." },
      { property: "og:title", content: "Collaborateurs — FaceGate" },
      { property: "og:description", content: "Gérez les identités biométriques de votre entreprise." },
    ],
  }),
  component: EmployeesPage,
});

function EmployeesPage() {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [selected, setSelected] = useState<Employee | null>(null);

  return (
    <ManagerLayout>
      <ManagerHeader greeting="Collaborateurs" date="156 identités enregistrées" />

      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Chercher par nom, ID, département..."
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
          />
        </div>
        <select className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm focus:border-primary focus:outline-none">
          <option>Tous les départements</option>
          <option>Ingénierie</option>
          <option>RH</option>
          <option>Finance</option>
        </select>
        <select className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm focus:border-primary focus:outline-none">
          <option>Tous</option>
          <option>Actifs</option>
          <option>Inactifs</option>
        </select>
        <select className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm focus:border-primary focus:outline-none">
          <option>Nom A-Z</option>
          <option>Récent</option>
          <option>Département</option>
        </select>
        <div className="flex rounded-lg border border-border bg-card p-1">
          <button onClick={() => setView("grid")} className={`grid h-8 w-8 place-items-center rounded-md transition-colors ${view === "grid" ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}>
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button onClick={() => setView("table")} className={`grid h-8 w-8 place-items-center rounded-md transition-colors ${view === "table" ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}>
            <List className="h-4 w-4" />
          </button>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm transition-colors hover:bg-white/5">
          <Download className="h-4 w-4" /> Exporter
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">
          <Plus className="h-4 w-4" /> Ajouter
        </button>
      </div>

      {/* Grid view */}
      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {employees.map((e) => (
            <article
              key={e.id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/20 to-info/10">
                <img
                  src={avatarUrl(e.avatar)}
                  alt={`${e.firstName} ${e.lastName}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={300}
                  height={225}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/70 px-2 py-1 text-[10px] backdrop-blur-md">
                  <span className={`h-1.5 w-1.5 rounded-full ${e.active ? "bg-success" : "bg-destructive"}`} />
                  {e.active ? "Actif" : "Inactif"}
                </div>
                {/* Action buttons on hover */}
                <div className="absolute inset-x-3 bottom-3 flex translate-y-2 gap-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <button onClick={() => setSelected(e)} className="grid h-9 w-9 place-items-center rounded-lg bg-background/80 text-foreground backdrop-blur-md transition-colors hover:bg-primary hover:text-primary-foreground">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="grid h-9 w-9 place-items-center rounded-lg bg-background/80 text-foreground backdrop-blur-md transition-colors hover:bg-info hover:text-info-foreground">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button className="ml-auto grid h-9 w-9 place-items-center rounded-lg bg-background/80 text-destructive backdrop-blur-md transition-colors hover:bg-destructive hover:text-destructive-foreground">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display text-base font-bold leading-tight">{e.firstName} {e.lastName}</h3>
                <p className="text-xs text-muted-foreground">{e.position}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-[10px]">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: departmentColors[e.department] }} />
                    {e.department}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">{e.id}</span>
                </div>
                <p className="mt-3 border-t border-border pt-2.5 text-[11px] text-muted-foreground">
                  Dernière présence : <span className="text-foreground">{e.lastSeen}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-border">
                <th className="px-5 py-3 text-left font-medium">Photo</th>
                <th className="px-5 py-3 text-left font-medium">Nom</th>
                <th className="px-5 py-3 text-left font-medium">ID</th>
                <th className="px-5 py-3 text-left font-medium">Poste</th>
                <th className="px-5 py-3 text-left font-medium">Département</th>
                <th className="px-5 py-3 text-left font-medium">Statut</th>
                <th className="px-5 py-3 text-left font-medium">Dernière présence</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e, i) => (
                <tr key={e.id} className={`border-b border-border/50 transition-colors hover:bg-white/[0.03] ${i % 2 === 1 ? "bg-white/[0.015]" : ""}`}>
                  <td className="px-5 py-3"><img src={avatarUrl(e.avatar)} alt="" className="h-9 w-9 rounded-full" width={36} height={36} /></td>
                  <td className="px-5 py-3 font-medium">{e.firstName} {e.lastName}</td>
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{e.id}</td>
                  <td className="px-5 py-3">{e.position}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-xs">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: departmentColors[e.department] }} />
                      {e.department}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs ${e.active ? "text-success" : "text-destructive"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${e.active ? "bg-success" : "bg-destructive"}`} />
                      {e.active ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">{e.lastSeen}</td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => setSelected(e)} className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-white/5">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Profile drawer */}
      {selected && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-fade-up" onClick={() => setSelected(null)} />
          <aside className="fixed right-0 top-0 z-50 h-screen w-full max-w-[420px] overflow-y-auto border-l border-border bg-sidebar-bg shadow-elevated animate-slide-in-right scrollbar-thin">
            <div className="sticky top-0 flex items-center justify-between border-b border-border bg-sidebar-bg/90 p-5 backdrop-blur-xl">
              <h3 className="font-display text-lg font-bold">Profil collaborateur</h3>
              <button onClick={() => setSelected(null)} className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-white/5">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <img src={avatarUrl(selected.avatar)} alt="" className="h-28 w-28 rounded-2xl ring-2 ring-primary/40" width={112} height={112} />
                <h2 className="mt-4 font-display text-xl font-bold">{selected.firstName} {selected.lastName}</h2>
                <p className="font-mono text-xs text-primary">{selected.id}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: departmentColors[selected.department] }} />
                  {selected.position} · {selected.department}
                </span>
              </div>

              <dl className="mt-6 space-y-3 rounded-xl border border-border bg-card p-4 text-sm">
                <Row k="Email" v={selected.email} />
                <Row k="Téléphone" v={selected.phone} />
                <Row k="Date début" v={selected.startDate} />
                <Row k="Niveau d'accès" v={selected.accessLevel} />
              </dl>

              <div className="mt-5 rounded-xl border border-success/30 bg-success/5 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-success">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-success/20">✓</span>
                  Vecteur 128D enregistré
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Biométrie active · Dernière mise à jour 14 janvier 2026</p>
              </div>

              <h4 className="mt-6 mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Présences ce mois</h4>
              <div className="grid grid-cols-4 gap-2 text-center">
                <Stat label="À l'heure" value="15" tone="success" />
                <Stat label="Retards" value="3" tone="warning" />
                <Stat label="Absences" value="4" tone="destructive" />
                <Stat label="Total" value="18/22" tone="info" />
              </div>

              <h4 className="mt-6 mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Activité récente</h4>
              <ul className="space-y-2 text-xs">
                {["Aujourd'hui 08h32 · Entrée", "Hier 17h15 · Sortie", "Hier 08h28 · Entrée", "Vendredi 17h02 · Sortie", "Vendredi 08h41 · Entrée"].map((a, i) => (
                  <li key={i} className="flex items-center gap-2 rounded-lg border border-border bg-background/40 px-3 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {a}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-2">
                <button className="flex-1 rounded-lg border border-border py-2.5 text-sm transition-colors hover:bg-white/5">
                  <Pencil className="mr-1.5 inline h-3.5 w-3.5" /> Modifier
                </button>
                <button className="flex-1 rounded-lg border border-destructive/40 bg-destructive/10 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/20">
                  <Trash2 className="mr-1.5 inline h-3.5 w-3.5" /> Supprimer
                </button>
              </div>
            </div>
          </aside>
        </>
      )}
    </ManagerLayout>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-xs text-muted-foreground">{k}</dt>
      <dd className="truncate text-right text-xs font-medium">{v}</dd>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "success" | "warning" | "destructive" | "info" }) {
  const colors = {
    success: "text-success border-success/30 bg-success/5",
    warning: "text-warning border-warning/30 bg-warning/5",
    destructive: "text-destructive border-destructive/30 bg-destructive/5",
    info: "text-info border-info/30 bg-info/5",
  }[tone];
  return (
    <div className={`rounded-lg border p-2 ${colors}`}>
      <div className="font-display text-lg font-bold">{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}
