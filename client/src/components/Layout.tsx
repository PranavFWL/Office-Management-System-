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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="ml-64 flex-1 bg-gray-50">
        {/* Top Navigation Bar */}
        <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 p-6 glass-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
              {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
            </div>
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent glass-card"
                />
                <Search className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button>

              {/* Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
                <span className="text-gray-700 font-medium">John Doe</span>
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
