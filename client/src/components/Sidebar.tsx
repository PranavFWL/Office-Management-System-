import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  FolderOpen, 
  CheckSquare, 
  Users, 
  DollarSign, 
  Settings,
  Building
} from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: FolderOpen,
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Employees",
    href: "/employees",
    icon: Users,
  },
  {
    name: "Finance",
    href: "/finance",
    icon: DollarSign,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-lg border-r border-white/30 shadow-lg fixed left-0 top-0 h-full z-40 glass-card">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-800">OfficeHub</h1>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link key={item.name} href={item.href}>
              <a className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "soft-blue-bg text-blue-700"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
              }`}>
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </a>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
