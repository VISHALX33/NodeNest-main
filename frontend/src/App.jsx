import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import SubjectsPage from './pages/SubjectsPage';
import NotesPage from './pages/NotesPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatPage from './pages/ChatPage';
// import MyPDFsPage from './pages/MyPDFsPage';

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
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={<Layout><Dashboard /></Layout>}
        />
        <Route
          path="/semesters/:semesterId"
          element={<Layout><SubjectsPage /></Layout>}
        />
        <Route
          path="/subjects/:subjectId"
          element={<Layout><NotesPage /></Layout>}
        />
        <Route
          path="/profile"
          element={<Layout><ProfilePage /></Layout>}
        />
        <Route
          path="/chat"
          element={<Layout><ChatPage /></Layout>}
        />
{/* 
        <Route
          path="/mypdfs"
          element={<Layout><MyPDFsPage /></Layout>}
        /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
