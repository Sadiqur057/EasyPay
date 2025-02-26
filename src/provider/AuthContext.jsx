/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import api from "../interceptors/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await api.get("/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const currUser = response.data?.data;
          setUser(currUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [refresh]);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await api.post(
        `/auth/login`,
        credentials
      );
      if (!response?.data?.success) {
        toast.error(response?.data?.message);
      }
      toast.success("Login successful");
      const token = response.data.token;
      localStorage.setItem("token", token);
      setUser(response.data.user);
      localStorage.setItem("role", response.data.data.role);
      if (response.data.data.role === "admin") {
        return {
          admin: true,
        };
      }
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return false;
    } finally {
      setRefresh(!refresh);
    }
  };

  const logout = async () => {
    try {
      const response = await api.get("/auth/logout");
      console.log("checking response", response);
      if (!response?.data?.success) {
        toast.error(response?.data?.message);
      }
      toast.success(response?.data?.message);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return true;
    } catch (error) {
      console.error("error", error);
      return false;
    } finally {
      setLoading(false);
      setRefresh(!refresh);
      // localStorage.removeItem("token");
      // setUser(null);
    }
  };

  const authInfo = { user, setRefresh, loading, login, logout };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
