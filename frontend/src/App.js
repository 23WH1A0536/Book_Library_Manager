import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import ReadingList from "./pages/ReadingList";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      
      {/* Navbar only after login */}
      {localStorage.getItem("token") && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={
          <ProtectedRoute>
            <Books />
          </ProtectedRoute>
        } />

        <Route path="/reading-list" element={
          <ProtectedRoute>
            <ReadingList />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}


export default App;