import api from "../../interceptors/axiosInstance";
import { FaUserCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const RequestMoney = () => {
  const [reqs, setReqs] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const fetchAgents = async () => {
    const res = await api.get("/transaction/request-money");
    setReqs(res.data.data);
    setRefetch(false);
  };
  useEffect(() => {
    fetchAgents();
  }, [refetch]);

  const handleApprove = async (id) => {
    try {
      const res = await api.patch(`/transaction/approve-request-money/${id}`);
      if (res.data.success) {
        setRefetch(true);
        toast.success("successfully approved");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-6 w-[90%] md:w-[80%] mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Total Money Request: {reqs?.length}
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Account Number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Created at
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reqs?.map((req) => (
                <tr key={req?._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {req?.receiver_number}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="text-sm text-gray-500">{req?.amount}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(req?.createdAt).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        req?.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : req?.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {req?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {req?.status === "approved" ? (
                      <span
                        span
                        className="bg-green-50 px-2 py-1 rounded-md text-green-800"
                      >
                        Approved
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApprove(req?._id)}
                        className="inline-flex items-center px-3 py-1.5 border rounded-md text-sm font-medium"
                      >
                        <FaUserCheck className="w-4 h-4 mr-1.5" />
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestMoney;
