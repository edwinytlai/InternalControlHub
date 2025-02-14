import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { Home, Flag, Settings } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Features", href: "/features", icon: Flag },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="flex h-full flex-col bg-sidebar border-r">
      <div className="flex flex-1 flex-col gap-y-4 pt-5">
        <nav className="flex-1 px-2">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <a
                  className={cn(
                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <item.icon className="h-6 w-6 shrink-0" />
                  {item.name}
                </a>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
