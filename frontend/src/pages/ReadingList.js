import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function ReadingList() {
  const [list, setList] = useState({ books: [] });

  const fetchList = async () => {
    const res = await API.get("/reading-list");
    setList(res.data);
  };

  const remove = async (id) => {
    await API.delete(`/reading-list/remove/${id}`);
    fetchList();
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-8 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">My Reading List</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {list.books.map((b) => (
            <div key={b._id} className="bg-white p-5 rounded-xl shadow">
              <h3>{b.title}</h3>
              <p>{b.author}</p>

              <button
                onClick={() => remove(b._id)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}