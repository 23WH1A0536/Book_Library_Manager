import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Login</h2>

        <input placeholder="Email"
          onChange={(e)=>setData({...data,email:e.target.value})}/>

        <input type="password" placeholder="Password"
          onChange={(e)=>setData({...data,password:e.target.value})}/>

        <button>Login</button>

        <p>
          No account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "100px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    gap: "10px"
  }
};