import Navbar from "./assets/components/Navbar.jsx";
import CreateAccount from "./assets/components/Createaccount.jsx";
import Login from "./assets/components/Login.jsx";
import Dashboard from "./assets/components/Dashboard.jsx";
import Transfer from "./assets/components/Transfer.jsx";
import Balance from "./assets/components/Balance.jsx";
import Deposit from "./assets/components/Deposit.jsx";

import { Routes, Route } from "react-router-dom";

export default function App() {
  const account_no = localStorage.getItem("account_no");
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/balance" element={<Balance account_no={account_no}/>} />
        <Route path="/deposit" element={<Deposit account_no={account_no} />} />
      </Routes>
    </>
  );
}
