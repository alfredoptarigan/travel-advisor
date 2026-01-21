import { Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { CurrencySwitcher } from "@/components/features/CurrencySwitcher";
import { Globe, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto flex h-[60px] items-center justify-between px-4">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-6 h-6" />
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#00AA6C] rounded-full flex items-center justify-center text-white">
                <span className="font-bold text-lg">TA</span>
              </div>
              <span className="hidden md:block font-bold text-xl tracking-tight text-slate-900">
                TripAdvisor ID
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 font-medium text-sm text-slate-700">
            <Link
              to="/"
              className="hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
            >
              Discover
            </Link>
            <Link
              to="/"
              className="hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
            >
              Trips
            </Link>
            <Link
              to="/"
              className="hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
            >
              Review
            </Link>
            <Link
              to="/blog"
              className="hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
            >
              Blog
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors text-sm font-medium">
              <Globe className="w-5 h-5" />
              <span className="border-r border-gray-300 h-4 mx-2"></span>
              <CurrencySwitcher />
              {/* Note: CurrencySwitcher might need styling adjustment to fit seamlessly */}
            </div>

            <Link to="/login">
              <Button
                variant="ghost"
                className="hidden md:flex font-bold hover:bg-gray-100 rounded-full px-4"
              >
                Log in
              </Button>
            </Link>

            <Link to="/register">
              <Button className="rounded-full bg-black text-white hover:bg-gray-800 font-bold px-5">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  );
}

export default App;
