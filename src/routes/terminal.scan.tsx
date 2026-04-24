import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ScanFace, CheckCircle2, AlertTriangle, Camera, Sun, Glasses, User } from "lucide-react";

export const Route = createFileRoute("/terminal/scan")({
  head: () => ({
    meta: [
      { title: "Scan en cours — FaceGate Présence" },
      { name: "description", content: "Reconnaissance faciale en cours. Placez votre visage dans le cadre." },
      { property: "og:title", content: "Scan biométrique — FaceGate" },
      { property: "og:description", content: "Traitement IA en cours." },
    ],
  }),
  component: TerminalScan,
});

function TerminalScan() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setTimeout(() => navigate({ to: "/terminal/result", search: { ok: 1 } as never }), 400);
          return 100;
        }
        return Math.min(100, p + 7);
      });
    }, 200);
    return () => clearInterval(id);
  }, [navigate]);

  return (
    <div className="relative grid min-h-screen grid-cols-1 lg:grid-cols-[2fr_3fr] bg-background text-foreground overflow-hidden">
      <div aria-hidden className="absolute inset-0 grid-bg opacity-15" />

      {/* Left instructions */}
      <aside className="relative z-10 flex flex-col justify-center border-b border-border bg-sidebar-bg/60 p-10 backdrop-blur-xl lg:border-b-0 lg:border-r">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Placez votre visage <br />
          <span className="gradient-text">dans le cadre</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Restez immobile pendant que notre IA vérifie votre identité.
        </p>

        <div className="mt-8 space-y-3">
          <Tip icon={<Sun className="h-5 w-5" />} label="Bonne luminosité" />
          <Tip icon={<User className="h-5 w-5" />} label="Face à la caméra, à environ 50 cm" />
          <Tip icon={<Glasses className="h-5 w-5" />} label="Retirer lunettes/masque si possible" />
        </div>

        <div className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/20">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            </span>
            Traitement en cours...
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Veuillez patienter, ne bougez pas.</p>
        </div>
      </aside>

      {/* Right camera area */}
      <section className="relative z-10 flex flex-col items-center justify-center p-10">
        <div className="relative">
          {/* Hexagonal scan frame */}
          <div className="relative h-[420px] w-[420px]">
            {/* Rotating dashed border */}
            <div className="absolute inset-0 rounded-[40%] border-2 border-dashed border-primary animate-scan-rotate" />
            {/* Inner camera preview */}
            <div className="absolute inset-6 overflow-hidden rounded-[40%] border border-border bg-gradient-to-br from-surface to-background">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="relative grid h-48 w-48 place-items-center rounded-full border-2 border-success">
                  <User className="h-28 w-28 text-success/70" strokeWidth={1.2} />
                  <span className="absolute -right-2 -top-2 inline-flex items-center gap-1 rounded-full bg-success px-2 py-0.5 text-[10px] font-bold text-success-foreground">
                    <CheckCircle2 className="h-3 w-3" /> Visage détecté
                  </span>
                </div>
              </div>
              {/* Scanning line */}
              <div
                className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_var(--color-primary)]"
                style={{ top: `${progress}%`, transition: "top 0.2s linear" }}
              />
              {/* Corner brackets */}
              {[
                "top-3 left-3 border-t-2 border-l-2",
                "top-3 right-3 border-t-2 border-r-2",
                "bottom-3 left-3 border-b-2 border-l-2",
                "bottom-3 right-3 border-b-2 border-r-2",
              ].map((c, i) => (
                <span key={i} className={`absolute h-6 w-6 border-primary ${c}`} />
              ))}
            </div>
            {/* Scanning label */}
            <div className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full bg-primary/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary backdrop-blur-md animate-blink">
              <ScanFace className="mr-1 inline h-3 w-3" /> Scan en cours...
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-10 w-full max-w-md">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-mono text-muted-foreground">Correspondance avec la base...</span>
            <span className="font-mono font-bold text-primary">{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full border border-border bg-background/60">
            <div
              className="h-full gradient-primary transition-all duration-200"
              style={{ width: `${progress}%`, boxShadow: "0 0 20px var(--color-primary)" }}
            />
          </div>
          <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <Camera className="mr-1.5 inline h-3 w-3" />
            Analyse vecteur 128D · FaceNet IA
          </p>
        </div>
      </section>
    </div>
  );
}

function Tip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-success/15 text-success">
        {icon}
      </span>
      <span className="text-sm">{label}</span>
      <CheckCircle2 className="ml-auto h-4 w-4 text-success" />
    </div>
  );
}
