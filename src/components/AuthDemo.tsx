"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";

type AuthView = "demo" | "login" | "register";

export function AuthDemo() {
  const [currentView, setCurrentView] = useState<AuthView>("demo");

  if (currentView === "login") {
    return (
      <div>
        {/* Back to demo button */}
        <div className="absolute top-4 left-4 z-50">
          <Button
            onClick={() => setCurrentView("demo")}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm"
          >
            ← Back to Demo
          </Button>
        </div>
        <LoginPage />
      </div>
    );
  }

  if (currentView === "register") {
    return (
      <div>
        {/* Back to demo button */}
        <div className="absolute top-4 left-4 z-50">
          <Button
            onClick={() => setCurrentView("demo")}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm"
          >
            ← Back to Demo
          </Button>
        </div>
        <RegisterPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-8">
        <div>
          <h1 className="text-3xl lg:text-4xl text-gray-800 mb-4">
            Texas Chicken Authentication Pages
          </h1>
          <p className="text-gray-600 text-lg">
            Choose which authentication page you'd like to preview
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-lg shadow-md space-y-4">
            <h3 className="text-xl text-gray-800">Login Page</h3>
            <p className="text-gray-600">
              Split-screen layout with social login options, email/password fields, and brand styling
            </p>
            <Button
              onClick={() => setCurrentView("login")}
              className="w-full bg-[#D42323] hover:bg-[#B91C1C] text-white"
            >
              View Login Page
            </Button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md space-y-4">
            <h3 className="text-xl text-gray-800">Registration Page</h3>
            <p className="text-gray-600">
              Consistent design with comprehensive form fields, terms acceptance, and validation
            </p>
            <Button
              onClick={() => setCurrentView("register")}
              className="w-full bg-[#FFC72C] hover:bg-[#E6B329] text-black"
            >
              View Registration Page
            </Button>
          </div>
        </div>

        <div className="pt-4">
          <p className="text-sm text-gray-500">
            Both pages feature responsive design that adapts to mobile and desktop screens
          </p>
        </div>
      </div>
    </div>
  );
}