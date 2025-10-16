import { useState, useEffect } from "react";
import api from "../../services/api.js";

export default function Balance() {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const account_no = localStorage.getItem("account_no"); 
    if (!account_no) return;

    const fetchBalance = async () => {
      try {
        const res = await api.get(`/balance/${account_no}`);
        setBalance(res.data.balance);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBalance();
  }, []);

  if (balance === null) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
      <h2>Account Balance</h2>
      <p>Your balance is: ₹{balance}</p>
    </div>
  );
}
