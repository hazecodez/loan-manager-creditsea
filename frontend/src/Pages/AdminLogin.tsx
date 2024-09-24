import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import AdminSchema from "../Validations/AdminSchema";
import { adminLogin } from "../Services/AdminApis";
import { toast } from "sonner";

interface FormValues {
  name: string;
  password: string;
}
export default function AdminLogin() {
  const navigate = useNavigate();

  const { errors, handleBlur, handleChange, handleSubmit, values, touched } =
    useFormik({
      initialValues: {
        name: "",
        password: "",
      },
      validationSchema: AdminSchema,
      onSubmit: Submission,
    });

  async function Submission(formData: FormValues) {
    try {
      const response = await adminLogin(formData);
      if (response?.data.token) {
        toast.success(response.data.message);
        localStorage.setItem("adminToken", response.data.token);
        navigate("/admin/");
      } else {
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
              Welcome Back !!
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                placeholder="Name"
                id=""
                name="name"
                type="text"
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
