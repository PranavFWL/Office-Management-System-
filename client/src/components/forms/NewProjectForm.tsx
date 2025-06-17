import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Calendar, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewProjectFormProps {
  onSuccess?: () => void;
}

export function NewProjectForm({ onSuccess }: NewProjectFormProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    description: "",
    status: "planning",
    budget: "",
    startDate: "",
    endDate: ""
  });

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = "Project name is required";
    }
    
    if (!formData.client.trim()) {
      errors.client = "Client name is required";
    }
    
    if (formData.budget && (isNaN(parseFloat(formData.budget)) || parseFloat(formData.budget) < 0)) {
      errors.budget = "Budget must be a positive number";
    }
    
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end < start) {
        errors.endDate = "End date cannot be before start date";
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Helper function to format dates with timezone handling
  const formatDateForAPI = (dateString: string | null): string | null => {
    if (!dateString) return null;
    
    const dateObj = new Date(dateString);
    // Adjust for timezone to get consistent date
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const day = dateObj.getDate();
    return new Date(Date.UTC(year, month, day, 12, 0, 0)).toISOString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format dates for API
      const formattedStartDate = formatDateForAPI(formData.startDate || null);
      const formattedEndDate = formatDateForAPI(formData.endDate || null);
      
      // Prepare payload with proper types
      const payload = {
        name: formData.name.trim(),
        client: formData.client.trim(),
        description: formData.description.trim() || null,
        status: formData.status,
        progress: 0, // Default for new projects
        budget: formData.budget ? parseFloat(formData.budget) : null,
        startDate: formattedStartDate,
        endDate: formattedEndDate
      };
      
      console.log("Sending project payload:", payload);
      
      // Send data to API
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Project creation error:", errorData);
        throw new Error(errorData.message || "Failed to create project");
      }
      
      const project = await response.json();
      
      toast({
        title: "Project Created",
        description: `${project.name} has been successfully created.`,
      });
      
      setIsOpen(false);
      resetForm();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create project",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      client: "",
      description: "",
      status: "planning",
      budget: "",
      startDate: "",
      endDate: ""
    });
    setFormErrors({});
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is changed
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        resetForm();
      }
    }}>
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
              <Label htmlFor="name" className={`text-gray-300 ${formErrors.name ? 'text-red-400' : ''}`}>
                Project Name {formErrors.name && <span className="text-red-400">*</span>}
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter project name"
                className={`bg-white/10 border-white/20 text-white placeholder-gray-400 ${formErrors.name ? 'border-red-500' : ''}`}
                disabled={isSubmitting}
              />
              {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client" className={`text-gray-300 ${formErrors.client ? 'text-red-400' : ''}`}>
                Client {formErrors.client && <span className="text-red-400">*</span>}
              </Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => handleChange("client", e.target.value)}
                placeholder="Client name"
                className={`bg-white/10 border-white/20 text-white placeholder-gray-400 ${formErrors.client ? 'border-red-500' : ''}`}
                disabled={isSubmitting}
              />
              {formErrors.client && <p className="text-red-400 text-xs mt-1">{formErrors.client}</p>}
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
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-gray-300">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleChange("status", value)}
                disabled={isSubmitting}
              >
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
              <Label htmlFor="budget" className={`text-gray-300 ${formErrors.budget ? 'text-red-400' : ''}`}>
                Budget {formErrors.budget && <span className="text-red-400">*</span>}
              </Label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <Input
                  id="budget"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.budget}
                  onChange={(e) => handleChange("budget", e.target.value)}
                  placeholder="0.00"
                  className={`bg-white/10 border-white/20 text-white placeholder-gray-400 pl-10 ${formErrors.budget ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
              </div>
              {formErrors.budget && <p className="text-red-400 text-xs mt-1">{formErrors.budget}</p>}
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
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className={`text-gray-300 ${formErrors.endDate ? 'text-red-400' : ''}`}>
                End Date {formErrors.endDate && <span className="text-red-400">*</span>}
              </Label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  className={`bg-white/10 border-white/20 text-white pl-10 ${formErrors.endDate ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
              </div>
              {formErrors.endDate && <p className="text-red-400 text-xs mt-1">{formErrors.endDate}</p>}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-white/20 text-gray-300 hover:bg-white/10"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}