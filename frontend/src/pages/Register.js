import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", data);
    alert("Registered");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input placeholder="Name"
        onChange={(e)=>setData({...data,name:e.target.value})}/>
      <input placeholder="Email"
        onChange={(e)=>setData({...data,email:e.target.value})}/>
      <input type="password" placeholder="Password"
        onChange={(e)=>setData({...data,password:e.target.value})}/>
      <button>Register</button>
    </form>
  );
}