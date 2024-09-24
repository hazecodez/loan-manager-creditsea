import axiosInstance from "./AxiosInstance";

interface userForm {
  name?: string;
  email: string;
  password: string;
}

interface ILoan {
  userName: string;
  loanAmount: number;
  loanTenure: number;
  employmentStatus: string;
  employmentAddress: string;
  reason: string;
}

axiosInstance.interceptors.request.use(
  (config) => {
    if (config && config.url && !config?.url.includes("admin")) {
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        config.headers["Authorization"] = `${userToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function userRegistration(formData: userForm) {
  try {
    const response = await axiosInstance.post("/register", formData);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function userLogin(formData: userForm) {
  try {
    const response = await axiosInstance.post("/login", formData);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function userDashboard() {
  try {
    const response = await axiosInstance.get("/dashboard");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function applyLoan(formData: ILoan) {
  try {
    const response = await axiosInstance.post("/apply-loan", formData);
    return response;
  } catch (error) {
    console.log(error);
  }
}
