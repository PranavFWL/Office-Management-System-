import { Layout } from "@/components/Layout";
import { StatBox } from "@/components/StatBox";
import { ChartWidget } from "@/components/ChartWidget";
import { FolderOpen, CheckSquare, Users, DollarSign, Plus, BarChart3, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";

interface Project {
  id: number;
  name: string;
  description: string | null;
  status: string;
  client: string;
  progress: number;
  budget: string | null;
  startDate: string | null;
  endDate: string | null;
}

interface DashboardStats {
  activeProjects: number;
  pendingTasks: number;
  teamMembers: number;
  monthlyRevenue: string;
}

interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
}

interface ProjectStatusData {
  status: string;
  count: number;
  color: string;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    activeProjects: 0,
    pendingTasks: 0,
    teamMembers: 0,
    monthlyRevenue: "$0"
  });
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [projectStatusData, setProjectStatusData] = useState<ProjectStatusData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch projects
      const projectsResponse = await fetch("/api/projects");
      const projectsData = await projectsResponse.json();
      setProjects(projectsData);

      // Fetch tasks to count pending ones
      const tasksResponse = await fetch("/api/tasks");
      const tasksData = await tasksResponse.json();
      const pendingTasks = tasksData.filter((task: any) => 
        task.status === 'todo' || task.status === 'in-progress'
      ).length;

      // Fetch employees count
      const employeesResponse = await fetch("/api/employees");
      const employeesData = await employeesResponse.json();
      
      // Fetch finances to calculate revenue
      const financesResponse = await fetch("/api/finances");
      const financesData = await financesResponse.json();
      
      // Calculate monthly revenue from finances
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthlyIncome = financesData
        .filter((finance: any) => {
          const financeDate = new Date(finance.date);
          return finance.type === 'income' && 
                 financeDate.getMonth() === currentMonth &&
                 financeDate.getFullYear() === currentYear;
        })
        .reduce((sum: number, finance: any) => sum + parseFloat(finance.amount), 0);
      
      // Set dashboard stats
      setStats({
        activeProjects: projectsData.filter((p: Project) => p.status === 'in-progress').length,
        pendingTasks: pendingTasks,
        teamMembers: employeesData.length,
        monthlyRevenue: `$${monthlyIncome.toLocaleString()}`
      });

      // Generate revenue data for chart
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      const revenueChartData = months.map(month => {
        // In a real app, you would filter finances by each month
        // For now, we'll generate some random data
        return {
          month,
          revenue: Math.floor(Math.random() * 50000) + 40000,
          expenses: Math.floor(Math.random() * 30000) + 20000
        };
      });
      setRevenueData(revenueChartData);

      // Calculate project status data
      const statusCounts: Record<string, number> = {};
      projectsData.forEach((project: Project) => {
        statusCounts[project.status] = (statusCounts[project.status] || 0) + 1;
      });
      
      const statusColors: Record<string, string> = {
        'completed': '#10B981',
        'in-progress': '#3B82F6',
        'on-hold': '#F59E0B',
        'delayed': '#EF4444',
        'planning': '#8B5CF6'
      };
      
      const projectStatusChartData = Object.entries(statusCounts).map(([status, count]) => ({
        status: status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' '),
        count,
        color: statusColors[status] || '#6B7280'
      }));
      
      setProjectStatusData(projectStatusChartData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout 
        title="Dashboard Overview" 
        subtitle="Welcome back! Here's what's happening with your office."
      >
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          <span className="ml-3 text-gray-400">Loading dashboard data...</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title="Dashboard Overview" 
      subtitle="Welcome back! Here's what's happening with your office."
    >
      <div className="space-y-6">
        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatBox
            title="Active Projects"
            value={stats.activeProjects.toString()}
            change="+12%"
            changeType="positive"
            changeLabel="from last month"
            icon={FolderOpen}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          
          <StatBox
            title="Pending Tasks"
            value={stats.pendingTasks.toString()}
            change="+5%"
            changeType="positive"
            changeLabel="from last week"
            icon={CheckSquare}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-100"
          />
          
          <StatBox
            title="Team Members"
            value={stats.teamMembers.toString()}
            change="+3"
            changeType="positive"
            changeLabel="new hires"
            icon={Users}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          
          <StatBox
            title="Monthly Revenue"
            value={stats.monthlyRevenue}
            change="+18%"
            changeType="positive"
            changeLabel="vs last month"
            icon={DollarSign}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
        </div>

        {/* Charts and Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend Chart */}
          <ChartWidget 
            title="Revenue Trend"
            actions={
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Last 6 months</option>
                <option>Last year</option>
                <option>All time</option>
              </select>
            }
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      backdropFilter: 'blur(10px)'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartWidget>

          {/* Project Status */}
          <ChartWidget 
            title="Project Status"
            actions={
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View All
              </button>
            }
          >
            <div className="space-y-4">
              {projectStatusData.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-700">{item.status}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-semibold text-gray-800">{item.count}</span>
                    <span className="text-sm text-gray-600">projects</span>
                  </div>
                </div>
              ))}
            </div>
          </ChartWidget>
        </div>

        {/* Recent Activity and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Recent Projects</h3>
              <button className="text-sm bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-medium text-white transition-colors duration-200">
                View All Projects
              </button>
            </div>
            <div className="space-y-4">
              {projects.slice(0, 3).map((project) => (
                <div 
                  key={project.id} 
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                      <FolderOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{project.name}</h4>
                      <p className="text-sm text-gray-400">{project.client}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      project.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' :
                      project.status === 'in-progress' ? 'bg-blue-500/20 text-blue-300' :
                      project.status === 'on-hold' ? 'bg-orange-500/20 text-orange-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                    </span>
                    <span className="text-sm font-medium text-white">{project.progress}%</span>
                  </div>
                </div>
              ))}
              
              {projects.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No projects found. Create your first project to get started.
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 gradient-primary hover:opacity-90 rounded-lg transition-opacity duration-200 text-left">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-white">Create Project</span>
              </button>

              <button className="w-full flex items-center space-x-3 p-3 gradient-success hover:opacity-90 rounded-lg transition-opacity duration-200 text-left">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-white">Add Task</span>
              </button>

              <button className="w-full flex items-center space-x-3 p-3 gradient-accent hover:opacity-90 rounded-lg transition-opacity duration-200 text-left">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-white">Invite Member</span>
              </button>

              <button className="w-full flex items-center space-x-3 p-3 gradient-secondary hover:opacity-90 rounded-lg transition-opacity duration-200 text-left">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-white">Generate Report</span>
              </button>
            </div>

            {/* Recent Notifications */}
            <div className="mt-8">
              <h4 className="text-lg font-medium text-white mb-4">Recent Notifications</h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-500/15 rounded-lg border-l-4 border-blue-400 hover:bg-blue-500/20 transition-colors duration-200">
                  <p className="text-sm font-medium text-white">Project deadline approaching</p>
                  <p className="text-xs text-gray-400 mt-1">Website Redesign due in 2 days</p>
                </div>
                
                <div className="p-3 bg-emerald-500/15 rounded-lg border-l-4 border-emerald-400 hover:bg-emerald-500/20 transition-colors duration-200">
                  <p className="text-sm font-medium text-white">Task completed</p>
                  <p className="text-xs text-gray-400 mt-1">Logo design approved by client</p>
                </div>
                
                <div className="p-3 bg-orange-500/15 rounded-lg border-l-4 border-orange-400 hover:bg-orange-500/20 transition-colors duration-200">
                  <p className="text-sm font-medium text-white">New team member</p>
                  <p className="text-xs text-gray-400 mt-1">Sarah Johnson joined the design team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
