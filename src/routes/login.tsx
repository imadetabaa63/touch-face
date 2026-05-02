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
    <div className="min-h-screen bg-background">
      {/* Centered form */}
      <div className="relative mx-auto flex min-h-screen max-w-xl flex-col">
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
