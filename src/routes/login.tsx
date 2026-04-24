import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff, ShieldCheck, Hexagon } from "lucide-react";
import neuralFace from "@/assets/neural-face.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Connexion — Portail Responsable | FaceGate Présence" },
      { name: "description", content: "Connectez-vous au portail responsable FaceGate Présence." },
      { property: "og:title", content: "Connexion Responsable — FaceGate" },
      { property: "og:description", content: "Accès sécurisé au tableau de bord RH." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left decorative */}
      <div className="relative hidden overflow-hidden bg-sidebar-bg lg:block">
        <div className="absolute inset-0 grid-bg opacity-20" aria-hidden />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-primary) 30%, transparent) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 flex h-full flex-col p-10">
          <Link to="/" className="inline-flex items-center gap-3 self-start">
            <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary glow-primary">
              <Hexagon className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-display text-sm font-bold">FaceGate</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">PRÉSENCE</div>
            </div>
          </Link>

          <div className="relative mx-auto my-auto w-full max-w-md">
            <img
              src={neuralFace}
              alt="Réseau neuronal de reconnaissance faciale"
              className="w-full select-none"
              width={1024}
              height={1280}
              draggable={false}
            />
            {/* Floating stat cards */}
            <div className="absolute -left-6 top-12 rounded-xl glass-strong p-3 shadow-elevated animate-float" style={{ animationDelay: "0s" }}>
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-success/20">
                  <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                </span>
                <div>
                  <div className="font-mono text-sm font-bold">2 847</div>
                  <div className="text-[10px] text-muted-foreground">scans aujourd'hui</div>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 top-1/3 rounded-xl glass-strong p-3 shadow-elevated animate-float" style={{ animationDelay: "1.5s" }}>
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-info/20">
                  <span className="h-2 w-2 rounded-full bg-info" />
                </span>
                <div>
                  <div className="font-mono text-sm font-bold">98,7%</div>
                  <div className="text-[10px] text-muted-foreground">précision</div>
                </div>
              </div>
            </div>
            <div className="absolute -left-2 bottom-16 rounded-xl glass-strong p-3 shadow-elevated animate-float" style={{ animationDelay: "3s" }}>
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/20">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </span>
                <div>
                  <div className="font-mono text-sm font-bold">&lt; 0,8s</div>
                  <div className="text-[10px] text-muted-foreground">reconnaissance</div>
                </div>
              </div>
            </div>
          </div>

          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Propulsé par YOLOv8 + FaceNet IA
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="relative flex flex-col bg-background">
        <div className="flex justify-end p-6 text-xs text-muted-foreground">
          Support IT : <a className="ml-1.5 underline-offset-4 hover:text-foreground hover:underline" href="mailto:it@entreprise.com">it@entreprise.com</a>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 pb-10">
          <div className="w-full max-w-md">
            <div className="text-sm text-muted-foreground">Bon retour</div>
            <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">Portail Responsable</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Vos identifiants vous ont été envoyés par le service informatique.
            </p>

            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = "/dashboard";
              }}
            >
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground" htmlFor="email">Adresse email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    placeholder="responsable@entreprise.com"
                    defaultValue="yasmine.elidrissi@entreprise.com"
                    className="w-full rounded-lg border border-border bg-card py-3 pl-10 pr-3 text-sm transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground" htmlFor="password">Mot de passe</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPwd ? "text" : "password"}
                    placeholder="••••••••••••"
                    defaultValue="motdepasse"
                    className="w-full rounded-lg border border-border bg-card py-3 pl-10 pr-12 text-sm transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                    aria-label={showPwd ? "Masquer" : "Afficher"}
                  >
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <input type="checkbox" className="h-4 w-4 rounded border-border bg-card accent-primary" defaultChecked />
                Se souvenir de cet appareil
              </label>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-lg gradient-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.01] hover:shadow-glow-lg"
              >
                Se connecter
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Mot de passe oublié ?{" "}
                <a href="mailto:it@entreprise.com" className="text-foreground underline-offset-4 hover:underline">
                  Contactez le service IT
                </a>
              </p>
            </form>

            <div className="mt-10 space-y-2 border-t border-border pt-5 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-success" />
                Sécurisé par <span className="font-mono">FaceGate IA Engine v2.1</span>
              </div>
              <p className="text-[11px] text-muted-foreground">Session expire après 8h d'inactivité</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
