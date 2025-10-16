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
    
      const { email, pass_word } = form;

      const res = await api.post("/login", { email, pass_word });
      const user = res.data.user;

      
      localStorage.setItem("account_no", user.account_no);
      localStorage.setItem("cust_id", user.cust_id);
      localStorage.setItem("email", user.email);

      
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", justifyContent:"center", alignContent: "center" ,gap: "1rem" ,width: "50%"}}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{padding: "7px"}}
        />
        <input
          type="password"
          name="pass_word"
          placeholder="Password"
          value={form.pass_word}
          onChange={handleChange}
          style={{padding: "7px"}}
        />
        <button type="submit" style={{padding: "7px", color:"white", backgroundColor:"black", border:"none", borderRadius:"5px"}}>Login</button>
      </form>
    </div>
  );
}
