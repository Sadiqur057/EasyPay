import userImg from "../../assets/images/user.png";
import { IoMdAddCircle } from "react-icons/io";
import { IoCashOutline } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import Transaction from "../../components/Transection";
import { useContext } from "react";
import AuthContext from "../../provider/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const logoutResult = await logout();
    if (logoutResult) {
      navigate("/login");
    }
  };

  if (loading) {
    return "loading";
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

          <div>
            <p className="font-medium text-sm">Available Balance</p>
            <p className="font-semibold text-3xl">{user?.balance} tk</p>
          </div>

          <div className="flex gap-1.5 md:gap-3">
            {user?.role === "agent" && (
              <>
                <Link to="/cashin">
                  <button className="flex gap-1.5 md:gap-2 items-center border-2 py-2 px-3 rounded-lg cursor-pointer">
                    <IoMdAddCircle /> Cash In
                  </button>
                </Link>
                <Link to="/request">
                  <button className="flex gap-1.5 md:gap-2 items-center border-2 py-2 px-3 rounded-lg cursor-pointer">
                    <IoMdAddCircle /> Request Money
                  </button>
                </Link>
              </>
            )}
            {user.role === "user" && (
              <>
                <Link to="/send">
                  <button className="flex gap-1.5 md:gap-2 items-center border-2 py-2 px-3 rounded-lg cursor-pointer">
                    <BsFillSendFill className="text-sm" /> Send{" "}
                  </button>
                </Link>
                <Link to={"/cashout"}>
                  <button className="flex gap-1.5 md:gap-2 items-center border-2 py-2 px-3 rounded-lg cursor-pointer">
                    <IoCashOutline /> Cash Out{" "}
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="w-[90%] md:w-[80%] py-6 mx-auto overflow-auto">
        <div className="flex justify-between items-center">
          <p className="font-medium text-xl md:text-3xl mb-3">
            Recent activities
          </p>
          <p className="text-blue-900 font-medium">See all</p>
        </div>
        <div>
          <Transaction />
        </div>
      </div>
    </>
  );
};

export default Home;
