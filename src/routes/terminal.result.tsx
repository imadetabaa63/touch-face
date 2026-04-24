import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, X, RotateCw, Phone, ArrowRight } from "lucide-react";
import { avatarUrl } from "@/lib/mock-data";

interface Search {
  ok?: number;
}

export const Route = createFileRoute("/terminal/result")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    ok: search.ok === undefined ? 1 : Number(search.ok),
  }),
  head: () => ({
    meta: [
      { title: "Résultat — FaceGate Présence" },
      { name: "description", content: "Confirmation du pointage." },
      { property: "og:title", content: "Pointage confirmé — FaceGate" },
      { property: "og:description", content: "Votre présence a été enregistrée." },
    ],
  }),
  component: TerminalResult,
});

function TerminalResult() {
  const { ok } = Route.useSearch();
  const success = ok === 1;
  return success ? <SuccessView /> : <FailureView />;
}

function SuccessView() {
  const navigate = useNavigate();
  const [count, setCount] = useState(4);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c - 1), 1000);
    const t = setTimeout(() => navigate({ to: "/terminal" }), 4500);
    return () => { clearInterval(id); clearTimeout(t); };
  }, [navigate]);

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-6 text-foreground">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-success) 30%, transparent), transparent 60%)",
        }}
      />
      {/* Confetti dots */}
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-2 w-2 rounded-full bg-success/70 animate-float"
          style={{
            top: `${Math.random() * 80 + 5}%`,
            left: `${Math.random() * 90 + 5}%`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: 0.6,
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-md text-center animate-fade-up">
        {/* Animated check */}
        <div className="mx-auto mb-8 grid h-36 w-36 place-items-center rounded-full bg-success/15 ring-8 ring-success/10">
          <svg viewBox="0 0 100 100" className="h-24 w-24">
            <circle cx="50" cy="50" r="45" fill="none" stroke="oklch(0.68 0.16 160)" strokeWidth="4" opacity="0.3" />
            <path
              d="M28 52 L44 68 L72 36"
              fill="none"
              stroke="oklch(0.68 0.16 160)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="100"
              style={{ animation: "draw-check 0.7s ease-out forwards" }}
            />
          </svg>
        </div>

        {/* Glassmorphism card */}
        <div className="rounded-3xl glass-strong p-8 shadow-elevated">
          <img
            src={avatarUrl("imad")}
            alt=""
            className="mx-auto h-28 w-28 rounded-full ring-4 ring-success/40"
            width={112}
            height={112}
          />
          <p className="mt-5 text-sm text-muted-foreground">Bienvenue,</p>
          <h1 className="font-display text-3xl font-bold tracking-tight">IMAD BENALI</h1>
          <p className="text-xs text-muted-foreground">Ingénieur IA · Ingénierie</p>
          <p className="font-mono text-[10px] text-primary">FG-2026-0001</p>

          <div className="my-6 inline-flex items-center gap-2 rounded-full bg-success/15 px-4 py-2 text-sm font-bold text-success">
            <CheckCircle2 className="h-4 w-4" /> ENTRÉE ENREGISTRÉE
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-background/40 p-4 text-left">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Heure</div>
              <div className="font-mono text-lg font-bold">08h47</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Date</div>
              <div className="font-mono text-lg font-bold">21 avr.</div>
            </div>
            <div className="col-span-2 border-t border-border pt-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Horaire aujourd'hui</div>
              <div className="text-sm font-medium">08h00 — 17h00 · <span className="text-success">À l'heure ✓</span></div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-xl font-display font-semibold">Bonne journée ! 😊</p>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          Fermeture automatique dans <span className="font-bold text-foreground">{count > 0 ? count : 0}</span>...
        </p>
      </div>
    </div>
  );
}

function FailureView() {
  const navigate = useNavigate();
  const [count, setCount] = useState(8);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c - 1), 1000);
    const t = setTimeout(() => navigate({ to: "/terminal" }), 8500);
    return () => { clearInterval(id); clearTimeout(t); };
  }, [navigate]);

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-6 text-foreground">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-destructive) 25%, transparent), transparent 60%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md text-center animate-fade-up">
        <div className="mx-auto mb-8 grid h-32 w-32 place-items-center rounded-full bg-destructive/15 ring-8 ring-destructive/10 animate-shake">
          <X className="h-20 w-20 text-destructive" strokeWidth={3} />
        </div>

        <div className="rounded-3xl glass-strong p-7 text-left shadow-elevated">
          <div className="flex items-center gap-2 text-destructive">
            <span className="text-lg">⚠</span>
            <span className="font-display text-lg font-bold tracking-tight uppercase">Identité non reconnue</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Votre visage n'a pas été trouvé dans la base de données.
          </p>

          <div className="mt-5 rounded-xl border border-border bg-background/40 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">Que faire :</p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">•</span> Nettoyez l'objectif</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Assurez une bonne lumière</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Retirez lunettes / masque</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Réessayez dans 3 secondes</li>
            </ul>
          </div>

          <div className="mt-4 rounded-xl border border-warning/30 bg-warning/5 p-3 text-xs">
            Si le problème persiste, contactez RH ou IT
            <div className="mt-1 font-mono font-bold text-warning">📞 Poste 1200</div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            to="/terminal/scan"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-warning px-5 py-3.5 text-sm font-bold text-warning-foreground shadow-glow transition-transform hover:scale-[1.02]"
          >
            <RotateCw className="h-4 w-4" /> Réessayer
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3.5 text-xs transition-colors hover:bg-white/5">
            <Phone className="h-4 w-4" /> Support
          </button>
        </div>

        <p className="mt-5 font-mono text-xs text-muted-foreground">
          Retour à l'écran principal dans <span className="font-bold text-foreground">{count > 0 ? count : 0}</span>...
        </p>

        <Link to="/terminal/result" search={{ ok: 0 } as never} className="sr-only">Test failure</Link>
      </div>
    </div>
  );
}
