import { Layout } from "@/components/Layout";
import { CheckSquare, Plus, Filter, Search, User, Calendar, Clock, Repeat, FolderOpen, RotateCcw } from "lucide-react";
import { dummyTasks } from "@/lib/dummyData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewTaskForm } from "@/components/forms/NewTaskForm";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Tasks() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'frequency' | 'status'>('frequency');
  const [selectedFrequency, setSelectedFrequency] = useState<'all' | 'daily' | 'weekly' | 'monthly' | 'one-time'>('all');

  const handleNewTask = (data: any) => {
    console.log("New task:", data);
    toast({
      title: "Task Created",
      description: `${data.title} has been successfully created.`,
    });
  };

  const tasksByFrequency = {
    daily: dummyTasks.filter(task => task.frequency === 'daily'),
    weekly: dummyTasks.filter(task => task.frequency === 'weekly'),
    monthly: dummyTasks.filter(task => task.frequency === 'monthly'),
    'one-time': dummyTasks.filter(task => task.frequency === 'one-time'),
  };

  const tasksByStatus = {
    todo: dummyTasks.filter(task => task.status === 'todo'),
    'in-progress': dummyTasks.filter(task => task.status === 'in-progress'),
    done: dummyTasks.filter(task => task.status === 'done'),
  };

  const filteredTasks = selectedFrequency === 'all' ? dummyTasks : tasksByFrequency[selectedFrequency as keyof typeof tasksByFrequency] || [];

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case 'daily': return <Clock className="w-4 h-4" />;
      case 'weekly': return <Repeat className="w-4 h-4" />;
      case 'monthly': return <Calendar className="w-4 h-4" />;
      case 'one-time': return <RotateCcw className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'bg-blue-500/20 text-blue-300';
      case 'weekly': return 'bg-purple-500/20 text-purple-300';
      case 'monthly': return 'bg-orange-500/20 text-orange-300';
      case 'one-time': return 'bg-gray-500/20 text-gray-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const TaskCard = ({ task }: { task: any }) => (
    <div className="glass-card rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 border border-white/10">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-medium text-white mb-1">{task.title}</h4>
          <p className="text-sm text-gray-400 mb-2">{task.description}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ml-2 ${
          task.priority === 'high' ? 'bg-red-500/20 text-red-300' :
          task.priority === 'medium' ? 'bg-orange-500/20 text-orange-300' :
          'bg-emerald-500/20 text-emerald-300'
        }`}>
          {task.priority}
        </span>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <FolderOpen className="w-3 h-3" />
            <span>{task.projectName}</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <User className="w-3 h-3" />
            <span>{task.assigneeName}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 ${getFrequencyColor(task.frequency)}`}>
            {getFrequencyIcon(task.frequency)}
            <span>{task.frequency}</span>
          </span>
          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
            task.status === 'done' ? 'bg-emerald-500/20 text-emerald-300' :
            task.status === 'in-progress' ? 'bg-blue-500/20 text-blue-300' :
            'bg-gray-500/20 text-gray-300'
          }`}>
            {task.status.replace('-', ' ')}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</span>
        </div>
        {task.status === 'done' && <CheckSquare className="w-4 h-4 text-emerald-400" />}
      </div>
    </div>
  );

  return (
    <Layout 
      title="Task Management" 
      subtitle="Organize and track tasks by frequency, project, and employee assignment"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <Input 
                placeholder="Search tasks..." 
                className="pl-10 w-64 bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>
            <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:bg-white/10">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          <NewTaskForm onSubmit={handleNewTask} />
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-1 bg-white/5 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('frequency')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'frequency' 
                ? 'gradient-primary text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            By Frequency
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'status' 
                ? 'gradient-primary text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            By Status
          </button>
        </div>

        {activeTab === 'frequency' ? (
          <>
            {/* Frequency Filter */}
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <span className="text-gray-400 text-sm">Filter by frequency:</span>
              {['all', 'daily', 'weekly', 'monthly', 'one-time'].map((frequency) => (
                <button
                  key={frequency}
                  onClick={() => setSelectedFrequency(frequency as any)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedFrequency === frequency
                      ? 'gradient-primary text-white'
                      : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/15'
                  }`}
                >
                  {frequency.charAt(0).toUpperCase() + frequency.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* Task Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {Object.entries(tasksByFrequency).map(([frequency, tasks]) => (
                <div key={frequency} className="glass-card rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">{frequency.charAt(0).toUpperCase() + frequency.slice(1).replace('-', ' ')}</p>
                      <p className="text-2xl font-bold text-white mt-1">{tasks.length}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getFrequencyColor(frequency)}`}>
                      {getFrequencyIcon(frequency)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tasks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </>
        ) : (
          /* Status-based Kanban Board */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* To Do Column */}
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">To Do</h3>
                <span className="bg-gray-500/20 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                  {tasksByStatus.todo.length}
                </span>
              </div>
              <div className="space-y-4">
                {tasksByStatus.todo.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>

            {/* In Progress Column */}
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">In Progress</h3>
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                  {tasksByStatus['in-progress'].length}
                </span>
              </div>
              <div className="space-y-4">
                {tasksByStatus['in-progress'].map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>

            {/* Done Column */}
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Done</h3>
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm font-medium">
                  {tasksByStatus.done.length}
                </span>
              </div>
              <div className="space-y-4">
                {tasksByStatus.done.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
