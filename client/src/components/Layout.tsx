import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Search, Bell, User } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function Layout({ children, title, subtitle }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Sidebar />
      
      <main className="ml-64 flex-1">
        {/* Top Navigation Bar */}
        <header className="glass-card border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">{title}</h2>
              {subtitle && <p className="text-gray-300 mt-1">{subtitle}</p>}
            </div>
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 w-64 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-lg"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-xl">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button>

              {/* Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">JD</span>
                </div>
                <span className="text-white font-medium">John Doe</span>
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
