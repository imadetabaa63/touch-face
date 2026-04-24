import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Hexagon, ScanFace, ArrowRight, Building2 } from "lucide-react";

export const Route = createFileRoute("/terminal/")({
  head: () => ({
    meta: [
      { title: "Terminal — FaceGate Présence" },
      { name: "description", content: "Pointez votre présence par scan facial. Rapide, sans contact, précis." },
      { property: "og:title", content: "Terminal de présence — FaceGate" },
      { property: "og:description", content: "Votre visage est votre badge." },
    ],
  }),
  component: TerminalIdle,
});

function TerminalIdle() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ss = String(time.getSeconds()).padStart(2, "0");

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <div aria-hidden className="absolute inset-0 grid-bg opacity-20" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 40%, color-mix(in oklab, var(--color-primary) 22%, transparent), transparent 60%)",
        }}
      />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card">
            <Building2 className="h-5 w-5 text-info" />
          </div>
          <div>
            <div className="text-sm font-semibold">SOCIÉTÉ ATLAS SARL</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Casablanca · Siège</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary glow-primary">
            <Hexagon className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-display text-sm font-bold">FaceGate</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">PRÉSENCE</div>
          </div>
        </div>

        <div className="text-right">
          <div className="font-mono text-3xl font-bold tabular-nums tracking-tight md:text-4xl">
            {hh}:{mm}<span className="text-primary">:{ss}</span>
          </div>
          <div className="text-xs text-muted-foreground">Lundi 21 avril 2026</div>
        </div>
      </header>

      {/* Center */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="relative mb-10">
          <div className="absolute inset-0 -z-10 animate-pulse-glow rounded-full" />
          <div className="relative grid h-44 w-44 place-items-center rounded-full border border-primary/40 bg-card backdrop-blur-xl">
            <div className="absolute inset-3 rounded-full border border-primary/20 animate-scan-rotate" style={{ borderStyle: "dashed" }} />
            <ScanFace className="h-20 w-20 text-primary" strokeWidth={1.3} />
          </div>
        </div>

        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          SYSTÈME DE PRÉSENCE <span className="gradient-text">FACIALE</span>
        </h1>
        <p className="mt-3 text-base text-muted-foreground">Rapide, sans contact, précis.</p>

        <Link
          to="/terminal/scan"
          className="group relative mt-12 inline-flex h-[120px] w-full max-w-[440px] items-center justify-center gap-4 overflow-hidden rounded-2xl gradient-primary px-8 shadow-glow-lg transition-all hover:scale-[1.02]"
        >
          <span className="absolute inset-0 -z-10 animate-pulse-glow rounded-2xl" />
          <ScanFace className="h-10 w-10 text-primary-foreground" strokeWidth={2} />
          <span className="text-left">
            <span className="block font-display text-xl font-bold text-primary-foreground">POINTEZ VOTRE PRÉSENCE</span>
            <span className="block text-xs text-primary-foreground/80">Appuyez ici pour scanner</span>
          </span>
          <ArrowRight className="h-6 w-6 text-primary-foreground transition-transform group-hover:translate-x-1" />
        </Link>

        <p className="mt-6 text-sm italic text-muted-foreground">"Votre visage est votre badge."</p>
      </main>

      {/* Bottom info bar */}
      <footer className="relative z-10 border-t border-border bg-sidebar-bg/60 backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3 text-xs">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-success" />
            <span className="text-muted-foreground">Aujourd'hui :</span>
            <strong className="text-foreground">127 employés présents</strong>
          </span>
          <span className="text-muted-foreground">
            Horaire actuel : <strong className="text-foreground">Équipe matin (08h00 — 17h00)</strong>
          </span>
          <span className="flex items-center gap-2 font-mono">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-success">Système IA actif</span>
            <span className="text-muted-foreground">· FaceNet v2.1</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
