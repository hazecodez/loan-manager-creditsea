import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface NavbarProps {
  who: "user" | "admin";
}
const Navbar: React.FC<NavbarProps> = ({ who }) => {
  const navigate = useNavigate();
  return (
    <nav className="flex dark:bg-[#EFEFEF] items-center relative justify-between bg-white px-5 py-6 w-full">
      <div>
        <h1 className="text-[#0A512F] font-bold text-lg">CREDIT APP</h1>
      </div>

      {who === "user" && (
        <ul
          id="drawer"
          role="menu"
          className="sm:gap-3 transition-left ease-[cubic-bezier(0.4, 0.0, 0.2, 1)] delay-150  sm:flex  flex flex-col cursor-pointer absolute min-h-screen -left-48 sm:static w-48 top-0 bg-white sm:shadow-none shadow-xl sm:bg-transparent sm:flex-row sm:w-auto sm:min-h-0   "
        >
          <div className="sm:hidden p-6 mb-5 flex items-center justify-center"></div>
          <li className="font-medium text-sm p-3  hover:text-[#6B9908] sm:p-0 sm:hover:bg-transparent text-primary">
            <i className="fa-solid fa-gauge-high text-lg text-[#0A512F]" />
            &nbsp;&nbsp;
            <a href="#" className="text-[#0A512F] font-bold text-lg">
              Home
            </a>
          </li>
          <li className="font-medium text-sm p-3 cursor-pointer  hover:text-[#6B9908] sm:p-0 sm:hover:bg-transparent text-gray-600 hover:text-primary transition-colors">
            <i className="fa-brands fa-paypal text-lg text-[#0A512F]" />
            &nbsp;&nbsp;
            <a href="#" className="text-[#0A512F] font-bold text-lg">
              Payments
            </a>
          </li>
          <li className="font-medium text-sm p-3 cursor-pointer  hover:text-[#6B9908] sm:p-0 sm:hover:bg-transparent text-gray-600 hover:text-primary transition-colors">
            <i className="fa-solid fa-book text-lg text-[#0A512F]" />
            &nbsp;&nbsp;
            <a href="#" className="text-[#0A512F] font-bold text-lg">
              Budget
            </a>
          </li>
          <li className="font-medium text-sm p-3 cursor-pointer  hover:text-[#6B9908] sm:p-0 sm:hover:bg-transparent text-gray-600 hover:text-primary transition-colors">
            <i className="fa-solid fa-credit-card text-lg text-[#0A512F]" />
            &nbsp;&nbsp;
            <a href="#" className="text-[#0A512F] font-bold text-lg">
              Card
            </a>
          </li>
        </ul>
      )}

      <div className="flex gap-3 items-center">
        <i className="fa-solid fa-comment text-lg text-[#0A512F]" />
        &nbsp;&nbsp;
        <i className="fa-solid fa-bell text-lg text-[#0A512F]" />
        &nbsp;&nbsp;
        {who === "user" && (
          <>
            <i
              onClick={() => {
                localStorage.removeItem("userToken");
                toast.success("Successfully signed out")
                navigate("/login");
              }}
              className="fa-solid fa-right-from-bracket text-lg text-[#0A512F]"
            />
            &nbsp;&nbsp;
          </>
        )}
        <div className="h-10 w-10 hover:ring-4 user cursor-pointer relative ring-blue-700/30 rounded-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')]"></div>
        <div className="sm:hidden cursor-pointer" id="mobile-toggle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              className="text-[#0A512F]"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
