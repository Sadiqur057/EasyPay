import { useContext, useEffect, useState } from "react";
import AuthContext from "../../provider/AuthContext";
import api from "../../interceptors/axiosInstance";
import userImg from "../../assets/images/user.png";
import { IoMdAddCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Users from "./Users";

const Dashboard = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();
  const getDashboardData = async () => {
    const result = await api.get("/admin/dashboard");
    setData(result?.data?.data);
    setRefetch(false);
  };
  useEffect(() => {
    getDashboardData();
  }, [refetch]);

  const handleLogout = async () => {
    const logoutResult = await logout();
    if (logoutResult) {
      navigate("/login");
    }
  };

  if (loading) {
    return "loading..";
  }

  return (
    <>
      <div className="bg-gray-900 pt-4 pb-10 text-white">
        <div className="w-[90%] md:w-[80%] mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={userImg} className="rounded-full w-14" alt="user" />
              <div>
                <p className="text-[22px] font-semibold">{user?.name}</p>
                <p className="text-sm">
                  {user?.phone} ({user?.role})
                </p>
              </div>
            </div>
            <button onClick={handleLogout}>Logout</button>
          </div>

          <div className="flex flex-wrap gap-3 justify-between items-center">
            <div>
              <p className="font-medium text-sm">Available Balance</p>
              <p className="font-semibold text-3xl">{user?.balance} tk</p>
            </div>
            <div>
              <p className="font-medium text-sm">Total Balance</p>
              <p className="font-semibold text-3xl">{data?.totalMoney} tk</p>
            </div>
          </div>
          <div>
            <Link to="/add-money">
              <button className="flex gap-1.5 md:gap-2 items-center border-2 py-2 px-3 rounded-lg cursor-pointer">
                <IoMdAddCircle /> Add Money
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Users users={data?.users} setRefetch={setRefetch} />
    </>
  );
};

export default Dashboard;
