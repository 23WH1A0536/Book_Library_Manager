import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2 style={{ color: "white" }}>📚 ShelfMaster</h2>

      <div>
        <Link to="/" style={styles.link}>Books</Link>
        <Link to="/reading-list" style={styles.link}>My List</Link>
        <button onClick={logout} style={styles.btn}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#333"
  },
  link: {
    margin: "0 10px",
    color: "white",
    textDecoration: "none"
  },
  btn: {
    marginLeft: "10px",
    padding: "5px 10px"
  }
};