import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Nembak ke backend yang tadi kita buat
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      // Simpan data user & role ke browser supaya tidak hilang pas di-refresh
      const user = response.data.user;
      alert(`Selamat Datang ${user.name} (${user.role})`);

      localStorage.setItem("user_role", user.role);
      localStorage.setItem("user_name", user.name);

      // Arahkan ke halaman sesuai Role
      if (user.role === "ADMIN") {
        window.location.href = "/admin-dashboard";
      } else {
        window.location.href = "/user-home";
      }
    } catch (error) {
      alert("Login Gagal! Cek Email/Password");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "300px", margin: "auto" }}>
      <h2>Login Perpus</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <button type="submit" style={{ width: "100%" }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
