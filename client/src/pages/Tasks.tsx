import { Layout } from "@/components/Layout";
import { CheckSquare, Plus, Filter, Search, User, Calendar } from "lucide-react";
import { dummyTasks } from "@/lib/dummyData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Tasks() {
  const tasksByStatus = {
    todo: dummyTasks.filter(task => task.status === 'todo'),
    'in-progress': dummyTasks.filter(task => task.status === 'in-progress'),
    done: dummyTasks.filter(task => task.status === 'done'),
  };

  return (
    <Layout 
      title="Task Management" 
      subtitle="Organize and track tasks across all projects"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" />
              <Input 
                placeholder="Search tasks..." 
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
            New Task
          </Button>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* To Do Column */}
          <div className="glass-card rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">To Do</h3>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm font-medium">
                {tasksByStatus.todo.length}
              </span>
            </div>
            <div className="space-y-4">
              {tasksByStatus.todo.map((task) => (
                <div key={task.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-gray-800">{task.title}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{task.assigneeName}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="glass-card rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">In Progress</h3>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                {tasksByStatus['in-progress'].length}
              </span>
            </div>
            <div className="space-y-4">
              {tasksByStatus['in-progress'].map((task) => (
                <div key={task.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-gray-800">{task.title}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{task.assigneeName}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Done Column */}
          <div className="glass-card rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Done</h3>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                {tasksByStatus.done.length}
              </span>
            </div>
            <div className="space-y-4">
              {tasksByStatus.done.map((task) => (
                <div key={task.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow opacity-75">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-gray-800 line-through">{task.title}</h4>
                    <CheckSquare className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{task.assigneeName}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
