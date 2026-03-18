import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

// Context
import { AuthContext, AuthProvider } from "./context/AuthContext";

// Auth Pages
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";


import Home from "./pages/home/Home";
import About from "./pages/home/About";
import Contact from "./pages/home/Contact";


// Designer Dashboard Pages
import DesignerDashboard from "./pages/dashboard/DesignerDashboard";
import RoomConfig from "./pages/dashboard/RoomConfig";
import View2D from "./pages/dashboard/View2D";
import View3D from "./pages/dashboard/View3D";
import Profile from "./pages/dashboard/Profile";

/* ---------------- Protected Route ---------------- */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

/* ---------------- App Routes ---------------- */
const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  
  const getDashboardRoute = (role) => {
    if (role === "designer") return "/designer-dashboard";
    return "/";
  };

  return (
    <Routes>
      
      <Route path="/" element={<Home user={user} />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      
      
      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          user ? <Navigate to={getDashboardRoute(user?.role)} /> : <Login />
        }
      />
      <Route path="/register" element={<Register />} />

      {/* Designer Dashboard & Core Features */}
      <Route
        path="/designer-dashboard"
        element={
          <ProtectedRoute allowedRoles={["designer"]}>
            <DesignerDashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/room-config"
        element={
          <ProtectedRoute allowedRoles={["designer"]}>
            <RoomConfig />
          </ProtectedRoute>
        }
      /> 

      <Route
        path="/view-2d"
        element={
          <ProtectedRoute allowedRoles={["designer"]}>
            <View2D />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/view-3d"
        element={
          <ProtectedRoute allowedRoles={["designer"]}>
            <View3D />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["designer"]}>
            <Profile />
          </ProtectedRoute>
        }
      />
      
    </Routes> 
    
  );
};

/* ---------------- Main App ---------------- */
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;