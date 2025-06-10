import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import * as schema from "@shared/schema";
import type {
  User,
  InsertUser,
  Project,
  InsertProject,
  Task,
  InsertTask,
  Employee,
  InsertEmployee,
  Finance,
  InsertFinance,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Projects
  getAllProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;

  // Tasks
  getAllTasks(): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
  getTasksByProject(projectId: number): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, task: Partial<InsertTask>): Promise<Task | undefined>;
  deleteTask(id: number): Promise<boolean>;

  // Employees
  getAllEmployees(): Promise<Employee[]>;
  getEmployee(id: number): Promise<Employee | undefined>;
  createEmployee(employee: InsertEmployee): Promise<Employee>;
  updateEmployee(id: number, employee: Partial<InsertEmployee>): Promise<Employee | undefined>;
  deleteEmployee(id: number): Promise<boolean>;

  // Finances
  getAllFinances(): Promise<Finance[]>;
  getFinance(id: number): Promise<Finance | undefined>;
  createFinance(finance: InsertFinance): Promise<Finance>;
  updateFinance(id: number, finance: Partial<InsertFinance>): Promise<Finance | undefined>;
  deleteFinance(id: number): Promise<boolean>;
}

// Neon Database Storage Implementation
export class NeonStorage implements IStorage {
  private db: NeonHttpDatabase<typeof schema>;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is required for Neon connection");
    }

    const sql = neon(process.env.DATABASE_URL!)
    this.db = drizzle(sql, { schema });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(schema.users).where(eq(schema.users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(schema.users).where(eq(schema.users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(schema.users).values(insertUser).returning();
    return result[0];
  }

  // Projects
  async getAllProjects(): Promise<Project[]> {
    return await this.db.select().from(schema.projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const result = await this.db.select().from(schema.projects).where(eq(schema.projects.id, id));
    return result[0];
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const result = await this.db.insert(schema.projects).values(insertProject).returning();
    return result[0];
  }

  async updateProject(id: number, projectUpdate: Partial<InsertProject>): Promise<Project | undefined> {
    await this.db
      .update(schema.projects)
      .set(projectUpdate)
      .where(eq(schema.projects.id, id));
    return this.getProject(id);
  }

  async deleteProject(id: number): Promise<boolean> {
    const result = await this.db.delete(schema.projects).where(eq(schema.projects.id, id));
    return result.rowCount > 0;
  }

  // Tasks
  async getAllTasks(): Promise<Task[]> {
    return await this.db.select().from(schema.tasks);
  }

  async getTask(id: number): Promise<Task | undefined> {
    const result = await this.db.select().from(schema.tasks).where(eq(schema.tasks.id, id));
    return result[0];
  }

  async getTasksByProject(projectId: number): Promise<Task[]> {
    return await this.db.select().from(schema.tasks).where(eq(schema.tasks.projectId, projectId));
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const result = await this.db.insert(schema.tasks).values(insertTask).returning();
    return result[0];
  }

  async updateTask(id: number, taskUpdate: Partial<InsertTask>): Promise<Task | undefined> {
    await this.db
      .update(schema.tasks)
      .set(taskUpdate)
      .where(eq(schema.tasks.id, id));
    return this.getTask(id);
  }

  async deleteTask(id: number): Promise<boolean> {
    const result = await this.db.delete(schema.tasks).where(eq(schema.tasks.id, id));
    return result.rowCount > 0;
  }

  // Employees
  async getAllEmployees(): Promise<Employee[]> {
    return await this.db.select().from(schema.employees);
  }

  async getEmployee(id: number): Promise<Employee | undefined> {
    const result = await this.db.select().from(schema.employees).where(eq(schema.employees.id, id));
    return result[0];
  }

  async createEmployee(insertEmployee: InsertEmployee): Promise<Employee> {
    const result = await this.db.insert(schema.employees).values(insertEmployee).returning();
    return result[0];
  }

  async updateEmployee(id: number, employeeUpdate: Partial<InsertEmployee>): Promise<Employee | undefined> {
    await this.db
      .update(schema.employees)
      .set(employeeUpdate)
      .where(eq(schema.employees.id, id));
    return this.getEmployee(id);
  }

  async deleteEmployee(id: number): Promise<boolean> {
    const result = await this.db.delete(schema.employees).where(eq(schema.employees.id, id));
    return result.rowCount > 0;
  }

  // Finances
  async getAllFinances(): Promise<Finance[]> {
    return await this.db.select().from(schema.finances);
  }

  async getFinance(id: number): Promise<Finance | undefined> {
    const result = await this.db.select().from(schema.finances).where(eq(schema.finances.id, id));
    return result[0];
  }

  async createFinance(insertFinance: InsertFinance): Promise<Finance> {
    const result = await this.db.insert(schema.finances).values(insertFinance).returning();
    return result[0];
  }

  async updateFinance(id: number, financeUpdate: Partial<InsertFinance>): Promise<Finance | undefined> {
    const result = await this.db
      .update(schema.finances)
      .set(financeUpdate)
      .where(eq(schema.finances.id, id))
      .returning();
    return result[0];
  }

  async deleteFinance(id: number): Promise<boolean> {
    const result = await this.db.delete(schema.finances).where(eq(schema.finances.id, id));
    return result.rowCount > 0;
  }
}

// Memory Storage Implementation (keep for development/testing)
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private tasks: Map<number, Task>;
  private employees: Map<number, Employee>;
  private finances: Map<number, Finance>;
  private currentId: { [key: string]: number };

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.tasks = new Map();
    this.employees = new Map();
    this.finances = new Map();
    this.currentId = {
      users: 1,
      projects: 1,
      tasks: 1,
      employees: 1,
      finances: 1,
    };
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Projects
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentId.projects++;
    const project: Project = { 
      ...insertProject, 
      id,
      createdAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, projectUpdate: Partial<InsertProject>): Promise<Project | undefined> {
    const existing = this.projects.get(id);
    if (!existing) return undefined;
    
    const updated: Project = { ...existing, ...projectUpdate };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Tasks
  async getAllTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async getTasksByProject(projectId: number): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(task => task.projectId === projectId);
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = this.currentId.tasks++;
    const task: Task = { 
      ...insertTask, 
      id,
      createdAt: new Date()
    };
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: number, taskUpdate: Partial<InsertTask>): Promise<Task | undefined> {
    const existing = this.tasks.get(id);
    if (!existing) return undefined;
    
    const updated: Task = { ...existing, ...taskUpdate };
    this.tasks.set(id, updated);
    return updated;
  }

  async deleteTask(id: number): Promise<boolean> {
    return this.tasks.delete(id);
  }

  // Employees
  async getAllEmployees(): Promise<Employee[]> {
    return Array.from(this.employees.values());
  }

  async getEmployee(id: number): Promise<Employee | undefined> {
    return this.employees.get(id);
  }

  async createEmployee(insertEmployee: InsertEmployee): Promise<Employee> {
    const id = this.currentId.employees++;
    const employee: Employee = { ...insertEmployee, id };
    this.employees.set(id, employee);
    return employee;
  }

  async updateEmployee(id: number, employeeUpdate: Partial<InsertEmployee>): Promise<Employee | undefined> {
    const existing = this.employees.get(id);
    if (!existing) return undefined;
    
    const updated: Employee = { ...existing, ...employeeUpdate };
    this.employees.set(id, updated);
    return updated;
  }

  async deleteEmployee(id: number): Promise<boolean> {
    return this.employees.delete(id);
  }

  // Finances
  async getAllFinances(): Promise<Finance[]> {
    return Array.from(this.finances.values());
  }

  async getFinance(id: number): Promise<Finance | undefined> {
    return this.finances.get(id);
  }

  async createFinance(insertFinance: InsertFinance): Promise<Finance> {
    const id = this.currentId.finances++;
    const finance: Finance = { 
      ...insertFinance, 
      id,
      createdAt: new Date()
    };
    this.finances.set(id, finance);
    return finance;
  }

  async updateFinance(id: number, financeUpdate: Partial<InsertFinance>): Promise<Finance | undefined> {
    const existing = this.finances.get(id);
    if (!existing) return undefined;
    
    const updated: Finance = { ...existing, ...financeUpdate };
    this.finances.set(id, updated);
    return updated;
  }

  async deleteFinance(id: number): Promise<boolean> {
    return this.finances.delete(id);
  }
}

// Use Neon in production, Memory storage for development
export const storage = process.env.NODE_ENV === 'production' 
  ? new NeonStorage() 
  : new MemStorage();