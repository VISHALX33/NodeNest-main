// import { useEffect } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AuthPage from "./components/AuthPage";
// import Dashboard from "./components/Dashboard";
// import SubjectsPage from "./components/SubjectsPage";
// import NotesPage from "./components/NotesPage";
// import ProfilePage from "./components/ProfilePage";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import ChatPage from "./components/ChatPage";
// import MyPDFsPage from "./components/MyPDFsPage";
// import PrivateRoute from "./components/PrivateRoute";
// import MyTasks from "./components/MyTasks";
// import Team from "./components/Team";
// import HowItWorks from "./components/HowItWorks";
// import Soon from "./components/Notifications";
// import VerifyEmail from "./components/VerifyEmail";
// import Chatbot from "./components/chatbot";
// import EasyProjects from "./components/EasyProjects";
// import MediumProjects from "./components/MediumProjects";
// import HardProjects from "./components/HardProjects";
// import MyBookings from "./components/MyBookings";
// import ContactUs from "./components/ContactUs";
// import ProjectService from "./components/projectService";
// import ForgotPassword from "./components/ForgotPassword";
// import ResetPassword from "./components/ResetPassword";
// import InstallButton from "./components/InstallButton";
// import TermsAndConditions from "./components/TermsAndConditions.jsx";
// import About from "./components/About";
// import CareerForm from "./components/CareerForm.jsx";

// function Layout({ children }) {
//   return (
//     <>
//       <Navbar />
//       <div className="min-h-[85vh]">{children}</div>
//       <Footer />
//     </>
//   );
// }

// function App() {
//   useEffect(() => {
//     if (window.Telegram?.WebApp) {
//       const tg = window.Telegram.WebApp;

//       tg.ready(); // tells Telegram your app is ready
//       tg.expand(); // expand to full screen

//       console.log("User data:", tg.initDataUnsafe?.user);

//       // Example main button
//       tg.MainButton.setText("Confirm");
//       tg.MainButton.onClick(() => {
//         alert("Main button clicked!");
//       });
//       tg.MainButton.show();
//     }
//   }, []);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<AuthPage />} />

//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Layout>
//                 <Dashboard />
//               </Layout>
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/semesters/:semesterId"
//           element={
//             <PrivateRoute>
//               <Layout>
//                 <SubjectsPage />
//               </Layout>
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/subjects/:subjectId"
//           element={
//             <PrivateRoute>
//               <Layout>
//                 <NotesPage />
//               </Layout>
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/profile"
//           element={
//             <PrivateRoute>
//               <Layout>
//                 <ProfilePage />
//               </Layout>
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/contact"
//           element={
//             <PrivateRoute>
//               <Layout>
//                 <ContactUs />
//               </Layout>
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/about-home"
//           element={
//             <Layout>
//               <About />
//             </Layout>}
//         />
//         <Route 
//           path="/careers" 
//           element={<Layout><CareerForm /></Layout>} />





//         <Route
//           path="/chat"
//           element={
//             <PrivateRoute>
//               <Layout>
//                 <ChatPage />
//               </Layout>
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/chatbot"
//           element={
//             <PrivateRoute>
//               <Layout>
//                 <Chatbot />
//               </Layout>
//             </PrivateRoute>
//           }
//         />


//         <Route
//           path="/how-it-works"
//           element={
//             <PrivateRoute>
//               <Layout>
//                 <HowItWorks />
//               </Layout>
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/easy-projects"
//           element={
//             <PrivateRoute>
//               <Layout>
//                 <EasyProjects />
//               </Layout>
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/medium-projects"
//           element={
//             <PrivateRoute>
//               <Layout>
//                 <MediumProjects />
//               </Layout>
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/hard-projects"
//           element={
//             <PrivateRoute>
//               <Layout>
//                 <HardProjects />
//               </Layout>
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/my-bookings"
//           element={
//             <PrivateRoute>
//               <Layout>
//                 <MyBookings />
//               </Layout>
//             </PrivateRoute>
//           }
//         />


//         <Route
//           path="/mypdf"
//           element={
//             <PrivateRoute>
//               <Layout>
//                 <MyPDFsPage />
//               </Layout>
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/soon"
//           element={
//             <PrivateRoute>
//               <Layout>
//                 <Soon />
//               </Layout>
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/project-services"
//           element={
//             <PrivateRoute>
//               <Layout>
//                 <ProjectService />
//               </Layout>
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/tasks"
//           element={
//             <PrivateRoute>
//               <Layout>
//                 <MyTasks />
//               </Layout>
//             </PrivateRoute>
//           }
//         />

//         <Route path="/verify-email" element={<VerifyEmail />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />

//         <Route
//           path="/install"
//           element={
//             <Layout>
//               <InstallButton />
//             </Layout>
//           }
//         />
//         <Route path="/terms" element={<TermsAndConditions />} />

//         <Route
//           path="/team"
//           element={
//             <PrivateRoute>
//               <Layout>
//                 <Team />
//               </Layout>
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import React from "react";

export default function App() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2rem", color: "#333" }}>
        ⚠️ Site Temporarily Down
      </h1>

      <p style={{ fontSize: "1.2rem", color: "#555", marginTop: "10px" }}>
        Our service is currently facing a technical issue.
      </p>

      <p style={{ fontSize: "1.2rem", color: "#555" }}>
        We’ll be back online in <strong>5–6 hours</strong>.  
      </p>

      <p style={{ fontSize: "1rem", marginTop: "20px", color: "#777" }}>
        Thank you for your patience! 🙏
      </p>
    </div>
  );
}
