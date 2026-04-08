import { useEffect, useState } from "react";
import API from "../services/api";

export default function ReadingList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    API.get("/reading-list").then((res) => {
      setList(res.data.books);
    });
  }, []);

  return (
    <div>
      <h2>My Reading List</h2>
      {list.map((b) => (
        <div key={b._id}>{b.title}</div>
      ))}
    </div>
  );
}