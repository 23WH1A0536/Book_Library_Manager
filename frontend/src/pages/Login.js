import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await API.post("/auth/login", {
          email: data.email,
          password: data.password
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        if (res.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/books");
        }
      } else {
        await API.post("/auth/register", data);
        alert("Registered successfully! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE (Branding) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-500 to-blue-600 text-white flex-col justify-center items-center p-10">
        <h1 className="text-5xl font-bold mb-4">ShelfMaster 📚</h1>
        <p className="text-lg text-center max-w-md">
          Discover, organize, and track your favorite books effortlessly.
          Your personal digital library, simplified.
        </p>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-[90%] max-w-md">

          <h2 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? "Login" : "Register"}
          </h2>

          {!isLogin && (
            <input
              placeholder="Name"
              className="w-full mb-3 p-2 border rounded"
              onChange={(e) =>
                setData({ ...data, name: e.target.value })
              }
            />
          )}

          <input
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded"
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded"
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>

          <p className="text-center mt-4 text-sm">
            {isLogin ? "New user?" : "Already have an account?"}{" "}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-500 cursor-pointer font-semibold"
            >
              {isLogin ? "Register here" : "Login here"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}