import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [accType, setAccType] = useState("user");
  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();

  const handleSelect = (e) => {
    setAccType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); 

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const pin = form.pin.value;
    const nid = form.nid.value;
    const role = accType;
    
    const userInfo = { name, phone, email, pin, role, nid };

    if (pin.length !== 5) {
      setErrors((prev) => ({ ...prev, pin: "Pin must be 5 digits long" }));
      return;
    }
    if (phone.length !== 11) {
      setErrors((prev) => ({ ...prev, phone: "Phone must be 11 digits long" }));
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        userInfo
      );

      if (response.data?.success) {
        toast.success("Account created! Please login");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error.response?.data);

      if (error.response?.data?.errors) {
        const backendErrors = {};
        error.response.data.errors.forEach((err) => {
          backendErrors[err.field] = err.message;
        });
        setErrors(backendErrors);
      }

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
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
            className={`bg-gray-600 px-4 py-2 rounded-md ${
              errors.name ? "border border-red-500" : ""
            }`}
            placeholder="Enter your name"
            name="name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="text"
            className={`bg-gray-600 px-4 py-2 rounded-md ${
              errors.nid ? "border border-red-500" : ""
            }`}
            placeholder="Enter your NID"
            name="nid"
          />
          {errors.nid && <p className="text-red-500 text-sm">{errors.nid}</p>}

          <input
            type="email"
            className={`bg-gray-600 px-4 py-2 rounded-md ${
              errors.email ? "border border-red-500" : ""
            }`}
            placeholder="Enter your email"
            name="email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input
            type="number"
            className={`bg-gray-600 px-4 py-2 rounded-md ${
              errors.phone ? "border border-red-500" : ""
            }`}
            placeholder="Enter your number"
            name="phone"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

          <input
            type="password"
            className={`bg-gray-600 px-4 py-2 rounded-md ${
              errors.pin ? "border border-red-500" : ""
            }`}
            placeholder="Enter your pin"
            name="pin"
          />
          {errors.pin && <p className="text-red-500 text-sm">{errors.pin}</p>}

          <div className="flex gap-2 items-center">
            <p>Account Type: </p>
            <select
              className="bg-gray-600 w-28 text-center py-2 rounded-md"
              onChange={handleSelect}
              value={accType}
            >
              <option value="user">User</option>
              <option value="agent">Agent</option>
            </select>
          </div>

          <input
            type="submit"
            value="Register"
            className="bg-gray-600 px-4 py-2 rounded-md cursor-pointer"
          />

          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-gray-100 underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
