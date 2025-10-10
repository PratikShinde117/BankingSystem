import { useState } from "react";
import api from "../../services/api.js";

export default function CreateAccount() {
  const [form, setForm] = useState({
    cust_name: "",
    address: "",
    email: "",
    pass_word: "",
    phone_no: "",
    pan_no: "",
    aadhar_no: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", form);
      alert(`Account created! Your Account No: ${res.data.customer.account_no}`);
      setForm({
        cust_name: "",
        address: "",
        email: "",
        pass_word: "",
        phone_no: "",
        pan_no: "",
        aadhar_no: ""
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating account");
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input name="cust_name" placeholder="Name" value={form.cust_name} onChange={handleChange} required /><br/>
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} /><br/>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required /><br/>
        <input type="password" name="pass_word" placeholder="Password" value={form.pass_word} onChange={handleChange} required /><br/>
        <input name="phone_no" placeholder="Phone" value={form.phone_no} onChange={handleChange} /><br/>
        <input name="pan_no" placeholder="PAN" value={form.pan_no} onChange={handleChange} /><br/>
        <input name="aadhar_no" placeholder="Aadhar" value={form.aadhar_no} onChange={handleChange} /><br/>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
