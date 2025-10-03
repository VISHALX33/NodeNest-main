
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import NoteNestLogo from "/NoteNestLogo.png";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="">
      <div>
        
   
        {/* Right section: auth form */}
        <div className="">
        

          {isLogin ? <LoginForm /> : <RegisterForm />}

          <p className="text-center text-sm text-gray-700 mt-6">
            {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-600 hover:underline font-medium transition-colors"
            >
              {isLogin ? "Register here" : "Login here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
 