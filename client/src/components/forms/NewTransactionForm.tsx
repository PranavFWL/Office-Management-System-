import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, DollarSign, Calendar } from "lucide-react";

interface NewTransactionFormProps {
  onSubmit?: (data: any) => void;
}

export function NewTransactionForm({ onSubmit }: NewTransactionFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "income",
    category: "",
    description: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    status: "pending"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    setIsOpen(false);
    setFormData({
      type: "income",
      category: "",
      description: "",
      amount: "",
      date: new Date().toISOString().split('T')[0],
      status: "pending"
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const incomeCategories = [
    "Project Payment",
    "Consulting",
    "Maintenance",
    "Support",
    "License Fee",
    "Other"
  ];

  const expenseCategories = [
    "Software License",
    "Office Supplies",
    "Salary",
    "Marketing",
    "Utilities",
    "Travel",
    "Equipment",
    "Other"
  ];

  const categories = formData.type === "income" ? incomeCategories : expenseCategories;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          New Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Add New Transaction</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-gray-300">Transaction Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-300">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Transaction description"
              className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[80px]"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-gray-300">Amount</Label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                  placeholder="0.00"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 pl-10"
                  required
                />
              </div>
            </div>

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
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-gray-300">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {formData.type === "income" ? (
                  <>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="received">Received</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
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
              Add Transaction
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}