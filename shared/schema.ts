import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").notNull().default("planning"), // planning, in-progress, completed, on-hold, delayed
  client: text("client").notNull(),
  progress: integer("progress").default(0),
  budget: decimal("budget", { precision: 10, scale: 2 }),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull().default("todo"), // todo, in-progress, done
  priority: text("priority").notNull().default("medium"), // low, medium, high
  projectId: integer("project_id").references(() => projects.id),
  assigneeId: integer("assignee_id").references(() => employees.id),
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull(),
  department: text("department").notNull(),
  avatar: text("avatar"),
  phone: text("phone"),
  hireDate: timestamp("hire_date"),
  salary: decimal("salary", { precision: 10, scale: 2 }),
  isActive: boolean("is_active").default(true),
});

export const finances = pgTable("finances", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // income, expense
  category: text("category").notNull(),
  description: text("description").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// New attendance table
export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").notNull().references(() => employees.id),
  date: timestamp("date").notNull(),
  checkIn: text("check_in"),
  checkOut: text("check_out"),
  totalHours: text("total_hours"),
  status: text("status").notNull().default("present"), // present, late, absent, half-day
  overtime: text("overtime"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Helper for date parsing
const dateParser = (val: unknown): Date | null => {
  if (val === null || val === undefined || val === "") return null;
  if (val instanceof Date) return val;
  if (typeof val === "string") {
    const date = new Date(val);
    if (!isNaN(date.getTime())) return date;
  }
  throw new Error("Invalid date format");
};

// Improved required date parser with better error handling
const requiredDateParser = (val: unknown): Date => {
  if (val === null || val === undefined || val === "") {
    throw new Error("Date is required");
  }
  
  if (val instanceof Date) {
    if (isNaN(val.getTime())) {
      throw new Error("Invalid date object");
    }
    return val;
  }
  
  if (typeof val === "string") {
    const date = new Date(val);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date string: ${val}`);
    }
    return date;
  }
  
  throw new Error(`Invalid date format: ${typeof val}`);
};

// Helper for amount parsing
const amountParser = (val: unknown): string => {
  if (val === null || val === undefined || val === "") {
    throw new Error("Amount is required");
  }
  
  // If it's already a string, validate it's a number
  if (typeof val === "string") {
    if (isNaN(parseFloat(val))) {
      throw new Error("Amount must be a valid number");
    }
    return val;
  }
  
  // If it's a number, convert to string
  if (typeof val === "number") {
    return val.toString();
  }
  
  throw new Error(`Invalid amount format: ${typeof val}`);
};

// Insert schemas with proper date handling
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true, createdAt: true }).extend({
  startDate: z.union([z.string(), z.date(), z.null()]).optional().nullable().transform(dateParser),
  endDate: z.union([z.string(), z.date(), z.null()]).optional().nullable().transform(dateParser),
  budget: z.union([z.string(), z.number(), z.null()]).optional().nullable().transform(val => {
    if (val === null || val === undefined || val === "") return null;
    return typeof val === "number" ? val.toString() : val;
  }),
});
export const insertTaskSchema = createInsertSchema(tasks).omit({ id: true, createdAt: true }).extend({
  dueDate: z.union([z.string(), z.date(), z.null()]).optional().nullable().transform(dateParser),
});
export const insertEmployeeSchema = createInsertSchema(employees).omit({ id: true }).extend({
  hireDate: z.union([z.string(), z.date(), z.null()]).optional().nullable().transform(dateParser),
  salary: z.union([z.string(), z.number(), z.null()]).optional().nullable().transform(val => {
    if (val === null || val === undefined || val === "") return null;
    return typeof val === "number" ? val.toString() : val;
  }),
});
export const insertFinanceSchema = createInsertSchema(finances).omit({ id: true, createdAt: true }).extend({
  date: z.union([z.string(), z.date()]).transform(requiredDateParser),
  amount: z.union([z.string(), z.number()]).transform(amountParser),
});
// Add attendance schema
export const insertAttendanceSchema = createInsertSchema(attendance).omit({ id: true, createdAt: true }).extend({
  date: z.union([z.string(), z.date()]).transform(requiredDateParser),
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;

export type Employee = typeof employees.$inferSelect;
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;

export type Finance = typeof finances.$inferSelect;
export type InsertFinance = z.infer<typeof insertFinanceSchema>;

export type Attendance = typeof attendance.$inferSelect;
export type InsertAttendance = z.infer<typeof insertAttendanceSchema>;
