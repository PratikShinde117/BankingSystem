import { useState } from "react";
import api from "../../services/api.js";

export default function Transfer() {
  const [form, setForm] = useState({ toAcc: "", amount: "" });
  const account_no = localStorage.getItem("account_no"); // sender account

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/transfer", {
        fromAcc: account_no,             // always sender is current logged-in account
        toAcc: form.toAcc,
        amount: Number(form.amount),     // ensure numeric
      });
      alert("Transfer successful!");
      setForm({ toAcc: "", amount: "" }); // reset form
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Transfer Money</h2>
      <form onSubmit={handleSubmit}>
        <input name="fromAcc" value={account_no} readOnly />
        <input name="toAcc" placeholder="To Account No" value={form.toAcc} onChange={handleChange} />
        <input name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
}
