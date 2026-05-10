import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage    from "./pages/LandingPage";
import RegisterPage   from "./pages/RegisterPage";
import LoginPage      from "./pages/LoginPage";
import Dashboard      from "./pages/Dashboard";
import PredictionForm from "./pages/PredictionForm";
<<<<<<< HEAD
import HistoryPage    from "./pages/HistoryPage";
import VitalsTracker  from "./pages/VitalsTracker";
import WearableSync   from "./pages/WearableSync";
import ProfilePage    from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
=======
import FitnessConnect from "./pages/FitnessConnect";

>>>>>>> ccfdfb6 (WIP: local changes before merging remote)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"         element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
<<<<<<< HEAD
        <Route path="/login"    element={<LoginPage />} />

        {/* Protected */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/predict"   element={<ProtectedRoute><PredictionForm /></ProtectedRoute>} />
        <Route path="/history"   element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
        <Route path="/vitals"    element={<ProtectedRoute><VitalsTracker /></ProtectedRoute>} />
        <Route path="/wearable"  element={<ProtectedRoute><WearableSync /></ProtectedRoute>} />
        <Route path="/profile"   element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
=======
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/predict" element={<PredictionForm />} />
        <Route path="/connect-fitness" element={<FitnessConnect />} />

>>>>>>> ccfdfb6 (WIP: local changes before merging remote)
      </Routes>
    </BrowserRouter>
  );
}

export default App;