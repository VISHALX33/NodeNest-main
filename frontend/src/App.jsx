import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import SubjectsPage from './pages/SubjectsPage';
import NotesPage from './pages/NotesPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatPage from './pages/ChatPage';
import MyPDFsPage from './pages/MyPDFsPage';
import PrivateRoute from './components/PrivateRoute';
import MyTasks from './pages/MyTasks';
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
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Page */}
        <Route path="/" element={<AuthPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout><Dashboard /></Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/semesters/:semesterId"
          element={
            <PrivateRoute>
              <Layout><SubjectsPage /></Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/subjects/:subjectId"
          element={
            <PrivateRoute>
              <Layout><NotesPage /></Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Layout><ProfilePage /></Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Layout><ChatPage /></Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/mypdf"
          element={
            <PrivateRoute>
              <Layout><MyPDFsPage /></Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks"
          element={<PrivateRoute>
            <Layout><MyTasks /></Layout>
          </PrivateRoute>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
