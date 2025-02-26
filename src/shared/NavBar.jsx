import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="bg-gray-900 text-white px-[5%] md:px-[10%] py-6 flex justify-between items-center">
        <Link to='/' className="text-3xl md:text-2xl font-medium">EasyPay</Link>
        <img src="/logo.png" className="w-14 rounded-sm" alt="logo" />
      </nav>
    </>
  );
};
export default NavBar;