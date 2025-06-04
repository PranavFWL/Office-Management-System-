import { Layout } from "@/components/Layout";
import { Users, Plus, Search, Mail, Phone } from "lucide-react";
import { dummyEmployees } from "@/lib/dummyData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewEmployeeForm } from "@/components/forms/NewEmployeeForm";
import { useToast } from "@/hooks/use-toast";

export default function Employees() {
  const { toast } = useToast();

  const handleNewEmployee = (data: any) => {
    console.log("New employee:", data);
    toast({
      title: "Employee Added",
      description: `${data.name} has been successfully added to the team.`,
    });
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
          {dummyEmployees.map((employee) => (
            <div key={employee.id} className="glass-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">{employee.avatar}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{employee.name}</h3>
                  <p className="text-sm text-gray-600">{employee.role}</p>
                  <p className="text-xs text-gray-500">{employee.department}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${employee.isActive ? 'bg-green-400' : 'bg-gray-400'}`}></div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{employee.email}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{employee.phone}</span>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Hire Date</span>
                    <span className="font-medium text-gray-800">
                      {employee.hireDate ? new Date(employee.hireDate).toLocaleDateString() : 'Not set'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">Salary</span>
                    <span className="font-medium text-gray-800">${employee.salary}</span>
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
                <p className="text-gray-600 text-sm font-medium">Total Employees</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{dummyEmployees.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Departments</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {new Set(dummyEmployees.map(emp => emp.department)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Employees</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {dummyEmployees.filter(emp => emp.isActive).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
