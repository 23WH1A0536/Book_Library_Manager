import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Books from "./pages/Books";
import ReadingList from "./pages/ReadingList";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/books" element={<Books />} />
        <Route path="/reading-list" element={<ReadingList />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;