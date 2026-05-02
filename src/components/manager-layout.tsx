import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  ClipboardList,
  TrendingUp,
  Settings,
  LogOut,
  Hexagon,
  Bell,
  Search,
  HelpCircle,
  Mail,
} from "lucide-react";
import { avatarUrl } from "@/lib/mock-data";

const mainNav = [
  { to: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/dashboard/employees", label: "Collaborateurs", icon: Users },
  { to: "/dashboard/attendance", label: "Présence", icon: ClipboardList },
  { to: "/dashboard/add", label: "Ajouter", icon: UserPlus },
] as const;

const adminNav = [
  { label: "Rapports", icon: TrendingUp },
  { label: "Paramètres", icon: Settings },
] as const;

const supportNav = [
  { label: "Aide & Support", icon: HelpCircle },
  { label: "Contact", icon: Mail },
] as const;

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </div>
  );
}

export function ManagerSidebar() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[260px] flex-col border-r border-border bg-sidebar-bg lg:flex">
      <div className="flex items-center gap-3 px-6 pt-6 pb-2">
        <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary">
          <Hexagon className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <div>
          <div className="font-display text-base font-bold tracking-tight">FaceGate</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">PRÉSENCE</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 scrollbar-thin">
        <SectionTitle>Menu principal</SectionTitle>
        <div className="space-y-0.5">
          {mainNav.map((item) => {
            const exact = item.to === "/dashboard" && path === "/dashboard";
            const isActive = exact || (item.to !== "/dashboard" && path.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                  isActive
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2.4 : 1.8} />
                <span>{item.label}</span>
                {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
              </Link>
            );
          })}
        </div>

        <SectionTitle>Administration</SectionTitle>
        <div className="space-y-0.5">
          {adminNav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/70 transition-all hover:bg-secondary hover:text-foreground"
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <SectionTitle>Support</SectionTitle>
        <div className="space-y-0.5">
          {supportNav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/70 transition-all hover:bg-secondary hover:text-foreground"
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-border p-3">
        <div className="mb-2 flex items-center gap-3 rounded-xl bg-secondary p-2.5">
          <img
            src={avatarUrl("manager")}
            alt="Responsable"
            className="h-9 w-9 rounded-full ring-2 ring-primary/30"
            width={36}
            height={36}
          />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">Yasmine El Idrissi</div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Responsable RH
            </div>
          </div>
        </div>
        <Link
          to="/"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </Link>
      </div>
    </aside>
  );
}

export function ManagerHeader({ greeting, date }: { greeting: string; date: string }) {
  return (
    <header className="sticky top-0 z-20 -mx-6 mb-8 flex items-center gap-4 border-b border-border bg-background/80 px-6 py-4 backdrop-blur-xl lg:-mx-10 lg:px-10">
      <div className="min-w-0 flex-shrink-0">
        <h1 className="font-display text-2xl font-bold tracking-tight">{greeting}</h1>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>

      <div className="ml-auto flex flex-1 items-center justify-end gap-3">
        <div className="hidden items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-muted-foreground shadow-sm md:flex md:w-[320px]">
          <Search className="h-4 w-4" />
          <input
            placeholder="Rechercher un collaborateur, un ID..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-medium">⌘K</kbd>
        </div>
        <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-foreground/70 shadow-sm transition-colors hover:bg-secondary hover:text-foreground">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
            3
          </span>
        </button>
        <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card py-1 pl-1 pr-3 shadow-sm">
          <img
            src={avatarUrl("manager")}
            alt="Profil"
            className="h-8 w-8 rounded-full"
            width={32}
            height={32}
          />
          <div className="hidden text-left lg:block">
            <div className="text-xs font-semibold leading-tight">Yasmine</div>
            <div className="text-[10px] text-muted-foreground">RH</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ManagerSidebar />
      <main className="relative z-10 lg:ml-[260px]">
        <div className="px-6 pb-12 lg:px-10">{children}</div>
      </main>
    </div>
  );
}
