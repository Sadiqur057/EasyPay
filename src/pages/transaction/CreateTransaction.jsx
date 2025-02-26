import { useContext, useState } from "react";
import AuthContext from "../../provider/AuthContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import api from "../../interceptors/axiosInstance";

const CreateTransaction = ({
  title,
  successMessage,
  transaction_type,
  isCashIn = false,
  isCashOut = false,
}) => {
  const { user, setRefresh } = useContext(AuthContext);
  const [totalAmount, setTotalAmount] = useState(0);

  const navigate = useNavigate();

  const handleTotalAmount = (e) => {
    const amount = parseFloat(e.target.value) || 0;

    if (isCashOut) {
      return setTotalAmount(amount + parseFloat((amount * 0.015).toFixed(2)));
    }

    if (isCashIn) {
      return setTotalAmount(amount);
    }

    if (amount >= 100) {
      return setTotalAmount(amount + 5);
    }

    setTotalAmount(amount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const receiver_number = e.target.receiver_number.value;
    const amount = e.target.amount.value;
    const pin = e.target.pin?.value || 0;
    if (totalAmount > user?.user_balance) {
      return console.log("wrong");
    }
    const transactionInfo = {
      receiver_number,
      amount: Number(amount),
      transaction_type,
      pin
    };
    console.log(transactionInfo);

    try {
      const response = await api.patch(
        "/transaction/create-transaction",
        transactionInfo
      );
      console.log(response.data);
      if (response.data.success) {
        setRefresh((prev) => !prev);
        Swal.fire({
          title: "Success!",
          text: successMessage,
          icon: "success",
        });
        navigate("/");
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
        <h2 className="text-center text-2xl font-medium mb-6">{title}</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-3"
        >
          <input
            type="text"
            className="bg-gray-600 px-4 py-2 rounded-md"
            placeholder="Receiver number"
            name="receiver_number"
          />
          <input
            onChange={handleTotalAmount}
            type="number"
            className="bg-gray-600 px-4 py-2 rounded-md"
            placeholder="Amount (tk)"
            name="amount"
          />
          {isCashIn && (
            <input
              type="text"
              className="bg-gray-600 px-4 py-2 rounded-md"
              placeholder="*****"
              name="pin"
            />
          )}
          <p>Total amount: {totalAmount || 0}</p>
          <input
            type="submit"
            value="Send"
            className="bg-gray-600 px-4 py-2 rounded-md cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateTransaction;
