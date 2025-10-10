import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";

export default function Login() {
  const [form, setForm] = useState({ email: "", pass_word: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Destructure form fields
      const { email, pass_word } = form;

      const res = await api.post("/login", { email, pass_word });
      const user = res.data.user;

      // Store account_no and cust_id in localStorage
      localStorage.setItem("account_no", user.account_no);
      localStorage.setItem("cust_id", user.cust_id);
      localStorage.setItem("email", user.email);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="pass_word"
          placeholder="Password"
          value={form.pass_word}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
