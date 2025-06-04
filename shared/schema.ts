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

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true, createdAt: true });
export const insertTaskSchema = createInsertSchema(tasks).omit({ id: true, createdAt: true });
export const insertEmployeeSchema = createInsertSchema(employees).omit({ id: true });
export const insertFinanceSchema = createInsertSchema(finances).omit({ id: true, createdAt: true });

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
