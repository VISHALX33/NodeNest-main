import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import SubjectsPage from "./components/SubjectsPage";
import NotesPage from "./components/NotesPage";
import ProfilePage from "./components/ProfilePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatPage from "./components/ChatPage";
import MyPDFsPage from "./components/MyPDFsPage";
import PrivateRoute from "./components/PrivateRoute";
import MyTasks from "./components/MyTasks";
import Team from "./components/Team";
import HowItWorks from "./components/HowItWorks";
import Soon from "./components/Notifications";
import VerifyEmail from "./components/VerifyEmail";
import Chatbot from "./components/chatbot";
import EasyProjects from "./components/EasyProjects";
import MediumProjects from "./components/MediumProjects";
import HardProjects from "./components/HardProjects";
import MyBookings from "./components/MyBookings";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import ProjectService from "./components/projectService";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import InstallButton from "./components/InstallButton";
import TermsAndConditions from "./components/TermsAndConditions.jsx";

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
                <Chatbot />
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
          path="/install"
          element={
            <Layout>
              <InstallButton />
            </Layout>
          }
        />
        <Route path="/terms" element={<TermsAndConditions />} />

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
