import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { FolderOpen, Plus, Filter, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewProjectForm } from "@/components/forms/NewProjectForm";
import { useToast } from "@/hooks/use-toast";

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

export default function Projects() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load projects. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewProject = () => {
    fetchProjects();
  };

  return (
    <Layout 
      title="Projects" 
      subtitle="Manage and track all your projects in one place"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <Input 
                placeholder="Search projects..." 
                className="pl-10 w-64 bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>
            <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:bg-white/10">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          <NewProjectForm onSuccess={handleNewProject} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <span className="ml-3 text-gray-400">Loading projects...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="glass-card rounded-2xl p-6 border border-red-500/30 bg-red-500/10 text-center">
            <p className="text-red-300">{error}</p>
            <Button 
              variant="outline" 
              className="mt-4 border-red-500/30 text-red-300 hover:bg-red-500/20"
              onClick={fetchProjects}
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="glass-card rounded-2xl p-12 border border-white/10 text-center">
            <FolderOpen className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
            <p className="text-gray-400 mb-6">Create your first project to get started</p>
            <NewProjectForm onSuccess={handleNewProject} />
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-white/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                      <FolderOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{project.name}</h3>
                      <p className="text-sm text-gray-400">{project.client}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                    project.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' :
                    project.status === 'in-progress' ? 'bg-blue-500/20 text-blue-300' :
                    project.status === 'on-hold' ? 'bg-orange-500/20 text-orange-300' :
                    project.status === 'delayed' ? 'bg-red-500/20 text-red-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                  </span>
                </div>
                
                <p className="text-sm text-gray-400 mb-4">{project.description || 'No description provided'}</p>
                
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progress</span>
                      <span className="font-medium text-white">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div 
                        className="gradient-primary h-2 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Project Details */}
                  <div className="flex justify-between text-sm bg-white/5 p-3 rounded-lg">
                    <span className="text-gray-400">Budget</span>
                    <span className="font-medium text-white">
                      {project.budget ? `$${parseFloat(project.budget).toLocaleString()}` : 'Not set'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm bg-white/5 p-3 rounded-lg">
                    <span className="text-gray-400">Due Date</span>
                    <span className="font-medium text-white">
                      {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Not set'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
