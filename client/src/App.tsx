import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClerkProvider } from "@clerk/clerk-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import SignInPage from "@/components/auth/SignInPage";
import SignUpPage from "@/components/auth/SignUpPage";
import Dashboard from "@/pages/Dashboard";
import Projects from "@/pages/Projects";
import Tasks from "@/pages/Tasks";
import Employees from "@/pages/Employees";
import Attendance from "@/pages/Attendance";
import Finance from "@/pages/Finance";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_b3B0aW11bS1taXRlLTE5LmNsZXJrLmFjY291bnRzLmRldiQ";

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

function ProtectedDashboard() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

function ProtectedProjects() {
  return (
    <ProtectedRoute>
      <Projects />
    </ProtectedRoute>
  );
}

function ProtectedTasks() {
  return (
    <ProtectedRoute>
      <Tasks />
    </ProtectedRoute>
  );
}

function ProtectedEmployees() {
  return (
    <ProtectedRoute>
      <Employees />
    </ProtectedRoute>
  );
}

function ProtectedAttendance() {
  return (
    <ProtectedRoute>
      <Attendance />
    </ProtectedRoute>
  );
}

function ProtectedFinance() {
  return (
    <ProtectedRoute>
      <Finance />
    </ProtectedRoute>
  );
}

function ProtectedSettings() {
  return (
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  );
}

function TestPage() {
  return <div className="p-4">Test page working!</div>;
}

function SimpleSignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Simple Sign In Test</h1>
        <p>This is a simple test page</p>
        <p>Clerk Key: {clerkPubKey ? "✅ Found" : "❌ Missing"}</p>
      </div>
    </div>
  );
}

function Router() {
  console.log("🔄 Router component rendered");
  
  return (
    <Switch>
      <Route path="/sign-in" component={(props) => {
        console.log("✅ /sign-in route matched", props);
        return <SignInPage {...props} />;
      }} />
      <Route path="/sign-in/sso-callback" component={(props) => {
        console.log("✅ /sign-in/sso-callback route matched", props);
        return <SignInPage {...props} />;
      }} />
      <Route path="/sign-in/sso-callback/sso-callback" component={(props) => {
        console.log("✅ /sign-in/sso-callback/sso-callback route matched", props);
        return <SignInPage {...props} />;
      }} />
      <Route path="/sign-up" component={SignUpPage} />
      <Route path="/sign-up/continue" component={(props) => {
        console.log("✅ /sign-up/continue route matched", props);
        return <SignUpPage {...props} />;
      }} />
      <Route path="/test" component={TestPage} />
      <Route path="/dashboard-test" component={Dashboard} />
      <Route path="/" component={ProtectedDashboard} />
      <Route path="/projects" component={ProtectedProjects} />
      <Route path="/tasks" component={ProtectedTasks} />
      <Route path="/employees" component={ProtectedEmployees} />
      <Route path="/attendance" component={ProtectedAttendance} />
      <Route path="/finance" component={ProtectedFinance} />
      <Route path="/settings" component={ProtectedSettings} />
      <Route component={(props) => {
        console.log("❌ No route matched, showing NotFound", props);
        console.log("🌐 Current URL:", window.location.href);
        console.log("📍 Current pathname:", window.location.pathname);
        return <NotFound {...props} />;
      }} />
    </Switch>
  );
}

function App() {
  console.log("🚀 App component rendered");
  console.log("🔑 Clerk publishable key exists:", !!clerkPubKey);
  console.log("🌐 Current URL on App render:", window.location.href);
  
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default App;
