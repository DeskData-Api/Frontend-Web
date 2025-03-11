import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">
        Bem-vindo, {user?.role === "admin" ? "Admin" : "Viewer"}!
      </h1>
      <button onClick={logout} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Logout</button>
    </div>
  );
};

export default Dashboard;
