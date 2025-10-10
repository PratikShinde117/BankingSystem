export function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("account_no");
    window.location.href = "/"; // redirect to login
  };

  return <button onClick={handleLogout}>Logout</button>;
}
