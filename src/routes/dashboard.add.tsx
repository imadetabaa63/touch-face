import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ManagerLayout } from "@/components/manager-layout";
import {
  ArrowLeft,
  Camera,
  Upload,
  Check,
  User,
  FolderTree,
  CheckCircle2,
  AlertTriangle,
  X,
} from "lucide-react";

export const Route = createFileRoute("/dashboard/add")({
  head: () => ({
    meta: [
      { title: "Ajouter un collaborateur — FaceGate Présence" },
      { name: "description", content: "Enregistrer un nouveau collaborateur avec capture biométrique." },
      { property: "og:title", content: "Nouveau collaborateur — FaceGate" },
      { property: "og:description", content: "Étape 1 : informations · Étape 2 : biométrie." },
    ],
  }),
  component: AddEmployee,
});

function AddEmployee() {
  const [tab, setTab] = useState<"camera" | "upload">("camera");
  const [captured, setCaptured] = useState(false);

  return (
    <ManagerLayout>
      <div className="-mx-6 mb-6 border-b border-border bg-background/70 px-6 py-5 backdrop-blur-xl lg:-mx-10 lg:px-10">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Retour au tableau de bord
        </Link>
        <h1 className="mt-2 font-display text-2xl font-bold tracking-tight">Enregistrer un nouveau collaborateur</h1>
        <p className="text-sm text-muted-foreground">Étape 1 sur 2</p>

        {/* Stepper */}
        <div className="mt-5 flex items-center gap-3">
          <Step n={1} label="Informations" active />
          <div className="h-px flex-1 bg-gradient-to-r from-primary to-border" />
          <Step n={2} label="Biométrie" />
          <div className="h-px flex-1 bg-border" />
          <Step n={3} label="Terminé" done />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        {/* Form */}
        <section className="xl:col-span-7">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <User className="h-4 w-4 text-primary" />
              Informations personnelles
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Prénom" required placeholder="Imad" />
              <Field label="Nom" required placeholder="Benali" />
              <div className="md:col-span-2">
                <label className="text-xs font-medium text-muted-foreground">ID Employé (auto-généré)</label>
                <div className="mt-1.5 flex items-center justify-between rounded-lg border border-border bg-background/40 px-3.5 py-3">
                  <span className="font-mono text-sm font-bold text-primary">FG-2026-0089</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Lecture seule</span>
                </div>
              </div>
              <Field label="Poste" required placeholder="Ingénieur IA" />
              <SelectField label="Département" required options={["Ingénierie", "RH", "Finance", "Marketing", "Opérations", "Sécurité", "IT"]} />
              <Field label="Email (optionnel)" type="email" placeholder="imad.benali@entreprise.com" />
              <Field label="Téléphone (optionnel)" placeholder="+212 6XX XX XX XX" />
              <Field label="Date de début" type="date" defaultValue="2026-04-21" />
              <SelectField label="Niveau d'accès" options={["Standard", "Responsable", "Exécutif", "Sécurité", "Visiteur"]} />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-5">
            <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-primary">
              <FolderTree className="h-4 w-4" />
              Stockage et organisation
            </h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Un dossier dédié sera automatiquement créé pour ce collaborateur :
            </p>
            <pre className="mt-3 rounded-lg bg-background/60 p-3 font-mono text-[11px] leading-relaxed text-foreground/80">
{`/stockage/collaborateurs/FG-2026-0089/
├── photos/
├── embeddings/
└── profil.json`}
            </pre>
          </div>
        </section>

        {/* Photo capture */}
        <section className="xl:col-span-5">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Camera className="h-4 w-4 text-primary" />
              Capture photo biométrique
            </h2>

            {/* Avatar preview */}
            <div className="mt-6 flex flex-col items-center">
              <div className={`relative grid h-[200px] w-[200px] place-items-center rounded-full border-2 border-dashed transition-all ${captured ? "border-success bg-success/5" : "border-primary/40 bg-primary/5"}`}>
                {captured ? (
                  <div className="grid h-[180px] w-[180px] place-items-center rounded-full gradient-primary text-5xl font-bold text-primary-foreground">
                    IB
                  </div>
                ) : (
                  <User className="h-20 w-20 text-muted-foreground" strokeWidth={1.2} />
                )}
                {captured && (
                  <span className="absolute -right-1 -top-1 grid h-9 w-9 place-items-center rounded-full bg-success ring-4 ring-card">
                    <Check className="h-5 w-5 text-success-foreground" strokeWidth={3} />
                  </span>
                )}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Photo de profil</p>
            </div>

            {/* Tabs */}
            <div className="mt-6 grid grid-cols-2 gap-1 rounded-lg bg-background/40 p-1">
              <button
                onClick={() => setTab("camera")}
                className={`inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-all ${
                  tab === "camera" ? "gradient-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Camera className="h-3.5 w-3.5" /> Caméra
              </button>
              <button
                onClick={() => setTab("upload")}
                className={`inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-all ${
                  tab === "upload" ? "gradient-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Upload className="h-3.5 w-3.5" /> Importer
              </button>
            </div>

            {tab === "camera" ? (
              <div className="mt-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-gradient-to-br from-background to-surface">
                  <div className="absolute inset-0 grid-bg opacity-30" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="grid h-32 w-32 place-items-center rounded-full border-2 border-primary/40">
                      <User className="h-16 w-16 text-primary/60" strokeWidth={1} />
                    </div>
                  </div>
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-destructive/80 px-2 py-0.5 text-[10px] font-bold text-destructive-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> EN DIRECT
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-xs">
                  <Quality ok label="Visage détecté" />
                  <Quality ok label="Bonne luminosité" />
                  <Quality ok label="Centré" />
                  <Quality label="Distance : rapprochez-vous" />
                </ul>
                <button
                  onClick={() => setCaptured(true)}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg gradient-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01]"
                >
                  <Camera className="h-4 w-4" />
                  {captured ? "Reprendre la photo" : "Capturer la photo"}
                </button>
              </div>
            ) : (
              <div className="mt-5">
                <label className="grid aspect-[4/3] cursor-pointer place-items-center rounded-xl border-2 border-dashed border-border bg-background/40 transition-colors hover:border-primary/50 hover:bg-primary/5">
                  <input type="file" accept="image/*" className="sr-only" onChange={() => setCaptured(true)} />
                  <div className="text-center">
                    <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                    <p className="mt-3 text-sm font-medium">Cliquez pour importer ou glissez ici</p>
                    <p className="mt-1 text-xs text-muted-foreground">JPG, PNG, WEBP — max 5 Mo</p>
                  </div>
                </label>
              </div>
            )}

            <p className="mt-5 rounded-lg border border-border bg-background/40 p-3 text-[11px] leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Pour une meilleure précision</strong>, capturez 1 photo de face bien éclairée. Le modèle IA générera automatiquement le vecteur biométrique 128 dimensions.
            </p>
          </div>
        </section>
      </div>

      {/* Actions */}
      <div className="mt-8 flex items-center justify-between rounded-2xl border border-border bg-card p-4">
        <button className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm transition-colors hover:bg-white/5">
          <X className="h-4 w-4" /> Annuler
        </button>
        <button
          disabled={!captured}
          className="inline-flex items-center gap-2 rounded-lg gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          Enregistrer et continuer →
        </button>
      </div>
    </ManagerLayout>
  );
}

function Step({ n, label, active, done }: { n: number; label: string; active?: boolean; done?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition-all ${
          done
            ? "bg-success text-success-foreground"
            : active
            ? "gradient-primary text-primary-foreground shadow-glow"
            : "border border-border bg-card text-muted-foreground"
        }`}
      >
        {done ? <Check className="h-4 w-4" /> : n}
      </span>
      <span className={`text-xs font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
    </div>
  );
}

function Field({ label, required, type = "text", placeholder, defaultValue }: { label: string; required?: boolean; type?: string; placeholder?: string; defaultValue?: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="mt-1.5 w-full rounded-lg border border-border bg-background/40 px-3.5 py-3 text-sm transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
      />
    </div>
  );
}

function SelectField({ label, required, options }: { label: string; required?: boolean; options: string[] }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <select className="mt-1.5 w-full rounded-lg border border-border bg-background/40 px-3.5 py-3 text-sm transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Quality({ ok, label }: { ok?: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2">
      {ok ? (
        <CheckCircle2 className="h-3.5 w-3.5 text-success" />
      ) : (
        <AlertTriangle className="h-3.5 w-3.5 text-warning" />
      )}
      <span className={ok ? "text-foreground" : "text-warning"}>{label}</span>
    </li>
  );
}
