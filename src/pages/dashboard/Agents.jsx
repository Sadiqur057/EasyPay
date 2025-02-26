import api from "../../interceptors/axiosInstance";
import { FaUserCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const fetchAgents = async () => {
    const res = await api.get("/admin/agents");
    setAgents(res.data.data);
    setRefetch(false);
  };
  useEffect(() => {
    fetchAgents();
  }, [refetch]);

  const handleApprove = async (id) => {
    try {
      const res = await api.patch(`/admin/approve-agent/${id}`);
      if (res.data.success) {
        setRefetch(true);
        toast.success("successfully approved");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message|| "An error occurred");
    }
  };

  return (
    <div className="py-6 w-[90%] md:w-[80%] mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Total agents: {agents?.length}
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
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Phone Number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Role
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
              {agents?.map((agent) => (
                <tr key={agent?._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {agent?.name}
                    </div>
                    <div className="text-sm text-gray-500">{agent?.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{agent?.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        agent?.role === "admin"
                          ? "bg-green-100 text-green-800"
                          : agent?.role === "agent"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {agent?.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {agent?.isVerified ? (
                      <span
                        span
                        className="bg-green-50 px-2 py-1 rounded-md text-green-800"
                      >
                        Verified
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApprove(agent?._id)}
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

export default Agents;
