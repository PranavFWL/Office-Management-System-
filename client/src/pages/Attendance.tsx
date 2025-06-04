import { Layout } from "@/components/Layout";
import { StatBox } from "@/components/StatBox";
import { ChartWidget } from "@/components/ChartWidget";
import { Users, Clock, CheckCircle, AlertTriangle, Calendar, Plus, Filter, Search, LogIn, LogOut } from "lucide-react";
import { dummyAttendance, dummyEmployees } from "@/lib/dummyData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState } from "react";

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState('2024-02-20');
  const [activeTab, setActiveTab] = useState<'today' | 'records'>('today');

  // Today's attendance stats
  const todayAttendance = dummyAttendance.filter(record => 
    new Date(record.date).toDateString() === new Date(selectedDate).toDateString()
  );

  const presentCount = todayAttendance.filter(record => record.status === 'present').length;
  const absentCount = todayAttendance.filter(record => record.status === 'absent').length;
  const lateCount = todayAttendance.filter(record => record.status === 'late').length;
  const halfDayCount = todayAttendance.filter(record => record.status === 'half-day').length;

  const attendanceRate = ((presentCount + lateCount + halfDayCount) / dummyEmployees.length * 100).toFixed(1);

  // Weekly attendance data
  const weeklyData = [
    { day: 'Mon', present: 15, absent: 2, late: 1 },
    { day: 'Tue', present: 16, absent: 1, late: 1 },
    { day: 'Wed', present: 14, absent: 3, late: 1 },
    { day: 'Thu', present: 17, absent: 1, late: 0 },
    { day: 'Fri', present: 13, absent: 3, late: 2 },
  ];

  // Status distribution for pie chart
  const statusData = [
    { name: 'Present', value: presentCount, color: '#10B981' },
    { name: 'Late', value: lateCount, color: '#F59E0B' },
    { name: 'Absent', value: absentCount, color: '#EF4444' },
    { name: 'Half Day', value: halfDayCount, color: '#8B5CF6' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-emerald-500/20 text-emerald-300';
      case 'late': return 'bg-orange-500/20 text-orange-300';
      case 'absent': return 'bg-red-500/20 text-red-300';
      case 'half-day': return 'bg-purple-500/20 text-purple-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'late': return <Clock className="w-4 h-4" />;
      case 'absent': return <AlertTriangle className="w-4 h-4" />;
      case 'half-day': return <Calendar className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <Layout 
      title="Attendance Management" 
      subtitle="Track employee attendance, check-in/out times, and working hours"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <Input 
                placeholder="Search employees..." 
                className="pl-10 w-64 bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
            />
            <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:bg-white/10">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          <Button className="gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Mark Attendance
          </Button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-1 bg-white/5 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'today' 
                ? 'gradient-primary text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Today's Overview
          </button>
          <button
            onClick={() => setActiveTab('records')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'records' 
                ? 'gradient-primary text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Attendance Records
          </button>
        </div>

        {activeTab === 'today' ? (
          <>
            {/* Attendance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatBox
                title="Total Present"
                value={presentCount.toString()}
                change={`${attendanceRate}%`}
                changeType="positive"
                changeLabel="attendance rate"
                icon={Users}
                iconColor="text-emerald-400"
                iconBgColor="bg-emerald-500/20"
              />
              <StatBox
                title="Late Arrivals"
                value={lateCount.toString()}
                change={`${((lateCount / dummyEmployees.length) * 100).toFixed(1)}%`}
                changeType="neutral"
                changeLabel="of total"
                icon={Clock}
                iconColor="text-orange-400"
                iconBgColor="bg-orange-500/20"
              />
              <StatBox
                title="Absent"
                value={absentCount.toString()}
                change={`${((absentCount / dummyEmployees.length) * 100).toFixed(1)}%`}
                changeType="negative"
                changeLabel="of total"
                icon={AlertTriangle}
                iconColor="text-red-400"
                iconBgColor="bg-red-500/20"
              />
              <StatBox
                title="Half Day"
                value={halfDayCount.toString()}
                change={`${((halfDayCount / dummyEmployees.length) * 100).toFixed(1)}%`}
                changeType="neutral"
                changeLabel="of total"
                icon={Calendar}
                iconColor="text-purple-400"
                iconBgColor="bg-purple-500/20"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartWidget title="Weekly Attendance Trend">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="day" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="present" fill="#10B981" radius={4} name="Present" />
                    <Bar dataKey="late" fill="#F59E0B" radius={4} name="Late" />
                    <Bar dataKey="absent" fill="#EF4444" radius={4} name="Absent" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartWidget>

              <ChartWidget title="Today's Status Distribution">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartWidget>
            </div>

            {/* Today's Attendance List */}
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6">Today's Attendance - {new Date(selectedDate).toLocaleDateString()}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {todayAttendance.map((record) => (
                  <div key={record.id} className="glass-card rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white">{record.employeeName}</h4>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 ${getStatusColor(record.status)}`}>
                        {getStatusIcon(record.status)}
                        <span>{record.status.replace('-', ' ')}</span>
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <LogIn className="w-3 h-3" />
                          <span>Check In:</span>
                        </div>
                        <span className="text-white">{record.checkIn}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <LogOut className="w-3 h-3" />
                          <span>Check Out:</span>
                        </div>
                        <span className="text-white">{record.checkOut}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>Total Hours:</span>
                        </div>
                        <span className="text-white font-medium">{record.totalHours}</span>
                      </div>
                      
                      {record.overtime !== '-' && (
                        <div className="flex items-center justify-between">
                          <span>Overtime:</span>
                          <span className="text-orange-300 font-medium">{record.overtime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Attendance Records Table */
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h3 className="text-xl font-semibold text-white">Attendance Records</h3>
              <Button className="gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Employee</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Check In</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Check Out</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Total Hours</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Overtime</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyAttendance.map((record) => (
                    <tr key={record.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-4 px-4">
                        <div className="font-medium text-white">{record.employeeName}</div>
                      </td>
                      <td className="py-4 px-4 text-gray-400">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-white">{record.checkIn}</td>
                      <td className="py-4 px-4 text-white">{record.checkOut}</td>
                      <td className="py-4 px-4 text-white font-medium">{record.totalHours}</td>
                      <td className="py-4 px-4">
                        <span className={record.overtime !== '-' ? 'text-orange-300' : 'text-gray-400'}>
                          {record.overtime}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 w-fit ${getStatusColor(record.status)}`}>
                          {getStatusIcon(record.status)}
                          <span>{record.status.replace('-', ' ')}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}