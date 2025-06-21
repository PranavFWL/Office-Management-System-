import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Search, Bell, LogOut } from "lucide-react";
import { UserButton, useUser } from "@clerk/clerk-react";

interface LayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function Layout({ children, title, subtitle }: LayoutProps) {
  const { user } = useUser();
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Sidebar />
      
      <main className="ml-64 flex-1">
        {/* Top Navigation Bar */}
        <header className="glass-card border-b border-white/10 dark:border-white/10 border-gray-200 p-6 bg-white/80 dark:bg-transparent backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
              {subtitle && <p className="text-gray-600 dark:text-gray-300 mt-1">{subtitle}</p>}
            </div>
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 w-64 bg-white/10 dark:bg-white/10 bg-gray-100 border border-white/20 dark:border-white/20 border-gray-300 rounded-xl text-white dark:text-white text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-lg"
                />
                <Search className="w-5 h-5 text-gray-400 dark:text-gray-400 text-gray-600 absolute left-3 top-2.5" />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 dark:text-gray-400 text-gray-600 hover:text-white dark:hover:text-white hover:text-gray-900 transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-gray-200 rounded-xl">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button>

              {/* Profile */}
              <div className="flex items-center space-x-3">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 ring-2 ring-white/20 hover:ring-white/40 transition-all",
                      userButtonPopoverCard: "bg-slate-800 border border-white/20 backdrop-blur-lg shadow-2xl",
                      userButtonPopoverActions: "bg-slate-800",
                      userButtonPopoverActionButton: "text-white hover:bg-slate-700 transition-colors",
                      userButtonPopoverActionButtonText: "text-white font-medium",
                      userButtonPopoverActionButtonIcon: "text-white",
                      userButtonPopoverFooter: "bg-slate-800 border-t border-white/10",
                    },
                    variables: {
                      colorBackground: "#1e293b",
                      colorText: "#ffffff",
                      colorTextSecondary: "#cbd5e1",
                      colorInputBackground: "#334155",
                      colorInputText: "#ffffff",
                    }
                  }}
                  afterSignOutUrl="/sign-in"
                />
                <div className="text-right">
                  <div className="text-gray-900 dark:text-white font-medium">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {user?.primaryEmailAddress?.emailAddress}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
