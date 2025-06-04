import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Clock, Calendar, User } from "lucide-react";
import { dummyEmployees } from "@/lib/dummyData";

interface MarkAttendanceFormProps {
  onSubmit?: (data: any) => void;
}

export function MarkAttendanceForm({ onSubmit }: MarkAttendanceFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    date: new Date().toISOString().split('T')[0],
    checkIn: "",
    checkOut: "",
    status: "present",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      const totalHours = calculateTotalHours(formData.checkIn, formData.checkOut);
      const overtime = calculateOvertime(totalHours);
      
      onSubmit({
        ...formData,
        totalHours: totalHours || "-",
        overtime: overtime || "-"
      });
    }
    setIsOpen(false);
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
                {dummyEmployees.map((employee) => (
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
              Mark Attendance
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}