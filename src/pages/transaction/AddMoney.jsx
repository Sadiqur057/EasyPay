import { useContext, useState } from "react";
import AuthContext from "../../provider/AuthContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import api from "../../interceptors/axiosInstance";

const AddMoney = () => {
  const { setRefresh } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = e.target.amount.value;
    const transactionInfo = {
      amount: Number(amount),
      phone: e.target.phone.value,
    };
    console.log(transactionInfo);

    try {
      const response = await api.patch(
        "/admin/add-money",
        transactionInfo
      );
      console.log(response.data);
      if (response.data.success) {
        console.log(response.data);
        setRefresh((prev) => !prev);
        Swal.fire({
          title: "Success!",
          text: "Money sent successfully",
          icon: "success",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  return (
    <div className="bg-gray-900 text-white min-h-[calc(100vh-120px)] flex items-center">
      <div className="w-[90%] md:w-[80%] mx-auto">
        <h2 className="text-center text-2xl font-medium mb-6">Add Money</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-3"
        >
          <input
            type="number"
            className="bg-gray-600 px-4 py-2 rounded-md"
            placeholder="phone number"
            name="phone"
          />
          <input
            type="number"
            className="bg-gray-600 px-4 py-2 rounded-md"
            placeholder="Amount (tk)"
            name="amount"
          />
          <input
            type="submit"
            value="Send"
            className="bg-gray-600 px-4 py-2 rounded-md"
          />
        </form>
      </div>
    </div>
  );
};

export default AddMoney;
