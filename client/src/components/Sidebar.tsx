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
    <aside className="w-64 glass-card border-r border-white/10 fixed left-0 top-0 h-full z-40">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center animate-gradient floating-animation">
            <Building className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">OfficeHub</h1>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link key={item.name} href={item.href}>
              <div className={`flex items-center space-x-3 p-3 rounded-xl font-medium transition-all duration-300 cursor-pointer ${
                isActive
                  ? "gradient-primary text-white shadow-lg hover-glow"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}>
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
