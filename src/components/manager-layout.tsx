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
} from "lucide-react";
import { avatarUrl } from "@/lib/mock-data";

const navItems = [
  { to: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/dashboard/add", label: "Ajouter un collaborateur", icon: UserPlus },
  { to: "/dashboard/employees", label: "Collaborateurs", icon: Users },
  { to: "/dashboard/attendance", label: "Présence", icon: ClipboardList },
  { to: "/dashboard/reports", label: "Rapports", icon: TrendingUp },
  { to: "/dashboard/settings", label: "Paramètres", icon: Settings },
] as const;

export function ManagerSidebar() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[260px] flex-col border-r border-border bg-sidebar-bg lg:flex">
      <div className="flex items-center gap-3 px-6 pt-6 pb-5">
        <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary glow-primary">
          <Hexagon className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <div>
          <div className="font-display text-sm font-bold tracking-tight">FaceGate</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">PRÉSENCE</div>
        </div>
      </div>

      <div className="mx-4 mb-4 flex items-center gap-3 rounded-xl border border-border bg-card p-3">
        <img
          src={avatarUrl("manager")}
          alt="Responsable"
          className="h-10 w-10 rounded-full ring-2 ring-primary/40"
          width={40}
          height={40}
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold">Yasmine El Idrissi</div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            En ligne · Responsable RH
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const active = path === item.to || (item.to !== "/dashboard" && path.startsWith(item.to));
          const exact = item.to === "/dashboard" && path === "/dashboard";
          const isActive = exact || (item.to !== "/dashboard" && active);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                isActive
                  ? "bg-primary/15 text-foreground shadow-[inset_2px_0_0_var(--color-primary)]"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}
            >
              <Icon className={`h-4 w-4 transition-colors ${isActive ? "text-primary" : ""}`} />
              <span className="font-medium">{item.label}</span>
              {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <Link
          to="/"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </Link>
        <div className="mt-3 flex items-center justify-between px-3 text-[10px] font-mono text-muted-foreground">
          <span>FG v2.1.0</span>
          <span className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-success" />
            IA active
          </span>
        </div>
      </div>
    </aside>
  );
}

export function ManagerHeader({ greeting, date }: { greeting: string; date: string }) {
  return (
    <header className="sticky top-0 z-20 -mx-6 mb-8 flex items-center justify-between border-b border-border bg-background/70 px-6 py-4 backdrop-blur-xl lg:-mx-10 lg:px-10">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">{greeting}</h1>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground md:flex">
          <Search className="h-4 w-4" />
          <span>Rechercher...</span>
          <kbd className="ml-2 rounded border border-border bg-background px-1.5 py-0.5 text-[10px]">⌘K</kbd>
        </div>
        <button className="relative grid h-10 w-10 place-items-center rounded-lg border border-border bg-card transition-colors hover:bg-white/5">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 grid h-4 w-4 place-items-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
            3
          </span>
        </button>
        <img
          src={avatarUrl("manager")}
          alt="Profil"
          className="h-10 w-10 rounded-full ring-2 ring-border"
          width={40}
          height={40}
        />
      </div>
    </header>
  );
}

export function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 0%, color-mix(in oklab, var(--color-primary) 20%, transparent) 0%, transparent 50%), radial-gradient(circle at 85% 100%, color-mix(in oklab, var(--color-info) 15%, transparent) 0%, transparent 50%)",
        }}
      />
      <ManagerSidebar />
      <main className="relative z-10 lg:ml-[260px]">
        <div className="px-6 pb-12 lg:px-10">{children}</div>
      </main>
    </div>
  );
}
