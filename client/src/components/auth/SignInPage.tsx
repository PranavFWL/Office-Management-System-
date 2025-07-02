import { SignIn } from "@clerk/clerk-react";
import { useLocation } from "wouter";

export default function SignInPage() {
  const [location] = useLocation();
  
  console.log("🔍 SignInPage rendered");
  console.log("📍 Current location from wouter:", location);
  console.log("🌐 Window location:", window.location.href);
  console.log("📍 Window pathname:", window.location.pathname);
  console.log("🔗 Window search:", window.location.search);
  
  // Handle various SSO callback path variations
  let clerkPath = "/sign-in";
  if (location.includes("/sso-callback/sso-callback")) {
    clerkPath = "/sign-in/sso-callback/sso-callback";
    console.log("🎯 Using double SSO callback path:", clerkPath);
  } else if (location.includes("/sso-callback")) {
    clerkPath = "/sign-in/sso-callback";
    console.log("🎯 Using single SSO callback path:", clerkPath);
  } else {
    console.log("🎯 Using regular sign-in path:", clerkPath);
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <SignIn 
          path={clerkPath}
          routing="path"
          signUpUrl="/sign-up"
          afterSignInUrl="/"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg"
            }
          }}
        />
      </div>
    </div>
  );
}