import { Button } from "@/components/ui/button";
import { handleLogout } from "@/lib/msal";
import { Settings, LogOut } from "lucide-react";
import { Link } from "wouter";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <h2 className="text-lg font-semibold flex-1">LLM Service Portal</h2>
        <Link href="/settings">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
