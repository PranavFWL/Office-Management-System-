import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Clock, Calendar, User } from "lucide-react";
import { Employee } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface MarkAttendanceFormProps {
  onSuccess?: () => void;
}

export function MarkAttendanceForm({ onSuccess }: MarkAttendanceFormProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    date: new Date().toISOString().split('T')[0],
    checkIn: "",
    checkOut: "",
    status: "present",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch employees when the form opens
    if (isOpen) {
      fetchEmployees();
    }
  }, [isOpen]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/employees");
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast({
        title: "Error",
        description: "Failed to load employees.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const totalHours = calculateTotalHours(formData.checkIn, formData.checkOut);
      const overtime = calculateOvertime(totalHours);
      
      const payload = {
        employeeId: parseInt(formData.employeeId),
        date: new Date(formData.date),
        checkIn: formData.checkIn || null,
        checkOut: formData.checkOut || null,
        totalHours: totalHours || null,
        status: formData.status,
        overtime: overtime || null,
        notes: formData.notes || null
      };
      
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to mark attendance");
      }
      
      const employeeName = employees.find(emp => emp.id === parseInt(formData.employeeId))?.name || "Employee";
      
      toast({
        title: "Attendance Marked",
        description: `Attendance for ${employeeName} has been successfully recorded.`,
      });
      
      setIsOpen(false);
      resetForm();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to mark attendance",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      employeeId: "",
      date: new Date().toISOString().split('T')[0],
      checkIn: "",
      checkOut: "",
      status: "present",
      notes: ""
    });
  };

  const calculateTotalHours = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return null;
    
    const start = new Date(`2024-01-01 ${checkIn}`);
    const end = new Date(`2024-01-01 ${checkOut}`);
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const calculateOvertime = (totalHours: string | null) => {
    if (!totalHours) return null;
    
    const hours = parseInt(totalHours.split('h')[0]);
    const standardHours = 8;
    
    if (hours > standardHours) {
      const overtime = hours - standardHours;
      return `${overtime}h 00m`;
    }
    
    return "0h 00m";
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Mark Attendance
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Mark Attendance</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="employee" className="text-gray-300">Employee</Label>
            <Select value={formData.employeeId} onValueChange={(value) => handleChange("employeeId", value)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id.toString()}>
                    {employee.name} - {employee.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-gray-300">Date</Label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="bg-white/10 border-white/20 text-white pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-gray-300">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="half-day">Half Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.status !== "absent" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="checkIn" className="text-gray-300">Check In Time</Label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <Input
                    id="checkIn"
                    type="time"
                    value={formData.checkIn}
                    onChange={(e) => handleChange("checkIn", e.target.value)}
                    className="bg-white/10 border-white/20 text-white pl-10"
                    required={formData.status !== "absent"}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="checkOut" className="text-gray-300">Check Out Time</Label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <Input
                    id="checkOut"
                    type="time"
                    value={formData.checkOut}
                    onChange={(e) => handleChange("checkOut", e.target.value)}
                    className="bg-white/10 border-white/20 text-white pl-10"
                  />
                </div>
              </div>
            </div>
          )}

          {formData.checkIn && formData.checkOut && (
            <div className="glass-card rounded-lg p-4 border border-white/10">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Hours:</span>
                <span className="text-white font-medium">
                  {calculateTotalHours(formData.checkIn, formData.checkOut)}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-400">Overtime:</span>
                <span className="text-orange-300 font-medium">
                  {calculateOvertime(calculateTotalHours(formData.checkIn, formData.checkOut))}
                </span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-gray-300">Notes (Optional)</Label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Any additional notes"
              className="bg-white/10 border-white/20 text-white"
            />
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
              {isSubmitting ? "Submitting..." : "Mark Attendance"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}