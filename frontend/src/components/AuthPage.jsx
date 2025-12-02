// frontend/src/pages/AuthPage.jsx
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="">
      <div className="">
        
        {/* Form side */}
        <div className="">
          {isLogin ? (
            <LoginForm switchToSignUp={() => setIsLogin(false)} />
          ) : (
            <RegisterForm switchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
}
