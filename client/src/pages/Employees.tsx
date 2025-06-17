import { Layout } from "@/components/Layout";
import { Users, Plus, Search, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewEmployeeForm } from "@/components/forms/NewEmployeeForm";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Employee } from "@shared/schema";

export default function Employees() {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees", error);
      toast({
        title: "Error",
        description: "Failed to fetch employees.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleNewEmployee = async (data: any) => {
    // Frontend validation for required fields
    if (!data.role || !data.department) {
      toast({
        title: "Validation Error",
        description: "Please select a role and department for the new employee.",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = {
        ...data,
        // Convert empty strings to null for optional fields so they are handled correctly by the database
        salary: data.salary || null,
        phone: data.phone || null,
        avatar: data.avatar || null,
        // Convert date string to a Date object for the database
        hireDate: data.hireDate ? new Date(data.hireDate) : null,
      };

      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server validation error:", errorData);
        throw new Error(`Failed to add employee: ${errorData.message}`);
      }

      toast({
        title: "Employee Added",
        description: `${data.name} has been successfully added to the team.`,
      });
      fetchEmployees(); // Refresh the list
    } catch (error) {
      console.error("Failed to add employee", error);
      toast({
        title: "Error",
        description: "Failed to add employee. Check the console for more details.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout 
      title="Employee Management" 
      subtitle="Manage your team members and their information"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <Input 
              placeholder="Search employees..." 
              className="pl-10 w-64 bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
          </div>
          <NewEmployeeForm onSubmit={handleNewEmployee} />
        </div>

        {/* Employee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <div key={employee.id} className="glass-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">{employee.avatar}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{employee.name}</h3>
                  <p className="text-sm text-gray-300">{employee.role}</p>
                  <p className="text-xs text-gray-400">{employee.department}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${employee.isActive ? 'bg-green-400' : 'bg-gray-400'}`}></div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span>{employee.email}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span>{employee.phone}</span>
                </div>
                
                <div className="pt-3 border-t border-gray-600">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Hire Date</span>
                    <span className="font-medium text-white">
                      {employee.hireDate ? new Date(employee.hireDate).toLocaleDateString() : 'Not set'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-400">Salary</span>
                    <span className="font-medium text-white">${employee.salary}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Employee Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="glass-card rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Employees</p>
                <p className="text-3xl font-bold text-white mt-2">{employees.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Departments</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {new Set(employees.map(emp => emp.department)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Active Employees</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {employees.filter(emp => emp.isActive).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
