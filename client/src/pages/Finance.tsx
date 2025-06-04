import { Layout } from "@/components/Layout";
import { StatBox } from "@/components/StatBox";
import { ChartWidget } from "@/components/ChartWidget";
import { DollarSign, TrendingUp, CreditCard, ArrowUpRight, ArrowDownRight, Plus, Filter, Search, Clock, AlertCircle } from "lucide-react";
import { dummyFinances } from "@/lib/dummyData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewTransactionForm } from "@/components/forms/NewTransactionForm";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Finance() {
  const { toast } = useToast();

  const handleNewTransaction = (data: any) => {
    console.log("New transaction:", data);
    toast({
      title: "Transaction Added",
      description: `${data.type === 'income' ? 'Income' : 'Expense'} transaction of $${parseFloat(data.amount).toLocaleString()} has been recorded.`,
    });
  };

  const receivedIncome = dummyFinances
    .filter(f => f.type === 'income' && f.status === 'received')
    .reduce((sum, f) => sum + parseFloat(f.amount), 0);

  const pendingIncome = dummyFinances
    .filter(f => f.type === 'income' && (f.status === 'pending' || f.status === 'overdue'))
    .reduce((sum, f) => sum + parseFloat(f.amount), 0);

  const totalExpectedIncome = receivedIncome + pendingIncome;

  const totalExpenses = dummyFinances
    .filter(f => f.type === 'expense')
    .reduce((sum, f) => sum + parseFloat(f.amount), 0);

  const overdueAmount = dummyFinances
    .filter(f => f.type === 'income' && f.status === 'overdue')
    .reduce((sum, f) => sum + parseFloat(f.amount), 0);

  const revenueData = [
    { category: 'Received', amount: receivedIncome, color: '#10B981' },
    { category: 'Pending', amount: pendingIncome - overdueAmount, color: '#F59E0B' },
    { category: 'Overdue', amount: overdueAmount, color: '#EF4444' },
  ];

  const monthlyData = [
    { month: 'Jan', expected: 28000, received: 28000, pending: 0 },
    { month: 'Feb', expected: 32000, received: 27500, pending: 4500 },
    { month: 'Mar', expected: 25000, received: 25000, pending: 0 },
    { month: 'Apr', expected: 38000, received: 35000, pending: 3000 },
    { month: 'May', expected: 42000, received: 40000, pending: 2000 },
    { month: 'Jun', expected: 35000, received: 27500, pending: 7500 },
  ];

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'received': return 'bg-emerald-500/20 text-emerald-300';
      case 'pending': return 'bg-orange-500/20 text-orange-300';
      case 'overdue': return 'bg-red-500/20 text-red-300';
      case 'paid': return 'bg-blue-500/20 text-blue-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <Layout 
      title="Financial Management" 
      subtitle="Track expected vs received revenue and monitor cash flow"
    >
      <div className="space-y-6">
        {/* Revenue Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatBox
            title="Expected Revenue"
            value={`$${totalExpectedIncome.toLocaleString()}`}
            change="+12.5%"
            changeType="positive"
            changeLabel="this month"
            icon={TrendingUp}
            iconColor="text-blue-400"
            iconBgColor="bg-blue-500/20"
          />
          <StatBox
            title="Received Revenue"
            value={`$${receivedIncome.toLocaleString()}`}
            change={`${((receivedIncome / totalExpectedIncome) * 100).toFixed(1)}%`}
            changeType="positive"
            changeLabel="of expected"
            icon={DollarSign}
            iconColor="text-emerald-400"
            iconBgColor="bg-emerald-500/20"
          />
          <StatBox
            title="Pending Amount"
            value={`$${(pendingIncome - overdueAmount).toLocaleString()}`}
            change={`${(((pendingIncome - overdueAmount) / totalExpectedIncome) * 100).toFixed(1)}%`}
            changeType="neutral"
            changeLabel="of expected"
            icon={Clock}
            iconColor="text-orange-400"
            iconBgColor="bg-orange-500/20"
          />
          <StatBox
            title="Overdue Amount"
            value={`$${overdueAmount.toLocaleString()}`}
            change={`${((overdueAmount / totalExpectedIncome) * 100).toFixed(1)}%`}
            changeType="negative"
            changeLabel="needs action"
            icon={AlertCircle}
            iconColor="text-red-400"
            iconBgColor="bg-red-500/20"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartWidget title="Expected vs Received Revenue">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="expected" fill="#6B7280" radius={4} name="Expected" />
                <Bar dataKey="received" fill="#10B981" radius={4} name="Received" />
                <Bar dataKey="pending" fill="#F59E0B" radius={4} name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </ChartWidget>

          <ChartWidget title="Revenue Status Breakdown">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="amount"
                  label={({ category, amount }) => `${category}: $${amount.toLocaleString()}`}
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </ChartWidget>
        </div>

        {/* Recent Transactions */}
        <div className="glass-card rounded-2xl p-6 border border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-xl font-semibold text-white">Recent Transactions</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                <Input 
                  placeholder="Search transactions..." 
                  className="pl-10 w-64 bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
              </div>
              <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:bg-white/10">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <NewTransactionForm onSubmit={handleNewTransaction} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Description</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">Type</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-300">Amount</th>
                </tr>
              </thead>
              <tbody>
                {dummyFinances.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-4 px-4 text-gray-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-white">{transaction.description}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-white/10 text-gray-300 rounded-full text-sm">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status || 'pending'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        {transaction.type === 'income' ? (
                          <ArrowUpRight className="w-4 h-4 text-emerald-400 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-400 mr-1" />
                        )}
                        <span className={`font-medium ${
                          transaction.type === 'income' ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {transaction.type}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`font-bold ${
                        transaction.type === 'income' ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}${parseFloat(transaction.amount).toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}