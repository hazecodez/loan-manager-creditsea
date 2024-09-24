import { useEffect, useState } from "react";
import { adminDashboard, loanAction } from "../Services/AdminApis";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface LoanType {
  _id: string;
  userName: string;
  loanAmount: number;
  loanTenure: number;
  employmentStatus: string;
  employmentAddress: string;
  reason: string;
  status: string;
  createdAt?:string;
}
interface UserType {
  email: string;
  name: string;
}

export default function AdminDashboard() {
  const [recentLoans, setRecentLoans] = useState<LoanType[]>([]);
  const [users, setusers] = useState<UserType[]>([]);
  const [isUpdate,setIsUpdate] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    async function getRecentLoans() {
      const response = await adminDashboard();
      if (response?.data) {
        console.log(response.data);
        setRecentLoans(response.data.loans);
        setusers(response.data.users);
      }
    }
    getRecentLoans();
  }, [isUpdate]);

  async function LoanStatusAction(status: string, id: string) {
    const response = await loanAction(status, id);
    if (response?.data) {
      toast.success(response.data.message);
      setIsUpdate(!isUpdate)
    }
  }

  return (
    <>
      <Navbar who="admin"/>

      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside
          className={`lg:block hidden w-64 bg-green-900 text-white transition-all duration-300 lg:static absolute z-10`}
        >
          <div className="p-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="User Avatar"
                className="rounded-full h-12 w-12"
              />
              <span>Admin</span>
            </div>
          </div>
          <nav className="p-4 space-y-4">
            <a href="#" className="block py-2 hover:bg-green-700 rounded-md">
              Dashboard
            </a>
            <a href="#" className="block py-2 hover:bg-green-700 rounded-md">
              Borrowers
            </a>
            <a href="#" className="block py-2 hover:bg-green-700 rounded-md">
              Loans
            </a>
            <a href="#" className="block py-2 hover:bg-green-700 rounded-md">
              Repayments
            </a>
            <a href="#" className="block py-2 hover:bg-green-700 rounded-md">
              Accounting
            </a>
            <a href="#" className="block py-2 hover:bg-green-700 rounded-md">
              Settings
            </a>
            <a
              onClick={() => {
                localStorage.removeItem("adminToken");
                toast.success("Successfully signed out");
                navigate("/admin/login");
              }}
              className="block py-2 hover:bg-green-700 rounded-md cursor-pointer"
            >
              Sign Out
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Top Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold">{users.length}</h2>
              <p>Active Users</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold">100</h2>
              <p>Borrowers</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold">550,000</h2>
              <p>Cash Disbursed</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold">1,000,000</h2>
              <p>Cash Received</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold">450,000</h2>
              <p>Savings</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold">30</h2>
              <p>Repaid Loans</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold">10</h2>
              <p>Other Accounts</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold">50</h2>
              <p>Loans</p>
            </div>
          </div>

          {/* Recent Loans Table */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">Recent Loans</h3>
              <div className="flex space-x-2">
                <button className="text-gray-500">Sort</button>
                <button className="text-gray-500">Filter</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="p-4">User Name</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Loan Tenure</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLoans.map((loan, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="p-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src="https://pomerancedentalcare.com/wp-content/uploads/2024/06/placeholder-image-person-jpg-1.jpg"
                            alt="User Avatar"
                            className="rounded-full h-10 w-10"
                          />
                          <div className="truncate sm:max-w-[120px] lg:max-w-none lg:whitespace-normal">
                            {/* Truncate on mobile, show full content on larger screens */}
                            <div className="font-semibold truncate">
                              {loan.userName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 truncate sm:max-w-[100px] lg:max-w-none lg:whitespace-normal">
                        {loan.loanAmount}
                      </td>
                      <td className="p-4 truncate sm:max-w-[80px] lg:max-w-none lg:whitespace-normal">
                        {loan.loanTenure} &nbsp; Months <br />
                      </td>
                      <td
                        className="p-4 cursor-pointer"
                        onClick={() => {
                          LoanStatusAction("approved", loan._id);
                        }}
                      >
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
        </main>
      </div>
    </>
  );
}
