import useAdminStore from "@/app/admin/_admin_store";
import { Gem } from "lucide-react";

const AdminHeader = () => {
    const {sideMenuOpen}= useAdminStore();
  return (
    <div
      className={`bg-accent-foreground roboto text-accent-text w-full h-20 flex items-center justify-between md:px-6 px-4`}
    >
      <div
        className={`flex items-center max-w-20 large:max-w-70 duration-500 md:pr-6 pr-4 gap-5 ${
          sideMenuOpen ? "w-70 justify-start" : "w-20 justify-center"
        } transition-opacity duration-300`}
      >
     
        <div className="flex relative z-10 bg-accent-foreground items-center gap-3">
          <div className="relative">
            <Gem
              className={`w-8 h-8 transition-colors duration-300 text-[#0A8A9F]`}
            />
            <div className="absolute inset-0 bg-[#0A8A9F]/20 rounded-full blur-sm group-hover:bg-[#0A8A9F]/30 transition-all duration-300"></div>
          </div>
          <div
            className={`md:flex flex-col hidden ${
              !sideMenuOpen ? "w-0" : "w-full"
            } overflow-hidden`}
          >
            <p
              className={`text-[15px] font-bold transition-all duration-500 text-[#0A8A9F]"
                          
                        }`}
            >
              CristalPoint
            </p>
            <p className="text-[10px] text-gray-400 font-medium tracking-widest whitespace-nowrap group-hover:text-gray-300 transition-colors duration-300">
              INVESTMENT MANAGEMENT
            </p>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-foreground">Admin Panel</h2>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Super Admin</span>
      </div>
    </div>
  );
}

export default AdminHeader