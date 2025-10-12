import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminPanel from './components/admin/AdminPanel';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { initializeDatabase } from './firebase/services';

function App() {
  useEffect(() => {
    // Initialize Firebase database with default data if empty
    initializeDatabase();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
        
        {/* Main Portfolio */}
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <Projects />
            <Skills />
            <Experience />
            <Education />
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
