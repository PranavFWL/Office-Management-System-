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
            <div key={project.id} className="glass-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FolderOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.client}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === 'completed' ? 'bg-green-100 text-green-800' :
                  project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  project.status === 'on-hold' ? 'bg-orange-100 text-orange-800' :
                  project.status === 'delayed' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{project.description}</p>
              
              <div className="space-y-3">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-800">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Project Details */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Budget</span>
                  <span className="font-medium text-gray-800">${project.budget}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Due Date</span>
                  <span className="font-medium text-gray-800">
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
