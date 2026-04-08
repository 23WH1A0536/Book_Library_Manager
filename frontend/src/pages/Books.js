import { useEffect, useState } from "react";
import API from "../services/api";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get("/books").then(res => setBooks(res.data));
  }, []);

  const addToList = async (id) => {
    await API.post(`/reading-list/add/${id}`);
    alert("Added!");
  };

  return (
    <div style={styles.container}>
      {books.map(b => (
        <div key={b._id} style={styles.card}>
          <h3>{b.title}</h3>
          <p>{b.author}</p>
          <button onClick={()=>addToList(b._id)}>
            Add to List
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px"
  },
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    width: "200px",
    borderRadius: "10px"
  }
};