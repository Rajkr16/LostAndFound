import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Items from "./pages/Items";
import ItemDetails from "./pages/ItemDetails";
import ReportItem from "./pages/ReportItem";
import MyClaims from "./pages/MyClaims";
import MyReports from "./pages/MyReports";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items/:id" element={<ItemDetails />} />
          <Route path="/report" element={<ReportItem />} />
          <Route path="/my-reports"element={<ProtectedRoute><MyReports/></ProtectedRoute>}/>
          <Route path="/my-claims"element={<ProtectedRoute><MyClaims/></ProtectedRoute>}/>
          <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /></ProtectedRoute>}/>
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;