import { 
  users, 
  projects, 
  tasks, 
  employees, 
  finances,
  type User, 
  type InsertUser,
  type Project,
  type InsertProject,
  type Task,
  type InsertTask,
  type Employee,
  type InsertEmployee,
  type Finance,
  type InsertFinance
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

export const storage = new MemStorage();
