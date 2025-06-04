import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Mail, Phone, Calendar, DollarSign } from "lucide-react";

interface NewEmployeeFormProps {
  onSubmit?: (data: any) => void;
}

export function NewEmployeeForm({ onSubmit }: NewEmployeeFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    phone: "",
    salary: "",
    hireDate: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    setIsOpen(false);
    setFormData({
      name: "",
      email: "",
      role: "",
      department: "",
      phone: "",
      salary: "",
      hireDate: ""
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const departments = ["Engineering", "Design", "Marketing", "Sales", "HR", "Finance"];
  const roles = ["Developer", "Designer", "Manager", "Analyst", "Coordinator", "Director"];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Add New Employee</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter full name"
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email Address</Label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="email@company.com"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-gray-300">Job Role</Label>
              <Select value={formData.role} onValueChange={(value) => handleChange("role", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-gray-300">Department</Label>
              <Select value={formData.department} onValueChange={(value) => handleChange("department", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="(555) 123-4567"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary" className="text-gray-300">Salary</Label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <Input
                  id="salary"
                  type="number"
                  value={formData.salary}
                  onChange={(e) => handleChange("salary", e.target.value)}
                  placeholder="50000"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hireDate" className="text-gray-300">Hire Date</Label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <Input
                id="hireDate"
                type="date"
                value={formData.hireDate}
                onChange={(e) => handleChange("hireDate", e.target.value)}
                className="bg-white/10 border-white/20 text-white pl-10"
                required
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
              Add Employee
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}