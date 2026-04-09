import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState("All");
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async () => {
    const res = await API.get("/books");
    setBooks(res.data);
  };

  const addToList = async (id) => {
    await API.post(`/reading-list/add/${id}`);
    alert("Added to reading list!");
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const genres = ["All", ...new Set(books.map((b) => b.genre))];

  const filteredBooks =
    genre === "All"
      ? books
      : books.filter((b) => b.genre === genre);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
        
        {/* Header + Filter */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h2 className="text-3xl font-bold mb-4 md:mb-0">📚 Library</h2>

          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className={`px-3 py-1 rounded-full text-sm ${
                  genre === g
                    ? "bg-green-500 text-white"
                    : "bg-white shadow"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-2xl hover:-translate-y-1 transition duration-300"
            >
              <h3 className="text-lg font-bold text-gray-800">
                {b.title}
              </h3>

              <p className="text-sm text-gray-500">{b.author}</p>

              <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                {b.genre}
              </span>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => addToList(b._id)}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                >
                  Add
                </button>

                <button
                  onClick={() => setSelectedBook(b)}
                  className="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-black"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Details Modal */}
        {selectedBook && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
              <h2 className="text-xl font-bold mb-2">
                {selectedBook.title}
              </h2>

              <p className="text-gray-600">{selectedBook.author}</p>

              <p className="mt-2 text-sm">
                <b>Genre:</b> {selectedBook.genre}
              </p>

              <p className="mt-3 text-gray-700 text-sm">
                {selectedBook.description}
              </p>

              <button
                onClick={() => setSelectedBook(null)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}