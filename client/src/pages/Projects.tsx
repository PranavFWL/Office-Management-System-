import { Layout } from "@/components/Layout";
import { FolderOpen, Plus, Filter, Search } from "lucide-react";
import { dummyProjects } from "@/lib/dummyData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Projects() {
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
              <Search className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" />
              <Input 
                placeholder="Search projects..." 
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyProjects.map((project) => (
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
                  project.status === 'delayed' ? 'bg-rose-500/20 text-rose-300' :
                  'bg-gray-500/20 text-gray-300'
                }`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                </span>
              </div>
              
              <p className="text-sm text-gray-400 mb-4">{project.description}</p>
              
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
                  <span className="font-medium text-white">${project.budget}</span>
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
      </div>
    </Layout>
  );
}
