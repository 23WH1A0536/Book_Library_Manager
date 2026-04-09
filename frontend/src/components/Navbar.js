import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      
      {/* Logo */}
      <h1
        onClick={() => navigate("/books")}
        className="text-2xl font-bold text-green-400 cursor-pointer"
      >
        ShelfMaster
      </h1>

      {/* Navigation */}
      <div className="flex gap-6 items-center">

        {/* Normal User */}
        {user?.role !== "admin" && (
          <>
            <Link
              to="/books"
              className="hover:text-green-400 transition"
            >
              Books
            </Link>

            <Link
              to="/reading-list"
              className="hover:text-green-400 transition"
            >
              My List
            </Link>
          </>
        )}

        {/* Admin */}
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="hover:text-green-400 transition"
          >
            Admin Dashboard
          </Link>
        )}

        {/* Logout */}
        <button
          onClick={logout}
          className="bg-red-500 px-4 py-1 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}