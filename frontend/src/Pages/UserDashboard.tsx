import { useEffect, useState } from "react";
import { userDashboard } from "../Services/UserApis";
import Navbar from "../Components/Navbar";
import LoanForm from "../Components/LoanForm";

interface LoanType {
  userName: string;
  loanAmount: number;
  loanTenure: number;
  employmentStatus: string;
  employmentAddress: string;
  reason: string;
  status: string;
  createdAt?:string;
}

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};
export default function UserDashboard() {
  const [appliedLoans, setAppliedLoans] = useState<LoanType[]>([]);
  const [formModal, setFormModal] = useState(false);
  useEffect(() => {
    async function getAppliedLoans() {
      const response = await userDashboard();
      if (response?.data) {
        console.log(response.data);
        setAppliedLoans(response.data);
      }
    }
    getAppliedLoans();
  }, [formModal]);

  return (
    <>
      <Navbar who="user" />

      {formModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto relative">
          <LoanForm formModal={formModal} setFormModal={setFormModal} />
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setFormModal(false)}
            >
              <i className="fa-regular fa-circle-xmark text-2xl mr-5 mt-5"></i>
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-100 flex justify-center">
        {/* Main Container */}
        <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-3xl font-bold text-green-700">₹ 5000.00</div>
            <button
              onClick={() => setFormModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Get A Loan
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-4 mb-4">
            <button className="px-6 py-2 bg-gray-200 rounded-lg">
              Borrow Cash
            </button>
            <button className="px-6 py-2 bg-gray-200 rounded-lg">
              Transact
            </button>
            <button className="px-6 py-2 bg-gray-200 rounded-lg">
              Deposit Cash
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for loans"
              className="w-full p-4 rounded-lg border border-gray-300"
            />
          </div>

          {/* Loan List */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">Applied Loans</h3>
              <div className="flex space-x-2">
                <button className="text-gray-500">Sort</button>
                <button className="text-gray-500">Filter</button>
              </div>
            </div>
            <div>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="p-4">Loan Officer</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Date Applied</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appliedLoans.map((loan, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="p-4 flex items-center space-x-4">
                        <img
                          src="https://pomerancedentalcare.com/wp-content/uploads/2024/06/placeholder-image-person-jpg-1.jpg"
                      
                          className="rounded-full h-10 w-10"
                        />
                        <div>
                          <div className="font-semibold">John Okoh</div>
                          <div className="text-gray-500 text-sm">
                            Updated 1 day ago
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{loan.loanAmount}</td>
                      <td className="p-4">{formatDate(loan.createdAt as string)}</td>
                      <td className="p-4">
                        <span
                          className={`px-4 py-1 text-black rounded-full ${
                            loan.status === "pending" && "bg-yellow-300"
                          } ${loan.status === "approved" && "bg-green-500"}
                          ${loan.status === "rejected" && "bg-red-600"}`}
                        >
                          {loan.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
