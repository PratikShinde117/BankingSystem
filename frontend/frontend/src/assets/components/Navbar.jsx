import { Link } from "react-router-dom";
import api from "../../services/api.js";
import { LogoutButton } from "./Logout.jsx";
export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#222", color: "#fff" , display: "flex", flexDirection: "row", justifyContent:"center"}}>
      <Link to="/" style={{ margin: "0 10px", color: "white" }}>Login</Link>
      <Link to="/register" style={{ margin: "0 10px", color: "white" }}>Create Account</Link>
      <Link to="/dashboard" style={{ margin: "0 10px", color: "white" }}>Dashboard</Link>
      <Link to="/transfer" style={{ margin: "0 10px", color: "white" }}>Transfer</Link>
      <Link to="/balance" style={{ margin: "0 10px", color: "white" }}>Balance</Link>
      <Link to="/deposit" style={{ margin: "0 10px", color: "white" }}>Deposit</Link>
      <LogoutButton />

    </nav>
  );
}
