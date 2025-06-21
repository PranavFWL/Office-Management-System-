import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  FolderOpen, 
  CheckSquare, 
  Users, 
  DollarSign, 
  Settings,
  Building,
  Clock
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
    name: "Attendance",
    href: "/attendance",
    icon: Clock,
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
    <aside className="w-64 glass-card border-r border-white/10 dark:border-white/10 border-gray-200 fixed left-0 top-0 h-full z-40 bg-white/80 dark:bg-transparent backdrop-blur-lg">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10 dark:border-white/10 border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
            <Building className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">OfficeHub</h1>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link key={item.name} href={item.href}>
              <div className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer ${
                isActive
                  ? "gradient-primary text-white"
                  : "text-gray-400 dark:text-gray-400 text-gray-600 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-gray-100 hover:text-white dark:hover:text-white hover:text-gray-900"
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
