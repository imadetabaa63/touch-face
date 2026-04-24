import { createFileRoute, Link } from "@tanstack/react-router";
import { Hexagon, ArrowRight, Monitor, Shield } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FaceGate Présence — Présence intelligente, touche humaine" },
      {
        name: "description",
        content:
          "Système de gestion de présence biométrique par reconnaissance faciale. Portail responsable RH et terminal employé.",
      },
      { property: "og:title", content: "FaceGate Présence" },
      { property: "og:description", content: "Présence intelligente, touche humaine — propulsé par YOLOv8 + FaceNet IA." },
    ],
  }),
  component: PortalSelect,
});

function PortalSelect() {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-bg opacity-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--color-primary) 25%, transparent), transparent 50%), radial-gradient(circle at 70% 70%, color-mix(in oklab, var(--color-info) 20%, transparent), transparent 50%)",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl text-center">
        <div className="mb-8 inline-flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-primary glow-primary">
            <Hexagon className="h-7 w-7 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="text-left">
            <div className="font-display text-2xl font-bold tracking-tight">FaceGate</div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Présence</div>
          </div>
        </div>

        <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl">
          Présence <span className="gradient-text">intelligente</span>,
          <br /> touche humaine.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
          Reconnaissance faciale en moins de 0,8 seconde. 98,7 % de précision. Choisissez votre interface.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Link
            to="/login"
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-left transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_var(--color-primary)]"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <Shield className="h-8 w-8 text-primary" />
              <h3 className="mt-5 font-display text-xl font-semibold">Portail Responsable</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Tableau de bord RH complet, gestion des collaborateurs, rapports en temps réel.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Accéder au portail <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link
            to="/terminal"
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-left transition-all hover:-translate-y-1 hover:border-success/40 hover:shadow-[0_20px_60px_-20px_var(--color-success)]"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-success/20 blur-3xl transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <Monitor className="h-8 w-8 text-success" />
              <h3 className="mt-5 font-display text-xl font-semibold">Terminal Employé</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Mode kiosque plein écran. Pointez votre présence par scan facial.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-success">
                Lancer le terminal <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>

        <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Propulsé par YOLOv8 + FaceNet IA · v2.1.0
        </p>
      </div>
    </div>
  );
}
