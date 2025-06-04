import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Calendar, DollarSign } from "lucide-react";

interface NewProjectFormProps {
  onSubmit?: (data: any) => void;
}

export function NewProjectForm({ onSubmit }: NewProjectFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    description: "",
    status: "planning",
    budget: "",
    startDate: "",
    endDate: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    setIsOpen(false);
    setFormData({
      name: "",
      client: "",
      description: "",
      status: "planning",
      budget: "",
      startDate: "",
      endDate: ""
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
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Create New Project</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Project Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter project name"
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client" className="text-gray-300">Client</Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => handleChange("client", e.target.value)}
                placeholder="Client name"
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Project description and requirements"
              className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[100px]"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-gray-300">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget" className="text-gray-300">Budget</Label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleChange("budget", e.target.value)}
                  placeholder="0.00"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-gray-300">Start Date</Label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  className="bg-white/10 border-white/20 text-white pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-gray-300">End Date</Label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  className="bg-white/10 border-white/20 text-white pl-10"
                />
              </div>
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
              Create Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}