import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../provider/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const emailOrPhone = form.emailOrPhone.value;
    const pin = form.pin.value;

    try {
      let result = await login({ emailOrPhone, pin });
      if (result) {
        if (result.admin) return navigate("/dashboard");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-gray-900 text-white min-h-[calc(100vh-120px)] flex items-center">
      <div className="w-[90%] md:w-[80%] mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-3"
        >
          <img className="w-20 rounded-md mb-2" src="/EasyPay.png" alt="" />
          <input
            type="text"
            className="bg-gray-600 px-4 py-2 rounded-md"
            placeholder="Enter email / number"
            name="emailOrPhone"
          />
          <input
            type="password"
            className="bg-gray-600 px-4 py-2 rounded-md"
            placeholder="Enter your pin"
            name="pin"
          />
          <input
            type="submit"
            value="login"
            className="bg-gray-600 px-4 py-2 rounded-md"
          />
          <p>
            Already have an account?{" "}
            <Link to="/register" className="text-gray-100 underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
