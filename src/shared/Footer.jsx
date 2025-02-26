import { useContext } from "react";
import { FaHome, FaUser, FaHouseUser, FaMoneyBill } from "react-icons/fa";
import { MdHistory, MdOutlineDashboardCustomize } from "react-icons/md";
import { Link } from "react-router-dom";
import AuthContext from "../provider/AuthContext";

const Footer = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="bg-gray-800 py-2 text-white text-center">
        Loading...
      </div>
    );
  }
  const role = user?.role;
  return (
    <footer className="flex sticky bottom-0 bg-gray-900 text-white justify-between">
      {user && role === "admin" ? (
        <>
          <Link
            to="/dashboard"
            className="  flex gap-1.5 md:gap-2 justify-center items-center text-xl md:border-r border-t px-2 flex-1 py-3 rounded-sm "
          >
            <MdOutlineDashboardCustomize />{" "}
            <span className="font-medium md:block hidden">Dashboard</span>
          </Link>
          <Link
            to="/agents"
            className="  flex gap-1.5 md:gap-2 justify-center items-center text-xl md:border-r border-t px-2 flex-1 py-3 rounded-sm "
          >
            <FaHouseUser />{" "}
            <span className="font-medium md:block hidden">Agents</span>
          </Link>
          <Link
            to="/request-money"
            className="  flex gap-1.5 md:gap-2 justify-center items-center text-xl md:border-r border-t px-2  flex-1 py-3 rounded-sm "
          >
            <FaMoneyBill />{" "}
            <span className="font-medium md:block hidden">Request Money</span>
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/"
            className="flex gap-1.5 md:gap-2 items-center text-xl px-2 border-t flex-1 py-3 rounded-sm justify-center"
          >
            <FaHome /> <span className="font-medium md:block hidden">Home</span>
          </Link>
          <Link
            to="/transactions"
            className="flex justify-center gap-1.5 md:gap-2 items-center text-xl border-l border-t px-2 flex-1 py-3 rounded-sm"
          >
            <MdHistory />{" "}
            <span className="font-medium md:block hidden">Transactions</span>
          </Link>
        </>
      )}
    </footer>
  );
};

export default Footer;
