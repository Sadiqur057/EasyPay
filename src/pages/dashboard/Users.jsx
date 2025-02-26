import { Link } from "react-router-dom";
import api from "../../interceptors/axiosInstance";
import { FaUserCheck } from "react-icons/fa";
import toast from "react-hot-toast";

const Users = ({ users, setRefetch }) => {
  const toggleUserStatus = async (phone, status) => {
    try {
      const res = await api.patch(`/admin/update`, {
        phone,
        status,
      });
      if (res.data.success) {
        toast.success("User status updated successfully");
        setRefetch(true);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "An error occurred");
    }
  };
  return (
    <div className="w-[90%] md:w-[80%] mx-auto py-6">
      <div className="mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Total users: {users?.length}
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
                {users?.map((user) => (
                  <tr key={user?._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user?.name}
                      </div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user?.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user?.role === "admin"
                            ? "bg-green-100 text-green-800"
                            : user?.role === "agent"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {user?.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() =>
                          toggleUserStatus(
                            user?.phone,
                            user?.status === "active" ? "blocked" : "active"
                          )
                        }
                        className={`inline-flex items-center px-3 py-1.5 border rounded-md text-sm font-medium ${
                          user?.status === "active"
                            ? "border-red-300 bg-red-50 text-red-700 hover:bg-red-100"
                            : "border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
                        } transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                      >
                        {user?.status === "active" ? (
                          <>
                            <FaUserCheck className="w-4 h-4 mr-1.5" />
                            Block
                          </>
                        ) : (
                          <>
                            <FaUserCheck className="w-4 h-4 mr-1.5" />
                            Activate
                          </>
                        )}
                      </button>
                    </td>
                    <td>
                      <Link
                        className="bg-gray-50 px-2 py-1 border rounded-md"
                        to={`/dashboard/transaction/user/${user?.phone}`}
                      >
                        view
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
