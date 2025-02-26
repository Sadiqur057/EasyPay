import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../interceptors/axiosInstance";

const UserTransactions = () => {
  const { phone } = useParams();

  const [transactions, setTransactions] = useState([]);
  const getTransactions = async () => {
    try {
      const transactions = await api.get(`/transaction/phone/${phone}`);
      setTransactions(transactions.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden py-6 w-[90%] md:w-[80%] mx-auto">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Sender
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Receiver
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions?.map((tx) => (
              <tr key={tx?._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {tx?.sender_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {tx?.receiver_number}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      tx?.transaction_type === "1"
                        ? "bg-green-100 text-green-800"
                        : tx?.transaction_type === "2"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {tx?.transaction_type === "1"
                      ? "Send Money"
                      : tx?.transaction_type === "2"
                      ? "Cashout"
                      : tx?.transaction_type === "3"
                      ? "Cashin"
                      : "Request Money"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(tx?.createdAt).toLocaleString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTransactions;
