import { useFormik } from "formik";
import LoanSchema from "../Validations/LoanSchema";
import { applyLoan } from "../Services/UserApis";
import { toast } from "sonner";

interface LoanFormProps {
    formModal: boolean;
    setFormModal: (value: boolean) => void;
}

interface LoanType {
  userName: string;
  loanAmount: number;
  loanTenure: number;
  employmentStatus: string;
  employmentAddress: string;
  reason: string;
  status?: string;
}

const LoanForm: React.FC<LoanFormProps> = ({ formModal, setFormModal }) => {

  const { errors, handleBlur, handleChange, handleSubmit, values, touched } =
    useFormik({
      initialValues: {
        userName: "",
        loanAmount: 0,
        loanTenure: 0,
        employmentStatus: "",
        employmentAddress: "",
        reason: "",
      },
      validationSchema: LoanSchema,
      onSubmit: Submission,
    });

  async function Submission(formData: LoanType) {
    try {
      const response = await applyLoan(formData);
      if (response?.data) {
        toast.success(response.data.message);
        setFormModal(!formModal)
      } else {
        toast.error(response?.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            APPLY FOR A LOAN
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                First name as it appears on bank account
              </label>
              <div className="mt-2">
                <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.userName}
                  id="userName"
                  name="userName"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.userName && touched.userName && (
                <p className="text-red-500 text-xs">{errors.userName}</p>
              )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                How much do you need
              </label>
              <div className="mt-2">
                <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.loanAmount}
                  id="loanAmount"
                  name="loanAmount"
                  type="number"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.loanAmount && touched.loanAmount && (
                <p className="text-red-500 text-xs">{errors.loanAmount}</p>
              )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Loan Tenure (In Months)
              </label>
              <div className="mt-2">
                <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.loanTenure}
                  id="loanTenure"
                  name="loanTenure"
                  type="number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.loanTenure && touched.userName && (
                <p className="text-red-500 text-xs">{errors.userName}</p>
              )}
              </div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Employment Status
              </label>
              <div className="mt-2">
                <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.employmentStatus}
                  id="employmentStatus"
                  name="employmentStatus"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.employmentStatus && touched.employmentStatus && (
                <p className="text-red-500 text-xs">{errors.employmentStatus}</p>
              )}
              </div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Employment Address
              </label>
              <div className="mt-2">
                <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.employmentAddress}
                  id="employmentAddress"
                  name="employmentAddress"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.employmentAddress && touched.employmentAddress && (
                <p className="text-red-500 text-xs">{errors.employmentAddress}</p>
              )}
              </div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Reason for loan
              </label>
              <div className="mt-2">
                <textarea
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.reason}
                  id="reason"
                  name="reason"
                  rows={2}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
                {errors.reason && touched.reason && (
                <p className="text-red-500 text-xs">{errors.reason}</p>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex items-center justify-center">
        <button
          type="submit"
          className="rounded-md bg-[#0A512F] px-10 py-2 text-lg font-semibold text-white shadow-sm hover:bg-[#6B9908] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B9908]"
        >
          Submit
        </button>
      </div>
    </form>
  );
}


export default LoanForm;