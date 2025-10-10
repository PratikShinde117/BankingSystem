import { useState } from "react";
import api from "../../services/api.js";

export default function Deposit() {
  const [amount, setAmount] = useState("");

  const handleDeposit = async () => {
    const account_no = localStorage.getItem("account_no");
    if (!account_no) return alert("Account not found");

    try {
      await api.post("/deposit", { account_no, amount: Number(amount) });
      alert("Deposit successful");
      setAmount("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Deposit failed");
    }
  };

  return (
    <div>
      <h2>Deposit Money</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleDeposit}>Deposit</button>
    </div>
  );
}
