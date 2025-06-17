import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, DollarSign, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewTransactionFormProps {
  onSuccess?: () => void;
}

export function NewTransactionForm({ onSuccess }: NewTransactionFormProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    type: "income",
    category: "",
    description: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    status: "pending"
  });

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.category) {
      errors.category = "Category is required";
    }
    
    if (!formData.description) {
      errors.description = "Description is required";
    }
    
    if (!formData.amount) {
      errors.amount = "Amount is required";
    } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      errors.amount = "Amount must be a positive number";
    }
    
    if (!formData.date) {
      errors.date = "Date is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format date for API
      // Create a date object with the correct timezone handling
      const dateObj = new Date(formData.date);
      // Adjust for timezone to get consistent date
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth();
      const day = dateObj.getDate();
      const formattedDate = new Date(Date.UTC(year, month, day, 12, 0, 0)).toISOString();
      
      // Prepare payload with proper types
      const payload = {
        type: formData.type,
        category: formData.category,
        description: formData.description.trim(),
        amount: parseFloat(formData.amount),
        date: formattedDate,
        status: formData.status
      };
      
      console.log("Sending transaction payload:", payload);
      
      // Send data to API
      const response = await fetch("/api/finances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Transaction creation error:", errorData);
        throw new Error(errorData.message || "Failed to create transaction");
      }
      
      const transaction = await response.json();
      
      toast({
        title: "Transaction Added",
        description: `${formData.type === "income" ? "Income" : "Expense"} of $${formData.amount} has been recorded.`,
      });
      
      setIsOpen(false);
      resetForm();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create transaction",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      type: "income",
      category: "",
      description: "",
      amount: "",
      date: new Date().toISOString().split('T')[0],
      status: "pending"
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
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        resetForm();
      }
    }}>
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
              <Select 
                value={formData.type} 
                onValueChange={(value) => {
                  handleChange("type", value);
                  // Reset category when type changes
                  handleChange("category", "");
                }}
                disabled={isSubmitting}
              >
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
              <Label htmlFor="category" className={`text-gray-300 ${formErrors.category ? 'text-red-400' : ''}`}>
                Category {formErrors.category && <span className="text-red-400">*</span>}
              </Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleChange("category", value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className={`bg-white/10 border-white/20 text-white ${formErrors.category ? 'border-red-500' : ''}`}>
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
              {formErrors.category && <p className="text-red-400 text-xs mt-1">{formErrors.category}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className={`text-gray-300 ${formErrors.description ? 'text-red-400' : ''}`}>
              Description {formErrors.description && <span className="text-red-400">*</span>}
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Transaction description"
              className={`bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[80px] ${formErrors.description ? 'border-red-500' : ''}`}
              rows={3}
              disabled={isSubmitting}
            />
            {formErrors.description && <p className="text-red-400 text-xs mt-1">{formErrors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className={`text-gray-300 ${formErrors.amount ? 'text-red-400' : ''}`}>
                Amount {formErrors.amount && <span className="text-red-400">*</span>}
              </Label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={formData.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                  placeholder="0.00"
                  className={`bg-white/10 border-white/20 text-white placeholder-gray-400 pl-10 ${formErrors.amount ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
              </div>
              {formErrors.amount && <p className="text-red-400 text-xs mt-1">{formErrors.amount}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className={`text-gray-300 ${formErrors.date ? 'text-red-400' : ''}`}>
                Date {formErrors.date && <span className="text-red-400">*</span>}
              </Label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className={`bg-white/10 border-white/20 text-white pl-10 ${formErrors.date ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
              </div>
              {formErrors.date && <p className="text-red-400 text-xs mt-1">{formErrors.date}</p>}
            </div>
          </div>

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
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Transaction"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}