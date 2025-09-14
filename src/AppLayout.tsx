import { Outlet } from "react-router-dom";
import Sidebar from "./Components/main/Sidebar";
import { Toaster } from "sonner";


function AppLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="flex-1">
                <div className="block">
                    <Sidebar/>
                </div>
            
                <main className="flex-1 mt-8 md:mt-0 p-4 md:ml-54">
                    <Outlet />
                    <Toaster/>
                </main>
            </div>
        </div>
    );
}

export default AppLayout;