import { Icons } from "@/components/_components/icons";
import ProfileUser from "@/components/_components/pfp";
import { Button } from "@/components/ui/button";
import { IconBell } from "@tabler/icons-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function AppHeader() {
  return (
    <header className="bg-background flex h-16 items-center gap-3 border-b px-4 md:h-20 md:gap-4 md:px-6">
      {/* Logo Section - Left aligned */}
      <nav className="flex items-center" aria-label="Main navigation">
        <a
          href="/dashboard"
          className="flex items-center gap-2 font-semibold transition-opacity hover:opacity-80"
          aria-label="Go to dashboard"
        >
          <span className="hidden text-lg font-bold md:inline-block">
            Verycheap
          </span>
        </a>
      </nav>

      {/* Search Section - Grows to fill space */}
      <form className="flex-1" role="search">
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <Icons.search />
          </InputGroupAddon>
          <InputGroupInput placeholder="search" />
        </InputGroup>
      </form>

      {/* Actions Section - Right aligned */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Notification Icon Button */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Ver notificaciones"
          className="relative cursor-pointer"
        >
          <Icons.bell className="size-5" aria-hidden="true" />
        </Button>

        {/* Primary Action Button */}
        <Button
          variant="link"
          size="sm"
          className="hidden cursor-pointer md:flex"
        >
          My orders
        </Button>

        {/* User Profile Component */}
        <ProfileUser />
      </div>
    </header>
  );
}
