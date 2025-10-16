export function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("account_no");
    localStorage.removeItem("cust_id");
    localStorage.removeItem("email");
    window.location.href = "/"; 
  };

  return <button onClick={handleLogout} >Logout</button>;
}
