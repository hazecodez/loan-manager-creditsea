import axiosInstance from "./AxiosInstance";
interface Logintype {
  name: string;
  password: string;
}

axiosInstance.interceptors.request.use(
  (config) => {
    if (config && config.url && config?.url.includes("admin")) {
      const adminToken = localStorage.getItem("adminToken");
      if (adminToken) {
        config.headers["Authorization"] = `${adminToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function adminLogin(data: Logintype) {
  try {
    const response = await axiosInstance.post("/admin/login", data);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function adminDashboard() {
  try {
    const response = await axiosInstance.get("/admin/dashboard");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function loanAction(status: string, id: string) {
  try {
    const response = await axiosInstance.patch("/admin/approve-loan", {
      id,
      status,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
