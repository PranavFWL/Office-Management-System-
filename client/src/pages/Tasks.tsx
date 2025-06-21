import { Layout } from "@/components/Layout";
import { CheckSquare, Plus, Filter, Search, User, Calendar, Clock, Repeat, FolderOpen, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewTaskForm } from "@/components/forms/NewTaskForm";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Task } from "@shared/schema";

interface TaskWithDetails extends Task {
  id: number;
  projectName?: string;
  assigneeName?: string;
  frequency?: 'daily' | 'weekly' | 'monthly' | 'one-time';
}

export default function Tasks() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'frequency' | 'status'>('frequency');
  const [selectedFrequency, setSelectedFrequency] = useState<'all' | 'daily' | 'weekly' | 'monthly' | 'one-time'>('all');
  const [tasks, setTasks] = useState<TaskWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      
      // Enhance tasks with frequency property based on dueDate and other patterns
      const enhancedTasks = data.map((task: Task & { id: number }) => {
        // This is a simplified logic - in a real app, frequency would be stored in the database
        // For now, we'll assign random frequencies for demonstration
        const frequencies = ['daily', 'weekly', 'monthly', 'one-time'] as const;
        const randomFrequency = frequencies[Math.floor(Math.random() * frequencies.length)];
        
        return {
          ...task,
          frequency: randomFrequency,
          projectName: task.projectId ? `Project #${task.projectId}` : 'No Project',
          assigneeName: task.assigneeId ? `Employee #${task.assigneeId}` : 'Unassigned'
        };
      });
      
      setTasks(enhancedTasks);
      setError(null);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load tasks. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleNewTask = (data: any) => {
    fetchTasks();
    toast({
      title: "Task Created",
      description: `${data.title} has been successfully created.`,
    });
  };

  const tasksByFrequency = {
    daily: tasks.filter(task => task.frequency === 'daily'),
    weekly: tasks.filter(task => task.frequency === 'weekly'),
    monthly: tasks.filter(task => task.frequency === 'monthly'),
    'one-time': tasks.filter(task => task.frequency === 'one-time'),
  };

  const tasksByStatus = {
    todo: tasks.filter(task => task.status === 'todo'),
    'in-progress': tasks.filter(task => task.status === 'in-progress'),
    done: tasks.filter(task => task.status === 'done'),
  };

  const filteredTasks = selectedFrequency === 'all' ? tasks : tasksByFrequency[selectedFrequency as keyof typeof tasksByFrequency] || [];

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

  const TaskCard = ({ task }: { task: TaskWithDetails }) => (
    <div className="glass-card rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-medium text-foreground mb-1">{task.title}</h4>
          <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
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
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <FolderOpen className="w-3 h-3" />
            <span>{task.projectName}</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <User className="w-3 h-3" />
            <span>{task.assigneeName}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 ${getFrequencyColor(task.frequency || 'daily')}`}>
            {getFrequencyIcon(task.frequency || 'daily')}
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

      <div className="flex items-center justify-between text-xs text-muted-foreground">
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
              <Search className="w-5 h-5 text-muted-foreground absolute left-3 top-2.5" />
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
          <NewTaskForm onSubmit={handleNewTask} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <span className="ml-3 text-muted-foreground">Loading tasks...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="glass-card rounded-2xl p-6 border border-red-500/30 bg-red-500/10 text-center">
            <p className="text-red-300">{error}</p>
            <Button 
              variant="outline" 
              className="mt-4 border-red-500/30 text-red-300 hover:bg-red-500/20"
              onClick={fetchTasks}
            >
              Try Again
            </Button>
          </div>
        )}

        {/* View Toggle */}
        {!loading && !error && (
          <>
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
          </>
        )}

        {/* Empty State */}
        {!loading && !error && tasks.length === 0 && (
          <div className="glass-card rounded-2xl p-12 border border-white/10 text-center">
            <CheckSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No tasks yet</h3>
            <p className="text-gray-400 mb-6">Create your first task to get started</p>
            <NewTaskForm onSubmit={handleNewTask} />
          </div>
        )}
      </div>
    </Layout>
  );
}
