import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import LoginSchema from "../Validations/LoginShema";
import { userLogin } from "../Services/UserApis";
import { toast } from "sonner";

interface FormValues {
  email: string;
  password: string;
}

export default function UserLogin() {
  const navigate = useNavigate();

  const { errors, handleBlur, handleChange, handleSubmit, values, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchema,
      onSubmit: Submission,
    });

  async function Submission(formData: FormValues) {
    try {
      const response = await userLogin(formData);
      if (response?.data.token) {
        toast.success(response.data.message);
        localStorage.setItem("userToken", response.data.token);
        navigate("/");
      }else{
        toast.error(response?.data.message);
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r ">
        <div className="relative">
          <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r  from-[#6B9908] via-[#0A512FB2] to-[#064921] shadow-lg animate-pulse"></div>
          <div
            id="form-container"
            className="bg-white p-16 rounded-lg shadow-2xl w-80 relative z-10 transform transition duration-500 ease-in-out"
          >
            <h2
              id="form-title"
              className="text-center text-3xl font-bold mb-10 text-[#064921]"
            >
              Login
            </h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                placeholder="Email"
                id=""
                name="email"
                type="text"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                placeholder="Password"
                id=""
                name="password"
                type="password"
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
              <button
                type="submit"
                className="w-full h-12 bg-[#064921] hover:bg-[#6B9908] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign in
              </button>
              <a
                className="text-blue-500 hover:text-blue-800 text-sm"
                onClick={() => navigate("/signup")}
              >
                Dont have an account?
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
