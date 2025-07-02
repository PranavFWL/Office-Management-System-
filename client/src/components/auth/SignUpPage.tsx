import { SignUp } from "@clerk/clerk-react";
import { useLocation } from "wouter";

export default function SignUpPage() {
  const [location] = useLocation();
  
  console.log("🔍 SignUpPage rendered");
  console.log("📍 Current location from wouter:", location);
  console.log("🌐 Window location:", window.location.href);
  console.log("📍 Window pathname:", window.location.pathname);
  
  // Handle sign-up continue path
  let clerkPath = "/sign-up";
  if (location.includes("/continue")) {
    clerkPath = "/sign-up/continue";
    console.log("🎯 Using sign-up continue path:", clerkPath);
  } else {
    console.log("🎯 Using regular sign-up path:", clerkPath);
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <SignUp 
          path={clerkPath}
          routing="path" 
          signInUrl="/sign-in"
          afterSignUpUrl="/"
        />
      </div>
    </div>
  );
}