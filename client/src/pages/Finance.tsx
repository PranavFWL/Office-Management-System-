import { Layout } from "@/components/Layout";
import { ChartWidget } from "@/components/ChartWidget";
import { StatBox } from "@/components/StatBox";
import { DollarSign, TrendingUp, TrendingDown, Plus, Search } from "lucide-react";
import { dummyFinances, revenueData } from "@/lib/dummyData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function Finance() {
  const totalIncome = dummyFinances
    .filter(f => f.type === 'income')
    .reduce((sum, f) => sum + parseFloat(f.amount), 0);
    
  const totalExpenses = dummyFinances
    .filter(f => f.type === 'expense')
    .reduce((sum, f) => sum + parseFloat(f.amount), 0);

  const netProfit = totalIncome - totalExpenses;

  const expenseByCategory = dummyFinances
    .filter(f => f.type === 'expense')
    .reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(expenseByCategory).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <Layout 
      title="Financial Management" 
      subtitle="Track income, expenses, and financial performance"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" />
            <Input 
              placeholder="Search transactions..." 
              className="pl-10 w-64"
            />
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </div>

        {/* Financial KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatBox
            title="Total Income"
            value={`$${totalIncome.toLocaleString()}`}
            change="+18%"
            changeType="positive"
            changeLabel="vs last month"
            icon={TrendingUp}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          
          <StatBox
            title="Total Expenses"
            value={`$${totalExpenses.toLocaleString()}`}
            change="+5%"
            changeType="negative"
            changeLabel="vs last month"
            icon={TrendingDown}
            iconColor="text-red-600"
            iconBgColor="bg-red-100"
          />
          
          <StatBox
            title="Net Profit"
            value={`$${netProfit.toLocaleString()}`}
            change="+22%"
            changeType="positive"
            changeLabel="vs last month"
            icon={DollarSign}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue vs Expenses Chart */}
          <ChartWidget title="Revenue vs Expenses">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      backdropFilter: 'blur(10px)'
                    }} 
                  />
                  <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
                  <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartWidget>

          {/* Expense Breakdown Pie Chart */}
          <ChartWidget title="Expense Breakdown">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Amount']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      backdropFilter: 'blur(10px)'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartWidget>
        </div>

        {/* Recent Transactions */}
        <div className="glass-card rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {dummyFinances.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'income' ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{transaction.description}</h4>
                    <p className="text-sm text-gray-600">{transaction.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
