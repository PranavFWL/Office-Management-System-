import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Calendar, User } from "lucide-react";
import { dummyProjects, dummyEmployees } from "@/lib/dummyData";

interface NewTaskFormProps {
  onSubmit?: (data: any) => void;
}

export function NewTaskForm({ onSubmit }: NewTaskFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    frequency: "one-time",
    projectId: "",
    assigneeId: "",
    dueDate: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    setIsOpen(false);
    setFormData({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      frequency: "one-time",
      projectId: "",
      assigneeId: "",
      dueDate: ""
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Create New Task</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-300">Task Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter task title"
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Task description and requirements"
              className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[100px]"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-gray-300">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleChange("priority", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency" className="text-gray-300">Frequency</Label>
              <Select value={formData.frequency} onValueChange={(value) => handleChange("frequency", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="one-time">One-time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project" className="text-gray-300">Project</Label>
              <Select value={formData.projectId} onValueChange={(value) => handleChange("projectId", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {dummyProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id.toString()}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignee" className="text-gray-300">Assign to</Label>
              <Select value={formData.assigneeId} onValueChange={(value) => handleChange("assigneeId", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {dummyEmployees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id.toString()}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate" className="text-gray-300">Due Date</Label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleChange("dueDate", e.target.value)}
                className="bg-white/10 border-white/20 text-white pl-10"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-white/20 text-gray-300 hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary">
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}