import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./login/AuthPage";
import Dashboard from "./pages/Dashboard";
import SubjectsPage from "./pages/SubjectsPage";
import NotesPage from "./pages/NotesPage";
import ProfilePage from "./footer/ProfilePage";
import Navbar from "./header/Navbar";
import Footer from "./footer/Footer";
import ChatPage from "./footer/ChatPage";
import MyPDFsPage from "./pages/MyPDFsPage";
import PrivateRoute from "./components/PrivateRoute";
import MyTasks from "./header/MyTasks";
import Team from "./footer/Team";
import HowItWorks from "./header/HowItWorks";
import Soon from "./header/Notifications";
import VerifyEmail from "./login/VerifyEmail";
import Chatbot from "./pages/chatbot";
import EasyProjects from "./projects/EasyProjects";
import MediumProjects from "./projects/MediumProjects";
import HardProjects from "./projects/HardProjects";
import MyBookings from "./projects/MyBookings";
import AboutUs from "./header/AboutUs";
import ContactUs from "./header/ContactUs";
import ProjectService from "./projects/projectService";
import ForgotPassword from "./login/ForgotPassword";
import ResetPassword from "./login/ResetPassword";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="min-h-[85vh]">{children}</div>
      <Footer />
    </>
  );
}

function App() {
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      tg.ready(); // tells Telegram your app is ready
      tg.expand(); // expand to full screen

      console.log("User data:", tg.initDataUnsafe?.user);

      // Example main button
      tg.MainButton.setText("Confirm");
      tg.MainButton.onClick(() => {
        alert("Main button clicked!");
      });
      tg.MainButton.show();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/semesters/:semesterId"
          element={
            <PrivateRoute>
              <Layout>
                <SubjectsPage />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/subjects/:subjectId"
          element={
            <PrivateRoute>
              <Layout>
                <NotesPage />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Layout>
                <ProfilePage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <Layout>
                <ContactUs />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <Layout>
                <AboutUs />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Layout>
                <ChatPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <PrivateRoute>
              <Layout>
                <Chatbot/>
              </Layout>
            </PrivateRoute>
          }
        />


        <Route
          path="/how-it-works"
          element={
            <PrivateRoute>
              <Layout>
                <HowItWorks />
              </Layout>
            </PrivateRoute>
          }
        />
        
        <Route
          path="/easy-projects"
          element={
            <PrivateRoute>
              <Layout>
                <EasyProjects />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/medium-projects"
          element={
            <PrivateRoute>
              <Layout>
                <MediumProjects />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/hard-projects"
          element={
            <PrivateRoute>
              <Layout>
                <HardProjects />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <PrivateRoute>
              <Layout>
                <MyBookings />
              </Layout>
            </PrivateRoute>
          }
        />


        <Route
          path="/mypdf"
          element={
            <PrivateRoute>
              <Layout>
                <MyPDFsPage />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/soon"
          element={
            <PrivateRoute>
              <Layout>
                <Soon />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/project-services"
          element={
            <PrivateRoute>
              <Layout>
                <ProjectService /> 
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Layout>
                <MyTasks />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route path="/verify-email" element={<VerifyEmail />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/team"
          element={
            <PrivateRoute>
              <Layout>
                <Team />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
