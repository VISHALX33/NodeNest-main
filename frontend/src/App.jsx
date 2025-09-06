import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import SubjectsPage from "./pages/SubjectsPage";
import NotesPage from "./pages/NotesPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatPage from "./pages/ChatPage";
import MyPDFsPage from "./pages/MyPDFsPage";
import PrivateRoute from "./components/PrivateRoute";
import MyTasks from "./pages/MyTasks";
import Team from "./pages/Team";
<<<<<<< HEAD
import HowItWorks from './pages/HowItWorks';
import Soon from './pages/Soon';
import VerifyEmail from './pages/VerifyEmail';
=======
import HowItWorks from "./pages/HowItWorks";
>>>>>>> 42cf915a0e3c7fcc3729cd338651fc7c6700c0e9

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
              <Layout><Soon /></Layout>
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

<<<<<<< HEAD
        <Route path="/verify-email" element={<VerifyEmail />} />
        
=======
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
>>>>>>> 42cf915a0e3c7fcc3729cd338651fc7c6700c0e9
      </Routes>
    </BrowserRouter>
  );
}

export default App;
