// import { useState } from 'react';
// import LoginForm from '../components/LoginForm';
// import RegisterForm from '../components/RegisterForm';

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-emerald-200">
//         <h1 className="text-3xl font-bold text-center text-emerald-700">
//           {isLogin ? 'Login to Your Account' : 'Create a New Account'}
//         </h1>

//         {isLogin ? <LoginForm /> : <RegisterForm />}

//         <p className="text-center text-sm text-gray-700">
//           {isLogin ? "Don't have an account?" : 'Already registered?'}{' '}
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-emerald-600 hover:underline font-medium transition-colors"
//           >
//             {isLogin ? 'Register here' : 'Login here'}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import NoteNestLogo from "/NoteNestLogo.png";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-emerald-200 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left section (only visible on md+) */}
        {/* <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-emerald-100 p-10">
          <img
            src={NoteNestLogo}
            alt="NoteNest Logo"
            className="w-40 md:w-56 mb-6"
          />
          <h2 className="text-2xl font-bold text-emerald-800 text-center">
            Welcome to <span className="text-emerald-900">NoteNest</span>
          </h2>
          <p className="mt-4 text-emerald-700 text-center max-w-sm">
            Your one-stop platform for notes, tasks, collaboration, and services.
          </p>
        </div> */}

        {/* Right section: auth form */}
        <div className="flex-1 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-center text-emerald-700 mb-6">
            {isLogin ? "Login to Your Account" : "Create a New Account"}
          </h1>

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
