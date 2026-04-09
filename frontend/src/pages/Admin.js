import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Admin() {
  const [books, setBooks] = useState([]);
  const [mode, setMode] = useState("view");
  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    description: ""
  });

  const fetchBooks = async () => {
    const res = await API.get("/books");
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ADD BOOK
  const handleAdd = async () => {
    await API.post("/books", form);
    alert("Book added!");
    setForm({ title: "", author: "", genre: "", description: "" });
    fetchBooks();
    setMode("view");
  };

  // DELETE BOOK
  const handleDelete = async (id) => {
    await API.delete(`/books/${id}`);
    alert("Deleted!");
    fetchBooks();
  };

  // EDIT CLICK
  const startEdit = (book) => {
    setMode("edit");
    setSelectedId(book._id);
    setForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description
    });
  };

  // UPDATE BOOK
  const handleUpdate = async () => {
    await API.put(`/books/${selectedId}`, form);
    alert("Updated!");
    setMode("view");
    setSelectedId(null);
    fetchBooks();
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
        
        <h2 className="text-3xl font-bold mb-6">⚙️ Admin Dashboard</h2>

        {/* NAV BUTTONS */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode("view")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            View Books
          </button>

          <button
            onClick={() => {
              setMode("add");
              setForm({ title: "", author: "", genre: "", description: "" });
            }}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Add Book
          </button>
        </div>

        {/* VIEW BOOKS */}
        {mode === "view" && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((b) => (
              <div
                key={b._id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-lg">{b.title}</h3>
                  <p className="text-gray-500 mb-2">{b.author}</p>

                  {/* ✅ FIXED GENRE BADGE */}
                  {b.genre && (
                    <span className="inline-block text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium whitespace-nowrap">
                      {b.genre}
                    </span>
                  )}
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => startEdit(b)}
                    className="flex-1 bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(b._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ADD / EDIT FORM */}
        {(mode === "add" || mode === "edit") && (
          <div className="bg-white p-6 rounded-xl shadow-md max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {mode === "add" ? "Add Book" : "Edit Book"}
            </h3>

            <input
              placeholder="Title"
              className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <input
              placeholder="Author"
              className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.author}
              onChange={(e) =>
                setForm({ ...form, author: e.target.value })
              }
            />

            <input
              placeholder="Genre"
              className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.genre}
              onChange={(e) =>
                setForm({ ...form, genre: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <button
              onClick={mode === "add" ? handleAdd : handleUpdate}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              {mode === "add" ? "Add Book" : "Update Book"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}